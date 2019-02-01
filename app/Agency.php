<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Agency extends Model
{
    protected $table = 'agency';

    protected $guarded = [];

    // public function getItems($data){

    // }

     public static function getAgencyByType($type){
         $data = self::select('name', 'id')
             ->where('type', '=', $type)
             ->get();
         return $data;
     }

     public static function getListAgencyByUserId($agencyId){
         $data = self::select('name', 'id')
             ->where('user_id', '=', $agencyId)
             ->get();
         return $data;
     }
}
