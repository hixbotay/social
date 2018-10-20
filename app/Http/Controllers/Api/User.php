<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

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
            ->leftjoin('education', 'users.education', '=', 'education.id')
            ->select(DB::raw(
                'users.*, 
                user_jobs.id AS job_id,
                user_jobs.name AS job_name, 
                education.name AS education_name,
                SUM(case user_relationship.is_loved WHEN 1 THEN 1 ELSE null END) AS loveNumber, 
                SUM(case user_relationship.is_like WHEN 1 THEN 1 ELSE null END) AS likeNumber'
            ))
            ->get();

        $hobbies =  DB::table('user_hobby_map')
                    ->where('user_hobby_map.user_id', $id)
                    ->leftjoin('user_hobby', 'hobby_id', '=', 'user_hobby.id')
                    ->select(DB::raw('user_hobby.*'))
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

    public function listFriends($type) {
        $user_id = Auth::id();
        if($type == 'you-like') {
            $results = \App\UserRelationship::where('is_like', '=', 1)           
                ->orWhere('is_loved', '=', 1)
                ->leftjoin('users', 'user_relationship.to_user_id', '=', 'users.id')
                ->select(DB::raw(
                    'users.id, users.name, users.address, users.avatar, users.birthday,
                    user_relationship.from_user_id, user_relationship.is_like, user_relationship.is_loved,
                    SUM(case user_relationship.is_loved WHEN 1 THEN 1 ELSE null END) AS loveNumber, 
                    SUM(case user_relationship.is_like WHEN 1 THEN 1 ELSE null END) AS likeNumber'
                ))
                ->groupBy('users.id')
                ->having('from_user_id', '=', $user_id)
                ->get();
        } else if ($type == 'like-you') {
            $results = \App\UserRelationship::where('is_like', '=', 1)           
                ->orWhere('is_loved', '=', 1)
                ->leftjoin('users', 'user_relationship.to_user_id', '=', 'users.id')
                ->select(DB::raw(
                    'users.id, users.name, users.address, users.avatar, users.birthday,
                    user_relationship.to_user_id, user_relationship.is_like, user_relationship.is_loved,
                    SUM(case user_relationship.is_loved WHEN 1 THEN 1 ELSE null END) AS loveNumber, 
                    SUM(case user_relationship.is_like WHEN 1 THEN 1 ELSE null END) AS likeNumber'
                ))
                ->groupBy('users.id')
                ->having('to_user_id', '=', $user_id)
                ->get();
        } else if ($type == 'visited') {
            // print_r($user_id);
            $results = DB::table('profile_visitor')
                ->where('profile_id', '=', $user_id)
                ->leftjoin('users', 'visitor_id', '=', 'users.id')
                ->leftjoin('user_relationship', 'user_relationship.to_user_id', '=', 'visitor_id')
                ->select(DB::raw(
                    'users.id, users.name, users.address, users.avatar, users.birthday,
                    user_relationship.to_user_id, user_relationship.is_like, user_relationship.is_loved,
                    SUM(case user_relationship.is_loved WHEN 1 THEN 1 ELSE null END) AS loveNumber, 
                    SUM(case user_relationship.is_like WHEN 1 THEN 1 ELSE null END) AS likeNumber'
                ))
                ->groupBy('users.id')
                // ->having('from_user_id', '=', $user_id)
                ->get();
        }
        else $results = [];
        
        return json_encode($results);
    }

    public function uploadIdCardPhoto(Request $request, $id) {
        $data = json_decode($request->getContent());

        $base64_image = explode(',', $data->image)[1];

        $firstChar = substr($base64_image, 0, 1);

        switch($firstChar) {
            case '/': {
				$extension = 'jpg';
				break;
			}
			case 'i': {
				$extension = 'png';
				break;
			}
			case 'R': {
				$extension = 'gif';
				break;
			}
			default: {
				$extension = 'jpg';
				break;
			}
        }
 
        $filename = (string) time().'.'.$extension;
        
        Storage::disk('local')->put('user'.$id.'/id-card/'.$filename, base64_decode($base64_image));

        $user = \App\User::find($id);
        $user->id_card_photos = 'storage/app/user'.$id.'/id-card/'.$filename;
        $user->save();
        return json_encode($user);
    }
}

