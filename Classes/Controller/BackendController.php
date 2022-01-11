<?php

namespace Blueways\BwPlaceholderImages\Controller;

use Blueways\BwPlaceholderImages\Domain\Model\Queue;
use Blueways\BwPlaceholderImages\Domain\Repository\QueueRepository;
use Blueways\BwPlaceholderImages\Utility\TriangularUtility;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use TYPO3\CMS\Core\Http\JsonResponse;
use TYPO3\CMS\Core\Http\Response;
use TYPO3\CMS\Core\Resource\Index\MetaDataRepository;
use TYPO3\CMS\Core\Utility\MathUtility;
use TYPO3\CMS\Extbase\Mvc\Controller\ActionController;
use TYPO3\CMS\Extbase\Persistence\Generic\PersistenceManager;

class BackendController
{

    protected QueueRepository $queueRepository;

    protected TriangularUtility $triangularUtility;

    protected PersistenceManager $persistenceManager;

    protected MetaDataRepository $metaDataRepository;

    public function __construct(
        QueueRepository $queueRepository,
        TriangularUtility $triangularUtility,
        PersistenceManager $persistenceManager,
        MetaDataRepository $metaDataRepository
    ) {
        $this->queueRepository = $queueRepository;
        $this->triangularUtility = $triangularUtility;
        $this->persistenceManager = $persistenceManager;
        $this->metaDataRepository = $metaDataRepository;
    }

    public function triangularAbort(ServerRequestInterface $request): Response
    {
        $body = $request->getParsedBody();
        if (!isset($body['sysFileUid']) || !MathUtility::canBeInterpretedAsInteger($body['sysFileUid'])) {
            return new JsonResponse(['message' => 'no valid sys_file uid'], 500);
        }

        $queue = $this->queueRepository->findByFileUid((int)$body['sysFileUid'])->getFirst();
        if ($queue) {
            $this->queueRepository->remove($queue);
            $this->persistenceManager->persistAll();
        }

        return new JsonResponse(['message' => 'queue item deleted']);
    }

    public function triangularDelete(ServerRequestInterface $request): Response
    {
        $body = $request->getParsedBody();
        if (!isset($body['sysFileUid']) || !MathUtility::canBeInterpretedAsInteger($body['sysFileUid'])) {
            return new JsonResponse(['message' => 'no valid sys_file uid'], 500);
        }

        // process file
        $fileUid = (int)$body['sysFileUid'];
        $metaData = $this->metaDataRepository->findByFileUid($fileUid);

        if (!$metaData) {
            return new JsonResponse(['message' => 'could not find meta datat of file'], 501);
        }

        $this->metaDataRepository->update($fileUid, ['triangular_placeholder' => '']);

        return new JsonResponse(['message' => 'triangular image successfully removed']);
    }

    public function triangularRefresh(ServerRequestInterface $request): Response
    {
        $body = $request->getParsedBody();
        if (!isset($body['sysFileUid']) || !MathUtility::canBeInterpretedAsInteger($body['sysFileUid'])) {
            return new JsonResponse(['message' => 'no valid sys_file uid'], 500);
        }

        // process file
        $fileUid = (int)$body['sysFileUid'];
        $success = $this->triangularUtility->processFile($fileUid);

        if (!$success) {
            return new JsonResponse(['message' => 'error requesting triangular image'], 501);
        }

        // return svg if already downloaded
        $metaData = $this->metaDataRepository->findByFileUid($fileUid);
        if ($metaData && $metaData['triangular_placeholder']) {
            return new JsonResponse([
                'message' => 'triangular image successfully requested',
                'svg' => $metaData['triangular_placeholder']
            ]);
        }

        // successfully queued
        return new JsonResponse(['message' => 'triangular image successfully requested', 'svg' => false]);
    }
}
