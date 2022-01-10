<?php

namespace Blueways\BwPlaceholderImages\Utility;

use Blueways\BwPlaceholderImages\Domain\Model\Queue;
use Blueways\BwPlaceholderImages\Domain\Repository\QueueRepository;
use TYPO3\CMS\Core\Exception;
use TYPO3\CMS\Core\Resource\File;
use TYPO3\CMS\Core\Resource\ResourceFactory;
use TYPO3\CMS\Core\TypoScript\TypoScriptService;
use TYPO3\CMS\Core\Utility\GeneralUtility;
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

    public function __construct(
        ResourceFactory $resourceFactory,
        QueueRepository $queueRepository,
        PersistenceManager $persistenceManager,
        ConfigurationManager $configurationManager,
        TypoScriptService $typoScriptService
    ) {
        $this->resourceFactory = $resourceFactory;
        $this->queueRepository = $queueRepository;
        $this->persistenceManager = $persistenceManager;
        $this->configurationManager = $configurationManager;
        $this->typoScriptService = $typoScriptService;
    }

    public function processFile($fileIdentifier): bool
    {
        // validate file exists
        $file = $this->getFileObjectFromIdentifier($fileIdentifier);

        if (!$file) {
            return false;
        }

        /** @var Queue|null $queue */
        $queue = $this->queueRepository->findOneByFileIdentifier($fileIdentifier)->getFirst();

        if ($queue) {
            return $this->requestProcessedFile($queue);
        }

        // do request
        $settings = $this->getTypoScript();
        if (!$settings['triangularServer'] || !$settings['triangularApiKey']) {
            return false;
        }

        $client = new \GuzzleHttp\Client();
        $response = $client->request('GET', $settings['triangularServer'], [
            'headers' => [
                'X-API-KEY' => $settings['triangularApiKey']
            ]
        ]);
        if ($response->getStatusCode() !== 200) {
            return false;
        }
        $body = $response->getBody();
        $data = json_decode($body, false, 512, JSON_THROW_ON_ERROR);

        // save on success
        $queue = new Queue();
        $queue->setFileIdentifier($fileIdentifier);
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
        return true;
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

}
