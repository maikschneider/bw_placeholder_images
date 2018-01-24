<?php
defined('TYPO3_MODE') || die('Access denied');

\TYPO3\CMS\Core\Resource\Index\ExtractorRegistry::getInstance()->registerExtractionService(
    \Blueways\BwPlaceholderImages\Resource\Extractor\DominantColorsExtractor::class
);
