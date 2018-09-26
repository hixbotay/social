<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class User extends Controller
{
    public function getCurrentUser() {
        $user = Auth::user();
        return json_encode($user);
    }

    public function getHobbies(Request $request){
        return \App\Hobby::get_all_hobbies();
    }
    public function getEducation(Request $request){
        return \App\Education::all();
    }
    public function getJob(Request $request){
        return \App\Job::all();
    }

    public function index(Request $request){
        return array('code' => 200);
    }

    public function visitProfile(Request $request){
        $data = $request->getContent();
        $data = json_decode($data, true);
        $data['created_at'] = $data['updated_at'] = date("Y-m-d H:i:s");
        $result = \App\User::visitProfile($data);
        if ($result){
            return (array('message' => 'Thành công'));
        }else{
            return (array('message' => 'Không thành công'));
        }
    }

    /*
     * Function to like/love/follow ... profile
     */
    public function create(Request $request){
        $data = $request->getContent();
        $result = \App\UserRelationship::create($data);
        return $result;
    }

    public function getCurrentUserDetail() {
        $id = Auth::id();

        $users = \App\User::where('users.id', $id)
            ->leftjoin('user_jobs', 'job', '=', 'user_jobs.id')
            ->leftjoin('user_relationship', 'users.id', '=', 'user_relationship.to_user_id')
            ->select(DB::raw(
                'users.*, 
                user_jobs.name AS job_name, 
                SUM(case user_relationship.is_loved WHEN 1 THEN 1 ELSE null END) AS loveNumber, 
                SUM(case user_relationship.is_like WHEN 1 THEN 1 ELSE null END) AS likeNumber'
            ))
            ->get();

        $hobbies =  DB::table('user_hobby_map')
                    ->where('user_hobby_map.user_id', $id)
                    ->leftjoin('user_hobby', 'hobby_id', '=', 'user_hobby.id')
                    ->select('user_hobby.name')
                    ->get();
        $result = [
            'user' => $users[0],
            'hobbies' => $hobbies
        ];

        return json_encode($result);
    }

    public function getOtherUserDetail($id) {
        $users = \App\User::where('users.id', $id)
            ->leftjoin('user_jobs', 'job', '=', 'user_jobs.id')
            ->select('users.name', 'users.avatar', 'users.favourite', 'user_jobs.name AS job_name')
            ->get();

        $hobbies = DB::table('user_hobby_map')
                    ->where('user_hobby_map.user_id', $id)
                    ->leftjoin('user_hobby', 'hobby_id', '=', 'user_hobby.id')
                    ->select('user_hobby.name')
                    ->get();

        $posts = \App\Post::where('posts.user_id', $id)
                    ->leftjoin('post_photos', 'posts.id', '=', 'post_photos.post_id')
                    ->leftjoin('user_photos', 'user_photos.id', '=', 'post_photos.photo_id')
                    ->select('posts.*', 'user_photos.id AS photo_id', 'user_photos.source')
                    ->orderBy('id', 'DESC')
                    ->get();
    
        $result = [
            'user' => $users[0],
            'hobbies' => $hobbies,
            'posts' => $posts
        ];

        return json_encode($result);
    }
}

