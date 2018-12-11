<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AdsLocations extends Model
{
    protected $table = 'ads_location';
    protected $fillable = [
        'parent_id',
        'name',
        'code',
        'price',
        'size'
    ];
    public $timestamps = true;

    public static function getItems(){
        return self::paginate(20);
    }

    public static function getParentItems(){
        $items = self::where('parent_id', '=', '0')
            ->get();
        return $items;
    }

}
