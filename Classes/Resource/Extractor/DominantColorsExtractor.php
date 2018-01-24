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

/**
 * Class DominantColorsExtractor
 * @package Blueways\BwPlaceholderImages\Resource\Extractor
 */
class DominantColorsExtractor implements ExtractorInterface
{
    /**
     * @var \TYPO3\CMS\Extbase\Service\ImageService
     * @inject
     */
    protected $imageService;

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
        return 10;
    }

    /**
     * @return int
     */
    public function getExecutionPriority()
    {
        return 10;
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

        $img3x3 = $this->imageService->applyProcessingInstructions($file, array('width' => '3c', 'height' => '3c'));
        $imageUri = $this->imageService->getImageUri($img3x3);

        if ($imageUri) {
            $metaData['dominant_colors'] = $imageUri;
        }
        return $metaData;
    }
}
