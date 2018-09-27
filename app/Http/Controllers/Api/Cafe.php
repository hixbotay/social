<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class Cafe extends Controller
{

    private $required = array(
        "user_id" => "User",
        "name" => "Tên quán",
        'address' => "Địa chỉ",
        'province_id' => "Tỉnh/Thành phô",
        "district_id" => "Quận/Huyện"
    );


    public function create(Request $request) {
        $data = $request->all();
        $required = array();
        foreach ($this->required AS $key => $value){
//            if (!$data[$key]){
//                $required[] = $key;
//            }
        }
        if (empty($required)){
            $result = \App\Agency::create($data);
            if ($result){
                return ['status' => 'ok'];
            }else{
                return ['status' => 'ko', "message" => "Error"];
            }
        }else{
            return ['status' => 'ko', "message" => $required];
        }

    }
}
