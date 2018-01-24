<?php
defined('TYPO3_MODE') || die('Access denied');

$additionalColumns = [
    'dominant_colors' => [
        'exclude' => 1,
        'l10n_mode' => 'exclude',
        'l10n_display' => 'defaultAsReadonly',
        'label' => 'LLL:EXT:bw_placeholder_images/Resources/Private/Language/locallang_db.xlf:sys_file_metadata.dominant_colors',
        'config' => [
            'type' => 'input',
            'size' => '30',
            'eval' => 'trim',
            'default' => '',
        ],
    ],
];


\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('sys_file_metadata', $additionalColumns);
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addToAllTCAtypes(
    'sys_file_metadata',
    'dominant_colors',
    TYPO3\CMS\Core\Resource\File::FILETYPE_IMAGE,
    'after:source'
);
