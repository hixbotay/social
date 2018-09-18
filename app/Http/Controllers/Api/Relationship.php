<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class Relationship extends Controller
{
    public function index(Request $request){
        return array('code' => 200);
    }
    public function create(Request $request){
        $data = $request->getContent();
        $result = \App\UserRelationship::create($data);
        return $result;
    }

}
