<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

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
        $data = json_decode($request->getContent());
        $newCafe = [
            'user_id' => Auth::id()
        ];

        foreach($data as $key => $value) {
            $newCafe[$key] = $value;
        }

        $result = \App\Agency::create($newCafe);
        return json_encode($result);
    }

    public function list(Request $request, $page = null) {
        $data = \App\Agency::paginate();
        return json_encode($data);
    }

    public function get($id) {
        $agency = \App\Agency::find($id);
        return json_encode($agency);
    }
}
