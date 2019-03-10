<?php

return [
    'permission' => [
        'access_dashboard' => 'access_dashboard',
    ],
    'agency_register_status' => [
        [
            'status' => 0,
            'color' => '',
            'class' => 'text-warning',
            'name' => 'Đang chờ duyệt'
        ],
        [
            'status' => 1,
            'color' => '',
            'class' => 'text-success',
            'name' => 'Đã duyệt'
        ],
        [
            'status' => 2,
            'color' => '',
            'class' => 'text-danger',
            'name' => 'Đã hủy'
        ]
    ]
];