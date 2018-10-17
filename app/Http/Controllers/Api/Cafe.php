<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
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

    public function list(Request $request) {
        // $query = $request->all();
        // unset($query['page']);

        // $data = \App\Agency::where($query)->paginate(10);
        $data = \App\Agency::paginate(10);
        $temp = $data->items();

        foreach($temp as $key => $agency) {
            $agency->avatar = '';
            $agency->cover = '';

            $images = DB::table('agency_photos')
                ->where('agency_id', '=', $agency->id)
                ->whereIn('type', ['cover', 'avatar'])
                ->orderBy('id', 'DESC')
                ->get();

            foreach($images as $image) {
                switch($image->type) {
                    case 'cover': {
                        $agency->cover = $image->source;
                        break;
                    }
                    case 'avatar': {
                        $agency->avatar = $image->source;
                        break;
                    }
                    default: {
                        break;
                    }
                }
            }
        }
        return(json_encode($temp));
    }

    public function get($id) {
        $agency = \App\Agency::leftjoin('devvn_tinhthanhpho', 'matp', '=', 'province_id')
            ->leftjoin('devvn_quanhuyen', 'maqh', '=', 'district_id')
            ->select(DB::raw('
                agency.*,
                devvn_tinhthanhpho.name as province_name,
                devvn_quanhuyen.name as district_name
            '))
            ->where('id', '=', $id)
            ->first();

        $agency['avatar'] = '';
        $agency['cover'] = '';

        $images = DB::table('agency_photos')
            ->where('agency_id', '=', $id)
            ->orderBy('id', 'DESC')->get();

        $temp = [];
        foreach($images as $image) {
            array_push($temp, $image->source);
            switch($image->type) {
                case 'cover': {
                    $agency['cover'] = $image->source;
                    break;
                }
                case 'avatar': {
                    $agency['avatar'] = $image->source;
                    break;
                }
                default: {
                    break;
                }
            }
        }
        $agency['images'] = $temp;
 
        return json_encode($agency);
    }

    public function handleImage(Request $request, $id) {
        $user_id = Auth::id();
        $data = json_decode($request->getContent());
        $type = $data->type;

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
        
        Storage::disk('local')->put('user'.$user_id.'/cafe/'.$filename, base64_decode($base64_image));

        // update type of old image to normal type
        if($type != 'normal') {
            DB::table('agency_photos')->where([['type', '=', $type], ['agency_id', '=', $id]])->update(['type' => 'normal']);
        }

        $result = DB::table('agency_photos')->insert(
            [
                'agency_id' => $id,
                'source' => 'storage/app/user'.$user_id.'/cafe/'.$filename,
                'type' => $type
            ]
        );

        // $cafe = \App\Agency::find($id);
        $cafe = json_decode($this->get($id));
        $cafe->$type = 'storage/app/user'.$user_id.'/cafe/'.$filename;
        return json_encode($cafe);
    }
}
