<?php
defined('TYPO3_MODE') || die('Access denied');

\TYPO3\CMS\Core\Resource\Index\ExtractorRegistry::getInstance()->registerExtractionService(
    \Blueways\BwPlaceholderImages\Resource\Extractor\DominantColorsExtractor::class
);

\TYPO3\CMS\Extbase\Utility\ExtensionUtility::configurePlugin(
    'Blueways.BwPlaceholderImages',
    'Triangular',
    [
        Blueways\BwPlaceholderImages\Controller\TriangularController::class => 'callback',
    ],
    [
        Blueways\BwPlaceholderImages\Controller\TriangularController::class => 'callback',
    ]
);
