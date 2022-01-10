<?php

namespace Blueways\BwPlaceholderImages\Controller;

use Blueways\BwPlaceholderImages\Domain\Model\Queue;
use Blueways\BwPlaceholderImages\Domain\Repository\QueueRepository;
use Blueways\BwPlaceholderImages\Utility\TriangularUtility;
use Psr\Http\Message\ResponseInterface;
use TYPO3\CMS\Extbase\Mvc\Controller\ActionController;

class TriangularController extends ActionController
{

    protected QueueRepository $queueRepository;

    protected TriangularUtility $triangularUtility;

    public function __construct(QueueRepository $queueRepository, TriangularUtility $triangularUtility)
    {
        $this->queueRepository = $queueRepository;
        $this->triangularUtility = $triangularUtility;
    }

    public function callbackAction(): ResponseInterface
    {
        if ($this->request->getMethod() !== 'POST') {
            return $this->throwStatus(401, 'Method not allowed');
        }

        $body = $this->request->getBody();

        try {
            $data = json_decode($body, false, 512, JSON_THROW_ON_ERROR);
            $hash = $data->hash;
        } catch (\Exception $e) {
            return $this->throwStatus(501, 'Could not parse correct data');
        }

        /** @var Queue|null $queue */
        $queue = $this->queueRepository->findByHash($hash)->getFirst();

        if ($queue) {
            $this->triangularUtility->requestProcessedFile($queue);
            return $this->throwStatus(200, 'Processing successfully');
        }

        return $this->throwStatus(404, 'Could not find file to process');
    }
}
