<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class Chat extends Controller
{
    protected $root;

    public function __construct(){
        $this->root = 'http://chat.noiduyen.vn/';
    }

    public function createConversation(Request $request){

        $data = $request->getContent();
        $url = $this->root . 'conversation/create';
//        return $data;
        return $this->POST($url, $data);
    }

    public function listChat(){
        $list = DB::table('users')->select(
            'id','name','email','name'
        )->get();

        $logged_id = Auth::id();

        try{
            $result = $this->GET($this->root.'conversation/load/'.$logged_id);
            $result = json_decode($result);
            if (empty($result)){
                return $list;
            }

            foreach ($list AS $key => $value){

                foreach ($result AS $res){
                    foreach ($res->users_id AS $user){
                        if ($value->id == $user){
                            $list[$key]->conversation_id = $res->conversation_id;
                            $list[$key]->content = $res->content;
                        }
                    }
                }
            }
            return ($list);

        }catch (\Exception $exception){
            return "Die";

        }

//        Get Conversation last message

//        Post user_id, last_message

//        Get coupon chat

    }

    public function hello(Request $request){
        return $this->GET($this->root.'hello');
    }

    private function GET($url){
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        $output = curl_exec($ch);
        curl_close($ch);
        return $output;
    }
    private function POST($url, $data, $headers = array()){

//         Chuwa hoanf thienj

//        $ch = curl_init( $url );
//        curl_setopt( $ch, CURLOPT_POSTFIELDS, json_encode($data) );
//        curl_setopt( $ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
//        curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
//        curl_close($ch);
//
//        return curl_exec($ch);


        $options = [
            CURLOPT_URL        => $url,
            CURLOPT_POST       => true,
            CURLOPT_POSTFIELDS => $data,
            CURLOPT_TIMEOUT    => 5,
            CURLOPT_HTTPHEADER => array('Content-Type: application/json')

        ];
        $curl = curl_init();
        curl_setopt_array($curl, $options);
        $results = curl_exec($curl);
        curl_close($curl);
        return $results;

    }
}
