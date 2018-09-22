<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class Couple extends Controller {
    public static function find($keyword) {
        $results = \App\User::select(['id', 'name', 'address', 'avatar'])->where('name', 'like', DB::raw("BINARY '%".$keyword."%'"))->get();
        return $results;
    }

    public static function findOne($id) {
        $user = \App\User::find($id);
        $photos = \App\UserPhoto::select(['source'])->where('user_id', $id)->get();
        return ['user' => $user, 'photos' => $photos];
    }
}