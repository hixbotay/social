<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;


class ProvinceGroup extends Model
{
    protected $table = 'province_groups';

    protected $fillable = ['name', 'province_ids'];

    public $timestamps = false;


    public function get_list_province(){
        $province = DB::table('devvn_tinhthanhpho')->select('name', 'matp')->get();
        return $province;
    }

    public static function all_province(){
        $province = DB::table('devvn_tinhthanhpho')->select('name', 'matp')->get();
        return $province;
    }

    public static function all_district(){
        $province = DB::table('devvn_quanhuyen')->select('name', 'maqh')->get();
        return $province;
    }


}
