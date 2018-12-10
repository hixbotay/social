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
        'couple_dating' => [
            'couple_dating_price' => 10000,
            'double_dating_price' => 20000,
            'fee' => [

            ]
        ],
        'group_dating' => [
            'group_dating_f_price' => 70000,
            'group_dating_m_price' => 90000,
            'fee' => []
        ],
        'featured_24h' => 20000,
        'gift_commission' => 25000,
        'message_100' => 30000,
        'vip_1' => 20000,
        'vip_2' => 20000,
        'vip_3' => 20000,
        'vip_4' => 20000,
        'vip_5' => 20000,
        'vip_6' => 20000,
        'withdraw_fee' => 70000
    ]
];