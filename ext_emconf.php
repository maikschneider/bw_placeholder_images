<?php

/**
 * Extension Manager/Repository config file for ext "bw_placeholder_images".
 */
$EM_CONF[$_EXTKEY] = [
    'title' => 'Bw Placeholder Images',
    'description' => 'Inline SVG placeholder images with lazy loading',
    'category' => 'templates',
    'constraints' => [
        'depends' => [
            'typo3' => '10.9.99-11.9.99',
        ],
        'conflicts' => [
        ],
    ],
    'autoload' => [
        'psr-4' => [
            'Blueways\\BwPlaceholderImages\\' => 'Classes'
        ],
    ],
    'state' => 'stable',
    'uploadfolder' => 0,
    'createDirs' => '',
    'clearCacheOnLoad' => 1,
    'author' => 'Maik Schneider',
    'author_email' => 'm.schneider@blueways.de',
    'author_company' => 'blueways',
    'version' => '2.0.0',
];
