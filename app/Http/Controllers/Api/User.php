<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use App\Payments;
use ImageOptimizer;
use \App\Notification;

date_default_timezone_set('Asia/Saigon');

class User extends Controller
{
    // helper function processing base64 image
    function processImage(String $base64Data, String $path) {
        $base64_image = explode(',', $base64Data)[1];

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
        $storePath = $path."/".$filename;
        
        Storage::disk('local')->put($storePath, base64_decode($base64_image));

        // ImageOptimizer::optimize($storePath);

        return $storePath;
    }

    public function getAllEthnicity() {
        $ethnicities = DB::table("ethnicity")->get();
        return ['ethnicities' => $ethnicities];
    }

    public function getAllReligion() {
        $religions = DB::table("religion")->get();
        return ['religions' => $religions];
    }

    public function getCurrentUser() {
        $user = \App\User::where('users.id', '=', Auth::id())
            ->leftjoin('user_relationship', 'users.id', '=', 'user_relationship.to_user_id')
            ->select(DB::raw(
                'users.*,
                SUM(case user_relationship.is_loved WHEN 1 THEN 1 ELSE null END) AS loveNumber, 
                SUM(case user_relationship.is_like WHEN 1 THEN 1 ELSE null END) AS likeNumber'
            ))
            ->first();
        $user->loveNumber = (int) $user->loveNumber;
        $user->likeNumber = (int) $user->likeNumber;
        $user->viewNumber = DB::table('profile_visitor')->where('profile_id', '=', $user->id)->count();
        $user->vip = Payments::checkVIP(Auth::id());

        // check complete percentage
        $user->hasHobby = false;
        $user->hasJob = false;

        $hobbies = DB::table('user_hobby_map')->where('user_id', '=', $user->id)->get();
        if(count($hobbies)) {
            $user->hasHobby = true;
        }
        if($user->job) {
            $user->hasJob = true;
        }

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

    // public function index(Request $request){
    //     return array('code' => 200);
    // }

    // public function visitProfile(Request $request){
    //     $data = $request->getContent();
    //     $data = json_decode($data, true);
    //     $data['created_at'] = $data['updated_at'] = date("Y-m-d H:i:s");
    //     $result = \App\User::visitProfile($data);
    //     if ($result){
    //         return (array('message' => 'Thành công'));
    //     }else{
    //         return (array('message' => 'Không thành công'));
    //     }
    // }

    /*
     * Function to like/love/follow ... profile
     */
    public function createOrUpdateRelationship(Request $request, $user_id){
        $data = json_decode($request->getContent());
        $from_user_id = Auth::id();

        if($from_user_id == $user_id) {
            return json_encode(['message' => 'Đã có lỗi xảy ra']);
        }
 
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

            // create notification
            $notification = [
                'user_id' => $user_id,
                'actor' => $from_user_id, // Auth::id()
                'content' => "Đã bày tỏ cảm xúc dành cho bạn",
                'type' => "relationship",
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ];

            Notification::insert($notification);
        }
        
        return $relationship;
    }

    public function getCurrentUserDetail() {
        $id = Auth::id();

        $user = \App\User::where('users.id', $id)
            ->leftjoin('user_jobs', 'job', '=', 'user_jobs.id')
            ->leftjoin('user_relationship', 'users.id', '=', 'user_relationship.to_user_id')
            ->leftjoin('education', 'users.education', '=', 'education.id')
            ->leftjoin('ethnicity', 'users.ethnicity', '=', 'ethnicity.id')
            ->leftjoin('religion', 'users.religion', '=', 'religion.id')
            ->leftjoin('devvn_tinhthanhpho', 'users.province_id', '=', 'devvn_tinhthanhpho.matp')
            ->leftjoin('devvn_quanhuyen', 'users.district_id', '=', 'devvn_quanhuyen.maqh')
            ->leftjoin('devvn_xaphuongthitran', 'users.village_id', '=', 'devvn_xaphuongthitran.xaid')
            ->leftjoin('id_card_verification', function ($join) {
                $join->on('users.id', '=', 'id_card_verification.user_id');
                $join->on(function($query) {
                    $query->where('id_card_verification.is_verified', '=', 1); 
                });
            })
            ->select(DB::raw(
                'users.*, 
                user_jobs.id AS job_id,
                user_jobs.name AS job_name, 
                education.name AS education_name,
                ethnicity.name AS ethnicity_name,
                religion.name AS religion_name,
                devvn_tinhthanhpho.name AS province_name,
                devvn_quanhuyen.name AS district_name,
                devvn_xaphuongthitran.name AS village_name,
                (CASE is_verified WHEN 1 THEN 1 ELSE 0 END) AS is_id_card_verified'
            ))
            ->first();

        $hobbies =  DB::table('user_hobby_map')
                    ->where('user_hobby_map.user_id', $id)
                    ->leftjoin('user_hobby', 'hobby_id', '=', 'user_hobby.id')
                    ->select(DB::raw('user_hobby.*'))
                    ->get();
        $user->hobbies = $hobbies;

        return json_encode($user);
    }

