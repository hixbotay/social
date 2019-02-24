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
use Illuminate\Support\Facades\Hash;
use Session;

date_default_timezone_set('Asia/Saigon');

class User extends Controller
{
    // helper function processing base64 image
    public function processImage(String $base64Data, String $path) {
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
 
        $filename = (string) time().uniqid().'.'.$extension;
        $storePath = $path."/".$filename;
        
        Storage::disk('local')->put($storePath, base64_decode($base64_image));

        // ImageOptimizer::optimize($storePath);

        return 'storage/app/'.$storePath;
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

        $configuration = \App\UserConfiguration::where('user_id', $user_id)->first();
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

            $is_notify = 0; 
            if($relationship->is_like && $configuration->notify_liked) {
                $is_notify = 1;
            }
            if($relationship->is_loved && $configuration->notify_loved) {
                $is_notify = 1;
            }

            if($is_notify) {
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
        }
        
        return $relationship;
    }

    public static function getCurrentUserDetail($user_id = null) {
        if(!Auth::id()) return;

        $id = $user_id ?: Auth::id();

        $user = \App\User::where('users.id', $id)
            ->leftjoin('user_jobs', 'job', '=', 'user_jobs.id')
            ->leftjoin('user_relationship', 'users.id', '=', 'user_relationship.to_user_id')
            ->leftjoin('education', 'users.education', '=', 'education.id')
            ->leftjoin('ethnicity', 'users.ethnicity', '=', 'ethnicity.id')
            ->leftjoin('religion', 'users.religion', '=', 'religion.id')
            ->leftjoin('devvn_tinhthanhpho', 'users.province_id', '=', 'devvn_tinhthanhpho.matp')
            ->leftjoin('devvn_quanhuyen', 'users.district_id', '=', 'devvn_quanhuyen.maqh')
            ->leftjoin('devvn_xaphuongthitran', 'users.village_id', '=', 'devvn_xaphuongthitran.xaid')
            ->select(DB::raw(
                'users.*, 
                user_jobs.name AS job_name, 
                education.name AS education_name,
                ethnicity.name AS ethnicity_name,
                religion.name AS religion_name,
                devvn_tinhthanhpho.name AS province_name,
                devvn_quanhuyen.name AS district_name,
                devvn_xaphuongthitran.name AS village_name'
            ))
            ->first();

        $id_card = DB::table('id_card_verification')
            ->where('user_id', $id)
            ->orderBy('id', "DESC")
            ->first();
            
        if(!$id_card) {
            $user->is_id_card_verified = 'not_yet';
        } else {
            if($id_card->is_verified) {
                $user->is_id_card_verified = 'verified';
            } else {
                $user->is_id_card_verified = 'pending';
            }
        }

        $hobbies =  DB::table('user_hobby_map')
                    ->where('user_hobby_map.user_id', $id)
                    ->leftjoin('user_hobby', 'hobby_id', '=', 'user_hobby.id')
                    ->select(DB::raw('user_hobby.*'))
                    ->get();
        $user->hobbies = $hobbies;

        $user->vip = Payments::checkVIP($id);

        return json_encode($user);
    }

