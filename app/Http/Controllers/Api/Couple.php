<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class Couple extends Controller {
    public static function find($keyword) {
        $results = \App\User::where('name', 'like', DB::raw("BINARY '%".$keyword."%'"))
                ->leftjoin('user_relationship', 'user_relationship.to_user_id', '=', 'users.id')
                ->select(DB::raw(
                    'users.id, users.name, users.address, users.avatar, users.birthday,
                    user_relationship.is_like, user_relationship.is_loved,
                    SUM(case user_relationship.is_loved WHEN 1 THEN 1 ELSE null END) AS loveNumber, 
                    SUM(case user_relationship.is_like WHEN 1 THEN 1 ELSE null END) AS likeNumber'
                ))
                ->groupBy('users.id')
                ->get();
        return $results;
    }

    public static function findOne($id) {
        $user = \App\User::find($id);
        $photos = \App\UserPhoto::select(['source'])->where('user_id', $id)->get();
        return ['user' => $user, 'photos' => $photos];
    }
}