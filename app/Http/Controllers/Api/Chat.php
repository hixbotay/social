<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class Chat extends Controller
{
    protected $root;

    public function __construct(){
        $this->root = 'http://localhost:8000/';
    }

    public function createConversation(Request $request){

        $data = $request->getContent();
        $url = $this->root . 'conversation/create';
//        return $data;
        return $this->POST($url, $data);
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

        $ch = curl_init( $url );
        curl_setopt( $ch, CURLOPT_POSTFIELDS, json_encode(array('vantu'=>1993)) );
        curl_setopt( $ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
        curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
        return $result = curl_exec($ch);
        curl_close($ch);

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

    }
}