    public function getOtherUserDetail($id) {
        $user = \App\User::where('users.id', $id)
            ->leftjoin('user_jobs', 'job', '=', 'user_jobs.id')
            ->leftjoin('user_relationship', 'users.id', '=', 'user_relationship.to_user_id')
            ->leftjoin('education', 'users.education', '=', 'education.id')
            ->leftjoin('ethnicity', 'users.ethnicity', '=', 'ethnicity.id')
            ->leftjoin('religion', 'users.religion', '=', 'religion.id')
            ->leftjoin('devvn_tinhthanhpho', 'users.province_id', '=', 'devvn_tinhthanhpho.matp')
            ->leftjoin('devvn_quanhuyen', 'users.district_id', '=', 'devvn_quanhuyen.maqh')
            ->leftjoin('devvn_xaphuongthitran', 'users.village_id', '=', 'devvn_xaphuongthitran.xaid')
            ->leftjoin('id_card_verification', function ($join) {
                $join->on('users.id', '=', 'id_card_verification.user_id');
                $join->on(function($query) {
                    $query->where('id_card_verification.is_verified', '=', 1); 
                });
            })
            ->select(DB::raw(
                'users.*, 
                user_jobs.id AS job_id,
                user_jobs.name AS job_name, 
                education.name AS education_name,
                ethnicity.name AS ethnicity_name,
                religion.name AS religion_name,
                devvn_tinhthanhpho.name AS province_name,
                devvn_quanhuyen.name AS district_name,
                devvn_xaphuongthitran.name AS village_name,
                (CASE is_verified WHEN 1 THEN 1 ELSE 0 END) AS is_id_card_verified'
            ))
            ->first();

        $hobbies =  DB::table('user_hobby_map')
                    ->where('user_hobby_map.user_id', $id)
                    ->leftjoin('user_hobby', 'hobby_id', '=', 'user_hobby.id')
                    ->select(DB::raw('user_hobby.*'))
                    ->get();
        $user->hobbies = $hobbies;

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
                    ->select(DB::raw(
                        'user_relationship.*,
                        SUM(case user_relationship.is_loved WHEN 1 THEN 1 ELSE null END) AS loveNumber, 
                        SUM(case user_relationship.is_like WHEN 1 THEN 1 ELSE null END) AS likeNumber'
                    ))
                    ->groupBy('to_user_id')
                    ->first();
        
        $temp = DB::table('profile_visitor')->where([
            ['profile_id', '=', $id],
            ['visitor_id', '=', Auth::id()]
        ])
        ->select(
            DB::raw('profile_visitor.*, COUNT(profile_id='.$id.') AS viewNumber')
        )
        ->first();
        
        $user->viewNumber = $temp->viewNumber;

        if(!$temp) {
            // add to visitor table
            DB::table('profile_visitor')->insert([
                'profile_id' => $id,
                'visitor_id' => Auth::id(),
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s"),
            ]);
            
            // notify
            Notification::insert([
                'user_id' => $id,
                'actor' => Auth::id(), 
                'content' => "Đã ghé thăm trang cá nhân của bạn",
                'type' => "visit",
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ]);
        }

        $result = [
            'user' => $user,
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

    public function logout() {
        Auth::logout();
        return json_encode(['ok' => 1]);
    }

    public function updateAvatar(Request $request) {
        $user = Auth::user();
        $data = json_decode($request->getContent());

        $user->avatar = $this->processImage($data->image, 'storage/app/user'.$user->id.'/avatar');
        $user->save();

        return json_encode($user);
    }

    public function storeIdCardInfo(Request $request) {
        $user_id = Auth::id();
        $data = json_decode($request->getContent());

        $result = DB::table('id_card_verification')->insert([
            'user_id' => $user_id,
            'id_card_front_photo' => $this->processImage($data->id_card_front_photo, 'storage/app/user'.$user_id.'/id-card'),
            'id_card_backside_photo' => $this->processImage($data->id_card_backside_photo, 'storage/app/user'.$user_id.'/id-card'),
            'name' => $data->name,
            'id_number' => $data->id_number,
            'birthday' => $data->birthday,
            'date_of_issues' => $data->date_of_issues,
            'is_verified' => 0,
            'created_at' => date("Y-m-d H:i:s"),
            'updated_at' => date("Y-m-d H:i:s")
        ]);
        return ['result' => $result];
    }
}

