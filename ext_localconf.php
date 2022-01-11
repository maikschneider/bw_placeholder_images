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

$GLOBALS['TYPO3_CONF_VARS']['SYS']['formEngine']['nodeRegistry'][1641888755] = [
    'nodeName' => 'triangularPlaceholder',
    'priority' => '70',
    'class' => \Blueways\BwPlaceholderImages\Form\Element\TriangularPlaceholderElement::class,
];
