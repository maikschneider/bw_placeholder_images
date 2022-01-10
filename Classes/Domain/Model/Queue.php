<?php

namespace Blueways\BwPlaceholderImages\Domain\Model;

use TYPO3\CMS\Extbase\DomainObject\AbstractEntity;

class Queue extends AbstractEntity
{

    protected string $fileIdentifier = '';

    protected string $hash = '';

    protected int $status = 0;

    protected ?\DateTime $crdate = null;

    protected ?\DateTime $tstamp = null;
}
