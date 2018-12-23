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
        'close',
        'type'
    ];

    public function getItems($data){

    }

    public static function getAgencyByType($type){
        $data = self::select('name', 'id')
            ->where('type', '=', $type)
            ->get();
        return $data;
    }
}