    public function getOtherUserDetail($id) {
        // get other user config to get notify config
        $configuration = \App\UserConfiguration::where('user_id', '=', $id)->first();
        
        $current_user = Auth::user();
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
                ->join('users AS users', 'posts.user_id', '=', 'users.id')
                ->leftjoin('users AS author', 'posts.original_author', '=', 'author.id')
                ->leftjoin('post_photos', 'posts.id', '=', 'post_photos.post_id')
                ->leftjoin('user_photos', 'user_photos.id', '=', 'post_photos.photo_id')
                ->select(
                    'users.name AS user_name', 
                    'users.avatar AS user_avatar', 
                    'posts.*', 
                    'user_photos.id AS photo_id', 
                    'user_photos.source',
                    'author.name AS original_author_name',
                    'author.avatar AS original_author_avatar'
                )
                ->orderBy('id', 'DESC')
                ->get();
        
        $relationship = \App\UserRelationship::where([
                        ['from_user_id', '=', $current_user->id],
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
            ['visitor_id', '=', $current_user->id]
        ])
        ->select(
            DB::raw('profile_visitor.*, COUNT(profile_id='.$id.') AS viewNumber')
        )
        ->first();
        
        $user->viewNumber = 0;

        if(!$temp) {
            $user->viewNumber = $temp->viewNumber;

            // add to visitor table
            DB::table('profile_visitor')->insert([
                'profile_id' => $id,
                'visitor_id' => Auth::id(),
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s"),
            ]);

            if(!$current_user->is_incognito || $configuration->notify_profile_visited) {
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
                ->leftjoin('users', 'user_relationship.from_user_id', '=', 'users.id')
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
                    'users.id, users.name, users.address, users.avatar, users.birthday, users.is_incognito,
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

        $user = Auth::user();
        $user->id_card_photos = 'storage/app/user'.$id.'/id-card/'.$filename;
        $user->save();
        return json_encode($user);
    }

    public function logout() {
        Session::flush();
        Auth::logout();
        
        return json_encode(['ok' => 1]);
    }

    public function updateAvatar(Request $request) {
        $user = Auth::user();
        $data = json_decode($request->getContent());

        $user->avatar = $this->processImage($data->image, 'user'.$user->id.'/avatar');
        $user->save();

        // disable old avatar and add new
        \App\UserPhoto::where([['user_id','=', $user->id], ['is_avatar', '=', 1]])->update(['is_avatar' => 0]);
		\App\UserPhoto::create([
			'user_id' => $user->id,
			'source' => $user->avatar,
			'type' => 'featured',
			'is_avatar' => 1
		]);

        return json_encode($user);
    }

    public function storeIdCardInfo(Request $request) {
        $user_id = Auth::id();
        $data = json_decode($request->getContent());

        $result = DB::table('id_card_verification')->insert([
            'user_id' => $user_id,
            'id_card_front_photo' => $this->processImage($data->id_card_front_photo, 'user'.$user_id.'/id-card'),
            'id_card_backside_photo' => $this->processImage($data->id_card_backside_photo, 'user'.$user_id.'/id-card'),
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

    public static function getFeaturePhotos($id) {
        $photos = \App\UserPhoto::where([['type', '=', 'featured'], ['user_id', '=', $id]])->orderBy('id', 'DESC')->take(5)->get();
        $results = [];

        foreach($photos as $photo) {
            array_push($results, $photo->source);
        }

        return ['photos' => $results];
    }

    public function getPhotosByType($type) {
        $photos = \App\UserPhoto::where([['type', '=', $type], ['user_id', '=', Auth::id()]])->orderBy('id', 'DESC')->get();
        $results = [];

        // foreach($photos as $photo) {
        //     array_push($results, $photo->source);
        // }

        return ['photos' => $photos];
    }

    public function uploadFeaturedPhotos(Request $request) {
        $photos = $request->get("photos");
        $user_id  = Auth::id();
        
        $data = [];
        foreach($photos as $photo) {
            array_push($data, [
                'user_id' => $user_id,
                'source' => $this->processImage($photo, 'user'.$user_id.'/photos'),
                'type' => 'featured',
                'is_avatar' => 0,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ]);
        }

        $results = \App\UserPhoto::insert($data);
        return self::getFeaturePhotos($user_id);
    }

    public function getUserConfiguration() {
        $configurations = \App\UserConfiguration::where('user_id', '=', Auth::id())->first();

        return ['configurations' => $configurations];
    } 

    public function updateConfiguration(Request $request) {
        $user_id = Auth::id();
        $data = $request->get('data');
        // $data['user_id'] = $user_id;
        
        \App\UserConfiguration::updateOrCreate(
            ['user_id' => $user_id],
            $data
        );

        return ['ok' => 1];
    } 

    public function updatePassword(Request $request) {
        $user = Auth::user();
        $oldPassword = $request->get('old_password');
        if(Hash::check($oldPassword, $user->password)) {
            if($request->get("new_password") == $request->get('verify_new_password')) {
                $user->password = Hash::make($request->get("new_password"));
                $user->save();

                return ['ok' => 1];
            }
        }

        return ['ok' => 0];
    }

    public function getIdCardVerifyRecord() {
        $record = DB::table('id_card_verification')
            ->where([
                ['user_id', '=', Auth::id()],
                ['is_verified', '<>', 2]
            ])
            ->orderBy('created_at', 'DESC')
            ->first();
        return ['record' => $record];
    }

    public function updateIdCardVerifyRecord(Request $request) {
        $user_id = Auth::id();

        $data = json_decode($request->getContent());

        if(array_key_exists('q', $data)) {
            unset($data['q']);
        }

        foreach($data as $key => $value) {
            if($value) {
                if($key == 'id_card_front_photo' || $key == 'id_card_backside_photo') {
                    $data->$key = $this->processImage($value, 'user'.$user_id.'/id-card');
                }
            } else {
                unset($data->$key);
            }
        }
        
        $result = DB::table('id_card_verification')
            ->where([
                ['user_id', '=', Auth::id()]
            ])
            ->update((array) $data);

        return ['result' => $result]; 
    }

    public function updateUser(Request $request, $id) {
        $user = \App\User::find($id);
        $data = $request->getContent();
        $data_arr = json_decode($data, true);
        
        if(array_key_exists('role', $data_arr['user'])) {
            unset($data_arr['user']['role']);
        }

        // remove old hobyy and insert new hobby
        if(array_key_exists('hobby', $data_arr)) {
            if(!empty($data_arr['hobby'])) {
                DB::table('user_hobby_map')->where('user_id', '=', $id)->delete();
                $result = DB::table('user_hobby_map')->insert( $data_arr['hobby'] );
            }
        }

        if(array_key_exists('vip', $data_arr['user'])) {
            unset($data_arr['user']['vip']);
        }

        // insert user property
        foreach ($data_arr['user'] as $key => $value) {
            $user->$key = $value;
        }

        $user->save();
        return self::getCurrentUserDetail($id);
    }

    public function removeUserPhoto($id) {
        $image = \App\UserPhoto::where([['user_id', '=', Auth::id()], ['id', '=',  $id]])->first();
        if($image) {
            if($image->is_avatar) {
                return ['alert' => "Không thể xóa avatar hiện tại!", 'status' => 0];
            } else {
                $result = $image->delete();
                if($result) {
                    return ['alert' => "Đã xóa ảnh thành công!", 'status' => 1];
                } else {
                    return ['alert' => "Đã có lỗi xảy ra!", 'status' => 0];
                }
            }
        } else {
            return ['alert' => "Không tìm thấy ảnh!", 'status' => 0];
        }
    }

    public function setAvatarFromPhoto($id) {
        $user = Auth::user();
        $currentAvatar = \App\UserPhoto::where([['user_id', '=', $user->id], ['is_avatar', '=', 1]])->first();
        $newAvatar = \App\UserPhoto::where([['user_id', '=', $user->id], ['id', '=',  $id]])->first();
        if($newAvatar) {
            $currentAvatar->is_avatar = 0;

            $newAvatar->type = 'featured';
            $newAvatar->is_avatar = 1;

            $user->avatar = $newAvatar->source;

            $currentAvatar->save();
            $newAvatar->save();
            $user->save();
            return ['alert' => "Thay đổi avatar thành công!", 'status' => 1, 'user' => $user];
        } else {
            return ['alert' => "Không tìm thấy ảnh!", 'status' => 0];
        }
    }

    public function getOtherUserPhotos($user_id) {
        $photos = \App\UserPhoto::where('user_id', '=', $user_id)->orderBy('created_at', 'DESC')->get();
        return ['photos' => $photos];
    }
}

