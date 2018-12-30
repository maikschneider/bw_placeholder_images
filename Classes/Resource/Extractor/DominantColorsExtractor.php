<?php

namespace Blueways\BwPlaceholderImages\Resource\Extractor;

/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */

use TYPO3\CMS\Core\Resource\File;
use TYPO3\CMS\Core\Resource\Index\ExtractorInterface;
use TYPO3\CMS\Extbase\Service\ImageService;
use TYPO3\CMS\Extbase\Service\EnvironmentService;
use ColorThief\ColorThief;
use Psr\Log\LoggerAwareTrait;

/**
 * Class DominantColorsExtractor
 *
 * @package Blueways\BwPlaceholderImages\Resource\Extractor
 */
class DominantColorsExtractor implements ExtractorInterface, \Psr\Log\LoggerAwareInterface
{

    use LoggerAwareTrait;

    /**
     * @return array
     */
    public function getFileTypeRestrictions()
    {
        return [File::FILETYPE_IMAGE];
    }

    /**
     * @return array
     */
    public function getDriverRestrictions()
    {
        return [];
    }

    /**
     * @return int
     */
    public function getPriority()
    {
        return 11;
    }

    /**
     * @return int
     */
    public function getExecutionPriority()
    {
        return 11;
    }

    /**
     * @param File $file
     * @return bool
     */
    public function canProcess(File $file)
    {
        return in_array($file->getExtension(), ['jpg', 'jpeg', 'gif', 'png'], true);
    }

    /**
     * @param File $file
     * @param array $previousExtractedData
     * @return array
     */
    public function extractMetaData(File $file, array $previousExtractedData = [])
    {
        $metaData = [];

        $this->logger = \TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance(\TYPO3\CMS\Core\Log\LogManager::class)->getLogger(__CLASS__);
        $this->logger->info('Execute file ' . $file->getName());

        $width = $file->getProperty('width');
        $height = $file->getProperty('height');

        $width13 = ceil($width / 3) - 1;
        $height13 = ceil($height / 3) - 1;

        $heights = [0, $height13, ($height13 * 2)];
        $widths = [0, $width13, ($width13 * 2)];

        $file_content = $file->getContents();

        try {
            for ($i = 0; $i < 3; $i++) {
                for ($j = 0; $j < 3; $j++) {
                    $color = ColorThief::getColor($file_content, 10,
                        ['x' => $widths[$i], 'y' => $heights[$j], 'w' => $width13, 'h' => $height13]);
                    if ($color) {
                        $colors[$i][$j] = '#' . dechex($color[0]) . dechex($color[1]) . dechex($color[2]);
                    }
                }
            }
        } catch (\RuntimeException $e) {
            $this->logger->error('Execute file ' . $file->getName() . 'could not be processed', [$e->getMessage()]);
        }

        $metaData['dominant_colors'] = json_encode($colors);

        return $metaData;
    }
}
