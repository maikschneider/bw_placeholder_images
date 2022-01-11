<?php
return [
    'triangular_abort' => [
        'path' => '/triangular/abort',
        'target' => \Blueways\BwPlaceholderImages\Controller\BackendController::class . '::triangularAbort'
    ],
    'triangular_delete' => [
        'path' => '/triangular/delete',
        'target' => \Blueways\BwPlaceholderImages\Controller\BackendController::class . '::triangularDelete'
    ],
    'triangular_refresh' => [
        'path' => '/triangular/refresh',
        'target' => \Blueways\BwPlaceholderImages\Controller\BackendController::class . '::triangularRefresh'
    ]
];
