<?php

return [
    'ctrl' => [
        'label' => 'hash',
        'title' => 'Placeholder generation queue item',
        'tstamp' => 'tstamp',
        'crdate' => 'crdate',
    ],
    'types' => [
        '0' => [
            'showitem' => 'sys_file_uid, hash, status'
        ]
    ],
    'columns' => [
        'sys_file_uid' => [
            'label' => 'sys_file_uid',
            'excluded' => 0,
            'config' => [
                'type' => 'input'
            ]
        ],
        'hash' => [
            'label' => 'hash',
            'excluded' => 0,
            'config' => [
                'type' => 'input'
            ]
        ],
        'status' => [
            'label' => 'status',
            'excluded' => 0,
            'config' => [
                'type' => 'input'
            ]
        ]
    ]
];
