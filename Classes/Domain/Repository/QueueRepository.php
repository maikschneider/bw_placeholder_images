<?php

namespace Blueways\BwPlaceholderImages\Domain\Repository;

use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Extbase\Persistence\Generic\Typo3QuerySettings;
use TYPO3\CMS\Extbase\Persistence\Repository;

class QueueRepository extends Repository
{

    public function initializeObject()
    {
        $querySettings = GeneralUtility::makeInstance(Typo3QuerySettings::class);
        $querySettings->setRespectStoragePage(false);
        $querySettings->setIgnoreEnableFields(true);
        $querySettings->setRespectSysLanguage(false);
        $this->setDefaultQuerySettings($querySettings);
    }

    public function findByFileUid($fileIdentifier)
    {
        $query = $this->createQuery();
        $query->matching($query->equals('sys_file_uid', $fileIdentifier));
        $query->setLimit(1);
        return $query->execute();
    }

    public function findByHash($hash)
    {
        $query = $this->createQuery();
        $query->matching($query->equals('hash', $hash));
        $query->setLimit(1);
        return $query->execute();
    }
}
