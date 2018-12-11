<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Ads extends Model
{
    protected $table = 'ads_orders';
    protected $fillable = [
        'user_id',
        'from_time',
        'to_time',
        'image',
        'url',
        'payment_id',
        'pay_status',
        'total',
        'params',
    ];
    public $timestamps = true;

    public static function getItems(){
        $items = self::paginate(20);
        return $items;
    }

}
