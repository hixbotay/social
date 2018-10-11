<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

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

    public function handleImage(Request $request, $id) {
        $user_id = 1;
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
        
        $result = Storage::disk('local')->put('user'.$user_id.'/cafe/'.$filename, base64_decode($base64_image));

        $cafe = \App\Agency::find($id);
        $cafe['image'] = env('APP_URL').'/storage/app/user'.$user_id.'/cafe/'.$filename;
        $cafe->save();
        return json_encode($cafe);
    }
}
