<?php
namespace Blueways\BwPlaceholderImages\ViewHelpers;

use TYPO3Fluid\Fluid\Core\Rendering\RenderingContextInterface;
use TYPO3\CMS\Fluid\ViewHelpers\Uri\ImageViewHelper;
use TYPO3\CMS\Extbase\Object\ObjectManager;
use Blueways\BwPlaceholderImages\Service\Base64ImageService;
use TYPO3\CMS\Core\Utility\GeneralUtility;

class LazyPlaceholderViewhelper extends ImageViewHelper implements \TYPO3Fluid\Fluid\Core\ViewHelper\ViewHelperInterface
{

    public function initilizeArguments()
    {
        parent::initilizeArguments();

        $this->registerArgument('fallbackBgColor', 'string', 'Fallback color to use when image has no dominant color', false, '#EEEEEE');
    }

    /**
     * Resizes the image (if required) and returns its path. If the image was not resized, the path will be equal to $src
     *
     * @param array $arguments
     * @param \Closure $renderChildrenClosure
     * @param RenderingContextInterface $renderingContext
     * @return string
     * @throws Exception
     */
    public static function renderStatic(array $arguments, \Closure $renderChildrenClosure, RenderingContextInterface $renderingContext)
    {
        $src = $arguments['src'];
        $image = $arguments['image'];
        $treatIdAsReference = $arguments['treatIdAsReference'];

        if ((is_null($src) && is_null($image)) || (!is_null($src) && !is_null($image))) {
            throw new Exception('You must either specify a string src or a File object.', 1460976233);
        }

        try {
            $imageService = self::getImageService();
            $image = $imageService->getImage($src, $image, $treatIdAsReference);

            $dominantColors = $image->getProperty('dominant_colors');

            $base64ImageService = self::getBase64ImageService();
            $svg = $base64ImageService->generateSvg($dominantColors, $arguments['width'] ? $arguments['width'] : 1, $arguments['height'] ? $arguments['height'] : 1);

            return $svg;
        } catch (ResourceDoesNotExistException $e) {
            // thrown if file does not exist
        } catch (\UnexpectedValueException $e) {
            // thrown if a file has been replaced with a folder
        } catch (\RuntimeException $e) {
            // RuntimeException thrown if a file is outside of a storage
        } catch (\InvalidArgumentException $e) {
            // thrown if file storage does not exist
        }
        return '';
    }

    /**
     * Return an instance of Base64ImageService using object manager
     *
     * @return Base64ImageService
     */
    protected static function getBase64ImageService()
    {
        /** @var ObjectManager $objectManager */
        $objectManager = GeneralUtility::makeInstance(ObjectManager::class);
        return $objectManager->get(Base64ImageService::class);
    }

}
