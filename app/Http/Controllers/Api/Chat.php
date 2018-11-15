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
        $this->root = 'https://chat.noiduyen.vn/';
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

//            $result = file_get_contents($this->root.'conversation/load/'.$logged_id);

            $stream_opts = [
                "ssl" => [
                    "verify_peer"=>false,
                    "verify_peer_name"=>false,
                ]
            ];

            $result = file_get_contents($this->root.'conversation/load/'.$logged_id,
                false, stream_context_create($stream_opts));

//            return $response;

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
            return $exception->getMessage();
            return "Die";

        }

    }


    public static function requestAPI($url,$header="",$body="",$method=""){
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL,$url);
        curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);
        if(isset($method) && $method != ""){
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST,$method);
        }
        if (isset($header) && !empty($header)){
            curl_setopt($ch,CURLOPT_HTTPHEADER,$header);
        }

        if(isset($body) && !empty($body)){
            curl_setopt($ch, CURLOPT_POSTFIELDS,http_build_query($body));
        }
        $results = curl_exec($ch);
        curl_close($ch);

        return json_encode($results);
    }

    public function hello(Request $request){
        return $this->GET($this->root.'hello');
    }

    private function GET($url){
        try{
            $ch = curl_init();
            return json_encode($ch);
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            $output = curl_exec($ch);
            curl_close($ch);
            return json_encode($output);
        }catch (\Exception $e){
            return json_encode($e);
        }

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
