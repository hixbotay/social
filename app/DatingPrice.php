<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DatingPrice extends Model
{
    protected $table = 'dating_price';

    protected $fillable = ['type', 'province_group_id', 'couple_dating_price', 'group_dating_m_price', 'group_dating_f_price'];

//    public $timestamps = false;

    public static function getItems(){
        $items = self::select('dating_price.*', 'province_groups.name AS province_group_name')
            ->join('province_groups', 'province_groups.id', '=', 'dating_price.province_group_id')
            ->get();
        return $items;
    }

}
