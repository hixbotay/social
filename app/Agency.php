<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Agency extends Model
{
    protected $table = 'agency';

    protected $guarded = [];

    // public function getItems($data){

    // }

     public static function getAgencyByType($type){
         $currentUser = Auth::user();
         $data = self::select('name', 'id')
             ->where('type', '=', $type)
             ->where(function ($query) use ($currentUser){
                 if ($currentUser->is_admin != 1){
                     $query->where('user_id', '=', $currentUser->id);
                 }
             })
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
