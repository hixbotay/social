<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class Couple extends Controller {
    public function search(Request $request) {
        $query = $request->query->all();
        if(array_key_exists('q', $query)) {
            unset($query['q']);
        }
        if(array_key_exists('name', $query)) {
            $name = $query['name'];
            unset($query['name']);
        }

        $results = \App\User::where($query)
                ->where('name', 'like', DB::raw("'%".$name."%'"))
                ->leftjoin('user_relationship', 'user_relationship.to_user_id', '=', 'users.id')
                ->select(DB::raw(
                    'users.id, users.name, users.address, users.avatar, users.birthday,
                    SUM(case user_relationship.is_loved WHEN 1 THEN 1 ELSE null END) AS loveNumber, 
                    SUM(case user_relationship.is_like WHEN 1 THEN 1 ELSE null END) AS likeNumber'
                ))
                ->groupBy('users.id')
                ->paginate(10);
        
        foreach($results as $user) {
            $user['is_like'] = 0;
            $user['is_loved'] = 0;

            $temp = DB::table('user_relationship')
                ->where([
                    ['from_user_id', '=', Auth::id()],
                    ['to_user_id', '=', $user->id]
                ])
                ->first();
            if($temp != null) {
                $user['is_like'] = $temp->is_like;
                $user['is_loved'] = $temp->is_loved;
            }
        }

        return json_encode($results);
    }

    public static function findOne($id) {
        $user = \App\User::find($id);
        $photos = \App\UserPhoto::select(['source'])->where('user_id', $id)->get();
        return ['user' => $user, 'photos' => $photos];
    }
}