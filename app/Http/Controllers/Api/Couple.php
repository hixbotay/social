<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class Couple extends Controller {
    public function search(Request $request) {
        $user = Auth::user();
        if($user->dismiss_users != "") {
            $dismissUsers = explode(",", $user->dismiss_users);
        } else {
            $dismissUsers = [];
        }

        // dismiss current user 
        array_push($dismissUsers, $user->id);

        $query = $request->query->all();
        if(array_key_exists('marital_status', $query)) {
            $query['marital_status'] = (int) $query['marital_status'];
        }
        
        if(array_key_exists('q', $query)) {
            unset($query['q']);
        }
    
        if(array_key_exists('page', $query)) {
            unset($query['page']);
        }

        if(array_key_exists('name', $query)) {
            $name = $query['name'];
            unset($query['name']);

            $results = \App\User::where($query)
                ->whereNotIn('users.id', $dismissUsers)
                ->where('name', 'like', DB::raw("'%".$name."%'"))
                ->leftjoin('user_relationship', 'user_relationship.to_user_id', '=', 'users.id')
                ->leftjoin('devvn_tinhthanhpho', 'users.hometown_province', '=', 'devvn_tinhthanhpho.matp')
                ->select(DB::raw(
                    'users.id, users.name, users.avatar, users.birthday, users.description,
                    devvn_tinhthanhpho.name AS hometown_province_name,
                    SUM(case user_relationship.is_loved WHEN 1 THEN 1 ELSE null END) AS loveNumber, 
                    SUM(case user_relationship.is_like WHEN 1 THEN 1 ELSE null END) AS likeNumber'
                ))
                ->groupBy('users.id')
                ->paginate(10);
        } else {
            $results = \App\User::where($query)
                ->whereNotIn('users.id', $dismissUsers)
                ->leftjoin('user_relationship', 'user_relationship.to_user_id', '=', 'users.id')
                ->leftjoin('devvn_tinhthanhpho', 'users.hometown_province', '=', 'devvn_tinhthanhpho.matp')
                ->select(DB::raw(
                    'users.id, users.name, users.avatar, users.birthday, users.description,
                    devvn_tinhthanhpho.name AS hometown_province_name,
                    SUM(case user_relationship.is_loved WHEN 1 THEN 1 ELSE null END) AS loveNumber, 
                    SUM(case user_relationship.is_like WHEN 1 THEN 1 ELSE null END) AS likeNumber'
                ))
                ->groupBy('users.id')
                ->paginate(10);
        }

        
        
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

            $photos = \App\UserPhoto::select(['source'])->where('user_id', $user->id)->paginate(10);
            $temp_1 = [];

            foreach($photos as $photo) {
                array_push($temp_1, $photo->source);
            }
            $user['photos'] = $temp_1;
        }

        return json_encode($results);
    }

    public function dismiss(Request $request) {
        $user = Auth::user();
        if($user->dismiss_users == "") {
            $user->dismiss_users .= $request->get('user_id');
        } else {
            $user->dismiss_users .= ','.$request->get('user_id');
        }
        $user->save();
        return json_encode(['ok' => 1]);
    }
}

