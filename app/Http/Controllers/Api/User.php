<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

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

}
