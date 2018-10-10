<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Agency extends Model
{
    protected $table = 'agency';

    protected $fillable = [
        'user_id', 
        'name', 
        'address', 
        'province_id', 
        'district_id', 
        'village_id',
        'authorized_dealer', 
        'contract', 
        'image', 
        'params',
        'hotline',
        'email',
        'website',
        'lat',
        'lng',
        'owner',
        'owner_mobile',
        'manager',
        'manager_mobile',
        'min_price',
        'max_price',
        'open',
        'close'
    ];
}
