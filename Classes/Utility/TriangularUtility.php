<?php

namespace Blueways\BwPlaceholderImages\Utility;

use Blueways\BwPlaceholderImages\Domain\Model\Queue;
use Blueways\BwPlaceholderImages\Domain\Repository\QueueRepository;
use GuzzleHttp\Psr7\Response;
use Psr\Http\Message\ResponseInterface;
use TYPO3\CMS\Core\Database\Query\QueryBuilder;
use TYPO3\CMS\Core\Exception;
use TYPO3\CMS\Core\Resource\File;
use TYPO3\CMS\Core\Resource\FileRepository;
use TYPO3\CMS\Core\Resource\ResourceFactory;
use TYPO3\CMS\Core\TypoScript\TypoScriptService;
use TYPO3\CMS\Extbase\Configuration\ConfigurationManager;
use TYPO3\CMS\Extbase\Configuration\ConfigurationManagerInterface;
use TYPO3\CMS\Extbase\Configuration\Exception\InvalidConfigurationTypeException;
use TYPO3\CMS\Extbase\Persistence\Generic\PersistenceManager;

class TriangularUtility
{

    protected string $fileIdentifier = '';

    protected ResourceFactory $resourceFactory;

    protected QueueRepository $queueRepository;

    protected PersistenceManager $persistenceManager;

    protected ConfigurationManager $configurationManager;

    protected TypoScriptService $typoScriptService;

    protected QueryBuilder $metadataQueryBuilder;

    protected FileRepository $fileRepository;

    public function __construct(
        ResourceFactory $resourceFactory,
        QueueRepository $queueRepository,
        PersistenceManager $persistenceManager,
        ConfigurationManager $configurationManager,
        TypoScriptService $typoScriptService,
        QueryBuilder $metadataQueryBuilder,
        FileRepository $fileRepository
    ) {
        $this->resourceFactory = $resourceFactory;
        $this->queueRepository = $queueRepository;
        $this->persistenceManager = $persistenceManager;
        $this->configurationManager = $configurationManager;
        $this->typoScriptService = $typoScriptService;
        $this->metadataQueryBuilder = $metadataQueryBuilder;
        $this->fileRepository = $fileRepository;
    }

    public function processFile(int $fileUid): bool
    {
        // validate that sys_file exists
        $file = $this->fileRepository->findByUid($fileUid);
        $validMemeTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];
        if (!$file || !in_array($file->getMimeType(), $validMemeTypes, true)) {
            return false;
        }

        // If already queued, request processed file, no second post
        /** @var Queue|null $queue */
        $queue = $this->queueRepository->findByFileUid($fileUid)->getFirst();
        if ($queue) {
            return $this->requestProcessedFile($queue);
        }

        // do request
        $settings = $this->getTypoScript();
        if (!$settings['triangularServer'] || !$settings['triangularApiKey']) {
            return false;
        }

        // construct POST request
        $fileContent = $file->getForLocalProcessing();
        $client = new \GuzzleHttp\Client();
        $response = $client->request('POST', $settings['triangularServer'], [
            'headers' => [
                'X-API-KEY' => $settings['triangularApiKey']
            ],
            'multipart' => [
                [
                    'name' => 'callbackUrl',
                    'contents' => '@TODO',
                ],
                [
                    'name' => 'file',
                    'contents' => \GuzzleHttp\Psr7\Utils::tryFopen($fileContent, 'r'),
                    'filename' => $file->getName(),
                ]
            ]
        ]);
        if ($response->getStatusCode() !== 200) {
            return false;
        }

        // in case image already finished
        if ($response->getHeader('Content-Type')[0] === 'image/svg+xml') {
            return $this->handleSvgResponse($fileUid, $response);
        }

        // extract hash from response
        try {
            $body = $response->getBody();
            $data = json_decode($body, false, 512, JSON_THROW_ON_ERROR);
            $hash = $data->hash;
        } catch (\Exception $e) {
            return false;
        }

        // save on success
        $queue = new Queue();
        $queue->setSysFileUid($fileUid);
        $queue->setHash($hash);
        $this->queueRepository->add($queue);
        $this->persistenceManager->persistAll();

        return true;
    }

    protected function getTypoScript(): array
    {
        try {
            $typoscript = $this->configurationManager->getConfiguration(ConfigurationManagerInterface::CONFIGURATION_TYPE_FULL_TYPOSCRIPT);
        } catch (InvalidConfigurationTypeException $e) {
            return [];
        }
        $settings = $this->typoScriptService->convertTypoScriptArrayToPlainArray($typoscript);
        return $settings['plugin']['bw_placeholder_images']['settings'];
    }

    protected function requestProcessedFile(Queue $queue): bool
    {

        $settings = $this->getTypoScript();
        if (!$settings['triangularServer'] || !$settings['triangularApiKey']) {
            return false;
        }

        $client = new \GuzzleHttp\Client();
        $url = $settings['triangularServer'] . '/' . $queue->getHash();
        $response = $client->request('GET', $url, [
            'headers' => [
                'X-API-KEY' => $settings['triangularApiKey']
            ],
        ]);

        return $this->handleSvgResponse($queue->getSysFileUid(), $response);
    }

    protected function getFileObjectFromIdentifier($fileIdentifier): ?File
    {
        $pathSegments = explode(':', $fileIdentifier);
        try {
            $storage = count($pathSegments) === 1 ? $this->resourceFactory->getDefaultStorage() : $this->resourceFactory->getStorageObject((int)$pathSegments[0]);
            return $storage->getFile(end($pathSegments));
        } catch (Exception $e) {
            return null;
        }
    }

    private function handleSvgResponse(int $fileUid, ResponseInterface $response): bool
    {
        if ($response->getStatusCode() !== 200 || $response->getHeader('Content-Type')[0] !== 'image/svg+xml') {
            return false;
        }

        $svg = $response->getBody()->getContents();

        // save svg placeholder
        $this->metadataQueryBuilder
            ->update('sys_file_metadata')
            ->where($this->metadataQueryBuilder->expr()->eq('file', $fileUid))
            ->set('triangular_placeholder', $svg)
            ->executeStatement();

        // delete queue item
        $queue = $this->queueRepository->findByFileUid($fileUid)->getFirst();
        if ($queue) {
            $this->queueRepository->remove($queue);
            $this->persistenceManager->persistAll();
        }

        return true;
    }

}
