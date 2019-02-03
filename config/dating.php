<?php

return [
    'events' => [
        'forthcoming' => (object)array(
            'key' => 'forthcoming',
            'label' => 'event_forthcoming',
            'color' => '#cce5ff'
        ),
        'happening' => (object)array(
            'key' => 'happening',
            'label' => 'event_happening',
            'color' => '#cce5ff'
        ),
        'cancelled' => (object)array(
            'key' => 'cancelled',
            'label' => 'event_cancelled',
            'color' => 'red'
        ),
        'finished' => (object)array(
            'key' => 'finished',
            'label' => 'event_finished',
            'color' => '#24b046'
        ),
    ],
    'type' => [
        'couple' => (object)array(
            'key' => 'couple',
            'label' => 'dating_couple',
            'color' => 'green',
        ),
        'group' => (object)array(
            'key' => 'group',
            'label' => 'dating_group',
            'color' => 'red'
        )
    ]
];