<?php

namespace Blueways\BwPlaceholderImages\ViewHelpers;

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

use TYPO3\CMS\Core\Imaging\ImageManipulation\CropVariantCollection;
use TYPO3\CMS\Core\Page\PageRenderer;
use TYPO3\CMS\Core\Resource\Exception\ResourceDoesNotExistException;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Extbase\Object\ObjectManager;
use TYPO3\CMS\Extbase\Service\ImageService;
use TYPO3Fluid\Fluid\Core\Rendering\RenderingContextInterface;
use TYPO3Fluid\Fluid\Core\ViewHelper\Traits\CompileWithRenderStatic;
use TYPO3\CMS\Fluid\Core\ViewHelper\AbstractViewHelper;

/**
 * @TODO: Documentation
 */
class ResponsiveBackgroundImageViewHelper extends AbstractViewHelper
{

    use CompileWithRenderStatic;

    public function initializeArguments()
    {
        $this->registerArgument('src', 'string', 'src');
        $this->registerArgument('treatIdAsReference', 'bool', 'given src argument is a sys_file_reference record',
            false, false);
        $this->registerArgument('image', 'object', 'image');
        $this->registerArgument('small', 'array', 'The string to lowercase.', false);
        $this->registerArgument('medium', 'array', 'The string to lowercase.', false);
        $this->registerArgument('large', 'array', 'The string to lowercase.', false);
        $this->registerArgument('xlarge', 'array', 'The string to lowercase.', false);
        $this->registerArgument('xxlarge', 'array', 'The string to lowercase.', false);
    }

    /**
     * @param array $arguments
     * @param \Closure $renderChildrenClosure
     * @param \TYPO3Fluid\Fluid\Core\Rendering\RenderingContextInterface $renderingContext
     * @return mixed|string
     */
    public static function renderStatic(
        array $arguments,
        \Closure $renderChildrenClosure,
        RenderingContextInterface $renderingContext
    ) {
        $src = $arguments['src'];
        $image = $arguments['image'];
        $absolute = $arguments['absolute'];

        $treatIdAsReference = $arguments['treatIdAsReference'];

        if ((is_null($src) && is_null($image)) || (!is_null($src) && !is_null($image))) {
            throw new Exception('You must either specify a string src or a File object.', 1460976233);
        }

        try {
            $imageService = self::getImageService();
            $image = $imageService->getImage($src, $image, $treatIdAsReference);

            $dominantColors = $image->getProperty('dominant_colors');
            $colors = json_decode($dominantColors);

            $id = 'p' . $image->getHashedIdentifier();

            $css = '#' . $id . ':after { background-color: ' . $colors[1][1] . '; }';
            $dataAttr = '';

            $sizes = ['small', 'medium', 'large', 'xlarge', 'xxlarge'];

            foreach ($sizes as $size) {

                // abbort if size was not used in viewhelper
                if (!isset($arguments[$size])) {
                    continue;
                }

                $sizeConf = $arguments[$size];

                // create image uri for speficify size setting
                $cropString = $sizeConf['crop'];
                if ($cropString === null && $image->hasProperty('crop') && $image->getProperty('crop')) {
                    $cropString = $image->getProperty('crop');
                }
                $cropVariantCollection = CropVariantCollection::create((string)$cropString);
                $cropVariant = $sizeConf['cropVariant'] ?: 'default';
                $cropArea = $cropVariantCollection->getCropArea($cropVariant);
                $processingInstructions = [
                    'width' => $sizeConf['width'],
                    'height' => $sizeConf['height'],
                    'minWidth' => $sizeConf['minWidth'],
                    'minHeight' => $sizeConf['minHeight'],
                    'maxWidth' => $sizeConf['maxWidth'],
                    'maxHeight' => $sizeConf['maxHeight'],
                    'crop' => $cropArea->isEmpty() ? null : $cropArea->makeAbsoluteBasedOnFile($image),
                ];
                $processedImage = $imageService->applyProcessingInstructions($image, $processingInstructions);
                $imageUri = $imageService->getImageUri($processedImage, $absolute);

                // build css and data-attr markup
                $css .= '#' . $id . '.loaded.' . $size . ' { background-image: url(' . $imageUri . ');}';
                $dataAttr .= ' data-placeholder-image-' . $size . '="' . $imageUri . '"';
            }

            // add css to html head
            $compress = true;
            $pageRenderer = GeneralUtility::makeInstance(PageRenderer::class);
            $pageRenderer->addCssInlineBlock($id, $css, $compress);

            // return new created attributes (id & data-placeholder-image-size=".."
            return rawurldecode('id="' . $id . '" ' . $dataAttr);
        } catch (ResourceDoesNotExistException $e) {
            // thrown if file does not exist
        } catch (\UnexpectedValueException $e) {
            // thrown if a file has been replaced with a folder
        } catch (\RuntimeException $e) {
            // RuntimeException thrown if a file is outside of a storage
        } catch (\InvalidArgumentException $e) {
            // thrown if file storage does not exist
        }
    }

    /**
     * Return an instance of ImageService using object manager
     *
     * @return ImageService
     */
    protected static function getImageService()
    {
        /** @var ObjectManager $objectManager */
        $objectManager = GeneralUtility::makeInstance(ObjectManager::class);
        return $objectManager->get(ImageService::class);
    }
}
