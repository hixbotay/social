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

    public static function all_district($province_id){
        $province = DB::table('devvn_quanhuyen')
            ->select('name', 'maqh', 'matp')
            ->where('matp', '=', $province_id)
            ->get();
        return $province;
    }

    public static function all_commune($district_id){
        $commune = DB::table('devvn_xaphuongthitran')
            ->select('xaid', 'name', 'maqh')
            ->where('maqh', '=', $district_id)
            ->get();
        return $commune;
    }


}
