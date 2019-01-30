<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Authentication Defaults
    |--------------------------------------------------------------------------
    |
    | This option controls the default authentication "guard" and password
    | reset options for your application. You may change these defaults
    | as required, but they're a perfect start for most applications.
    |
    */

    'defaults' => [
        'guard' => 'web',
        'passwords' => 'users',
    ],

    /*
    |--------------------------------------------------------------------------
    | Authentication Guards
    |--------------------------------------------------------------------------
    |
    | Next, you may define every authentication guard for your application.
    | Of course, a great default configuration has been defined for you
    | here which uses session storage and the Eloquent user provider.
    |
    | All authentication drivers have a user provider. This defines how the
    | users are actually retrieved out of your database or other storage
    | mechanisms used by this application to persist your user's data.
    |
    | Supported: "session", "token"
    |
    */

    'guards' => [
        'web' => [
            'driver' => 'session',
            'provider' => 'users',
        ],

        'api' => [
            'driver' => 'token',
            'provider' => 'users',
        ],
        'admin' => [
            'driver' => 'session',
            'provider' => 'admins',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | User Providers
    |--------------------------------------------------------------------------
    |
    | All authentication drivers have a user provider. This defines how the
    | users are actually retrieved out of your database or other storage
    | mechanisms used by this application to persist your user's data.
    |
    | If you have multiple user tables or models you may configure multiple
    | sources which represent each model / table. These sources may then
    | be assigned to any extra authentication guards you have defined.
    |
    | Supported: "database", "eloquent"
    |
    */

    'providers' => [
        'users' => [
            'driver' => 'eloquent',
            'model' => App\User::class,
        ],

        'admins' => [
            'driver' => 'eloquent',
            'model' => App\Admin::class,
        ],

        // 'users' => [
        //     'driver' => 'database',
        //     'table' => 'users',
        // ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Resetting Passwords
    |--------------------------------------------------------------------------
    |
    | You may specify multiple password reset configurations if you have more
    | than one user table or model in the application and you want to have
    | separate password reset settings based on the specific user types.
    |
    | The expire time is the number of minutes that the reset token should be
    | considered valid. This security feature keeps tokens short-lived so
    | they have less time to be guessed. You may change this as needed.
    |
    */

    'passwords' => [
        'users' => [
            'provider' => 'users',
            'table' => 'password_resets',
            'expire' => 60,
        ],
        'admins' => [
            'provider' => 'admins',
            'table' => 'password_resets',
            'expire' => 60,
        ],
    ],

    'action' => [
        'ACCESS_ADMIN' => 'ACCESS_ADMIN',
        'CREATE_USERS' => 'CREATE_USERS',
        'ADD_USERS' => 'ADD_USERS',
        'EDIT_USERS' => 'EDIT_USERS',
        'DELETE_USERS' => 'DELETE_USERS',
        'LIST_USERS' => 'LIST_USERS',
        'LIST_USER_GROUP' => 'LIST_USER_GROUP',
        'LIST_POST' => 'LIST_POST',
        'EDIT_POST' => 'EDIT_POST',
        'DELETE_POST' => 'DELETE_POST',
        'ADD_POST' => 'ADD_POST',
        'VIEW_REPORTS' => 'VIEW_REPORTS',
        'VIEW_DASHBOARD' => 'VIEW_DASHBOARD',
        'LIST_FINANCE' => 'LIST_FINANCE',
        'EDIT_FINANCE' => 'EDIT_FINANCE',
        'DELETE_FINANCE' => 'DELETE_FINANCE',
        'ADD_FINANCE' => 'ADD_FINANCE',
        'LIST_DATING_PRICE' => 'LIST_DATING_PRICE',
        'EDIT_DATING_PRICE' => 'EDIT_DATING_PRICE',
        'ADD_DATING_PRICE' => 'ADD_DATING_PRICE',
        'DELETE_DATING_PRICE' => 'DELETE_DATING_PRICE',
        'EDIT_SYTEM_PRICE' => 'EDIT_SYSTEM_PRICE',
        'ADD_CAFE' => 'ADD_CAFE',
        'LIST_CAFE' => 'LIST_CAFE',
        'EDIT_CAFE' => 'EDIT_CAFE',
        'DELETE_CAFE' => 'DELETE_CAFE',
        'MANAGE_SYSTEM_CONFIG' => 'MANAGE_SYSTEM_CONFIG',
        'MANAGE_OTHER_SYSTEM_CONFIG' => 'MANAGE_OTHER_SYSTEM_CONFIG',
        'LIST_JOBS' => 'LIST_JOB',
        'LIST_PROVINCE_GROUP' => 'LIST_PROVINCE_GROUP',
        'LIST_HOBBY' => 'LIST_HOBBY',
        'LIST_EDUCATION' => 'LIST_EDUCATION',
        'CONFIG_PRICE' => 'CONFIG_PRICE',
        'CONFIG_GENERAL' => 'CONFIG_GENERAL',
        'ADS_LOCATIONS' => 'ADS_LOCATIONS',
        'ADS_ORDERS' => 'ADS_ORDERS',

    ],

    'usergroup' => [
        'administrator' => 'administrator',
        'shareholders' => 'shareholders',
        'general_operation' => 'general_operation',
        'province_operation' => 'province_operation',
        'district_operation' => 'district_operation',
        'member_brands' => 'member_brands',
        'memeber' => 'memeber',
        'agency' => 'agency',
        'agency_employee' => 'agency_employee',
        'guest' => 'guest',
    ]

];
