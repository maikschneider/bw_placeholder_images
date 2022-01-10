<?php

namespace Blueways\BwPlaceholderImages\Domain\Repository;

use TYPO3\CMS\Extbase\Persistence\Repository;

class QueueRepository extends Repository
{

    public function findOneByFileIdentifier($fileIdentifier)
    {
        $query = $this->createQuery();
        $query->matching($query->equals('file_identifier', $fileIdentifier));
        $query->setLimit(1);
        return $query->execute();
    }
}
