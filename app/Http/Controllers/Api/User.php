<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class User extends Controller
{
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

    /*
     * Function to like/love/follow ... profile
     */
    public function create(Request $request){
        $data = $request->getContent();
        $result = \App\UserRelationship::create($data);
        return $result;
    }

}
