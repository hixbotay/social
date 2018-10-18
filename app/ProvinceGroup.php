<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;


class ProvinceGroup extends Model
{
    protected $table = 'province_groups';

    protected $fillable = ['name', 'province_ids'];

    public $timestamps = true;


    public function get_list_province(){
        $province = DB::table('devvn_tinhthanhpho')->select('name', 'matp')->get();
        return $province;
    }

    public static function all_province(){
        $provinces = DB::table('devvn_tinhthanhpho')->select('name', 'matp')->get();
        return $provinces;
    }

    public static function all_district($province_id){
        $districts = DB::table('devvn_quanhuyen')
            ->select('name', 'maqh', 'matp')
            ->where('matp', '=', $province_id)
            ->get();
        return response()->json($districts);
        // return $districts;
    }

    public static function getListVillageByDistrict($id){
        $data = DB::table('devvn_xaphuongthitran')
            ->select('xaid', 'name', 'maqh')
            ->where('maqh', '=', $id)
            ->get();

        return $data;
    }

    public static function all_commune($district_id){
        $communes = DB::table('devvn_xaphuongthitran')
            ->select('xaid', 'name', 'maqh')
            ->where('maqh', '=', $district_id)
            ->get();
        return response()->json($communes);
    }


}
