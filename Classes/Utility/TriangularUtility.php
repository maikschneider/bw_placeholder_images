<?php

namespace Blueways\BwPlaceholderImages\Utility;

use Blueways\BwPlaceholderImages\Domain\Model\Queue;
use Blueways\BwPlaceholderImages\Domain\Repository\QueueRepository;
use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Psr7\Response;
use Psr\Http\Message\ResponseInterface;
use TYPO3\CMS\Core\Configuration\ExtensionConfiguration;
use TYPO3\CMS\Core\Database\Query\QueryBuilder;
use TYPO3\CMS\Core\Exception;
use TYPO3\CMS\Core\Resource\File;
use TYPO3\CMS\Core\Resource\FileRepository;
use TYPO3\CMS\Core\Resource\ResourceFactory;
use TYPO3\CMS\Core\Site\SiteFinder;
use TYPO3\CMS\Core\TypoScript\TypoScriptService;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Extbase\Configuration\ConfigurationManager;
use TYPO3\CMS\Extbase\Configuration\ConfigurationManagerInterface;
use TYPO3\CMS\Extbase\Configuration\Exception\InvalidConfigurationTypeException;
use TYPO3\CMS\Extbase\Mvc\Web\Routing\UriBuilder;
use TYPO3\CMS\Extbase\Persistence\Generic\PersistenceManager;
use TYPO3\CMS\Extbase\Service\ExtensionService;

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

    protected UriBuilder $uriBuilder;

    public function __construct(
        ResourceFactory $resourceFactory,
        QueueRepository $queueRepository,
        PersistenceManager $persistenceManager,
        ConfigurationManager $configurationManager,
        TypoScriptService $typoScriptService,
        QueryBuilder $metadataQueryBuilder,
        FileRepository $fileRepository,
        UriBuilder $uriBuilder
    ) {
        $this->resourceFactory = $resourceFactory;
        $this->queueRepository = $queueRepository;
        $this->persistenceManager = $persistenceManager;
        $this->configurationManager = $configurationManager;
        $this->typoScriptService = $typoScriptService;
        $this->metadataQueryBuilder = $metadataQueryBuilder;
        $this->fileRepository = $fileRepository;
        $this->uriBuilder = $uriBuilder;
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
        $settings = GeneralUtility::makeInstance(ExtensionConfiguration::class)->get('bw_placeholder_images');
        if (!$settings['triangularServer'] || !$settings['triangularApiKey']) {
            return false;
        }

        // construct POST request
        $fileContent = $file->getForLocalProcessing();
        $callbackUrl = $this->getCallbackUrl();
        $client = new \GuzzleHttp\Client();
        try {
            $response = $client->request('POST', $settings['triangularServer'], [
                'headers' => [
                    'X-API-KEY' => $settings['triangularApiKey']
                ],
                'multipart' => [
                    [
                        'name' => 'callbackUrl',
                        'contents' => $callbackUrl
                    ],
                    [
                        'name' => 'file',
                        'contents' => \GuzzleHttp\Psr7\Utils::tryFopen($fileContent, 'r'),
                        'filename' => $file->getName(),
                    ]
                ]
            ]);
        } catch (\Exception $e) {
            // queue on error
            $queue = new Queue();
            $queue->setSysFileUid($fileUid);
            $this->queueRepository->add($queue);
            $this->persistenceManager->persistAll();
            return false;
        }
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

    public function requestProcessedFile(Queue $queue): bool
    {

        $settings = GeneralUtility::makeInstance(ExtensionConfiguration::class)->get('bw_placeholder_images');
        if (!$settings['triangularServer'] || !$settings['triangularApiKey']) {
            return false;
        }

        $client = new \GuzzleHttp\Client();
        $url = $settings['triangularServer'] . '/' . $queue->getHash();
        try {
            $response = $client->request('GET', $url, [
                'headers' => [
                    'X-API-KEY' => $settings['triangularApiKey']
                ],
            ]);
        } catch (GuzzleException $e) {
            return false;
        }

        return $this->handleSvgResponse($queue->getSysFileUid(), $response);
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

    private function getCallbackUrl(): string
    {
        $siteFinder = GeneralUtility::makeInstance(SiteFinder::class);
        $sites = $siteFinder->getAllSites();
        $site = array_shift(array_values($sites));
        $pid = $site->getRootPageId();

        $extensionService = GeneralUtility::makeInstance(ExtensionService::class);
        $argumentsPrefix = $extensionService->getPluginNamespace('bwplaceholderimages', 'triangular');
        $arguments = [
            'type' => '1641825616',
            $argumentsPrefix => [
                'action' => 'callback',
                'controller' => 'Triangular',
            ],
        ];

        return (string)$site->getRouter()->generateUri((string)$pid, $arguments);
    }

    public function getQueueOfFile(int $sysFileUid)
    {
        return $this->queueRepository->findByFileUid($sysFileUid)->getFirst();
    }

}
