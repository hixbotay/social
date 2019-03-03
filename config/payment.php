<?php


return [
    'vtc' => [
        'name' => 'VTC PAY',
        'website_id' => 6606,
        'reference_number' => 'VTC PAY',
        'receiver_account' => 'gateway_vtcpay',
        'url_return' => 'https://noiduyen.vn/payment/proccess',
        'language' => 'vi',
        'security_code' => 'izW5yYUkplywaHiS2CZoFA2D1dYfunxe2be3l7LI',
        'receiver_account' => '0977119830',
        'currency' => 'VND',
    ],
    'currency' => [
        'name' => 'Việt nam đồng',
        'code' => 'VNĐ',
        'shortcode' => 'đ'
    ],
    'status' => [
        'CHARGE' => 'Nạp tiền',
        'WITHDRAW' => 'Rút tiền',
        'UPDATE' => 'Nâng cấp',
        'GROUP_DATING' => 'Hẹn nhóm',
        'COUPLE_DATING' => 'Hẹn đôi',
        'VIP' => 'VIP',
    ],
    'defaultPrice' => [
        'dating' => [
            'deposit' => 50000, // tiền cọc khi tạo cuộc hẹn 
            'couple_dating_price' => 10000,
            'group_dating_price' => 20000
        ],
        'featured_24h' => 20000,
        'gift_commission' => 10,
        'message_100' => 20000,
        'vip_1' => 50000,
        'vip_2' => 80000,
        'vip_3' => 100000,
        'vip_4' => 120000,
        'vip_5' => 130000,
        'vip_6' => 150000,
        'vip_forever' => 10000000,
        'withdraw_fee' => 10000
    ]
];