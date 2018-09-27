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
    public function createOrUpdateRelationship(Request $request, $user_id){
        $data = json_decode($request->getContent());
        $from_user_id = Auth::id();
 
        $relationship = \App\UserRelationship::where([
                        ['from_user_id', '=', $from_user_id],
                        ['to_user_id', '=', $user_id]
                    ])
                    ->first();
        
        if($relationship) {
            foreach($data as $key => $value) {
                $relationship->$key = $value;
            }
            $relationship->save();
        } else {
            $newRelationship = [
                'from_user_id' => $from_user_id,
                'to_user_id' => $user_id
            ];

            foreach($data as $key => $value) {
                $newRelationship[$key] = $value;
            }          
            $relationship = \App\UserRelationship::create($newRelationship);
        }
        
        return $relationship;
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
        $user = \App\User::where('users.id', $id)
            ->leftjoin('user_jobs', 'job', '=', 'user_jobs.id')
            ->select('users.name', 'users.avatar', 'users.favourite', 'user_jobs.name AS job_name')
            ->first();

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
        
        $relationship = \App\UserRelationship::where([
                        ['from_user_id', '=', Auth::id()],
                        ['to_user_id', '=', $id]
                    ])
                    ->first();
                    
        

        $result = [
            'user' => $user,
            'hobbies' => $hobbies,
            'posts' => $posts,
            'relationship' => $relationship
        ];

        return json_encode($result);
    }
}

