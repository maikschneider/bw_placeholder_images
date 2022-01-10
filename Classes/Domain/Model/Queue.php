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

    /**
     * @return string
     */
    public function getFileIdentifier(): string
    {
        return $this->fileIdentifier;
    }

    /**
     * @param string $fileIdentifier
     */
    public function setFileIdentifier(string $fileIdentifier): void
    {
        $this->fileIdentifier = $fileIdentifier;
    }

    /**
     * @return string
     */
    public function getHash(): string
    {
        return $this->hash;
    }

    /**
     * @param string $hash
     */
    public function setHash(string $hash): void
    {
        $this->hash = $hash;
    }

    /**
     * @return int
     */
    public function getStatus(): int
    {
        return $this->status;
    }

    /**
     * @param int $status
     */
    public function setStatus(int $status): void
    {
        $this->status = $status;
    }

    /**
     * @return \DateTime|null
     */
    public function getCrdate(): ?\DateTime
    {
        return $this->crdate;
    }

    /**
     * @param \DateTime|null $crdate
     */
    public function setCrdate(?\DateTime $crdate): void
    {
        $this->crdate = $crdate;
    }

    /**
     * @return \DateTime|null
     */
    public function getTstamp(): ?\DateTime
    {
        return $this->tstamp;
    }

    /**
     * @param \DateTime|null $tstamp
     */
    public function setTstamp(?\DateTime $tstamp): void
    {
        $this->tstamp = $tstamp;
    }
}
