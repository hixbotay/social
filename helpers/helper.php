<?php

use Illuminate\Support\Facades\DB;


function url_root(){
	return env('APP_URL');
}

class BookproHelper{

	static function mask_email($email, $minLength = 3, $mask = "*") {
		$em   = explode("@",$email,2);
	    $name = implode(array_slice($em, 0, count($em)-1), '@');
	    $len  = strlen($name) - $minLength;
	
	    return substr($name,0, $minLength) . str_repeat($mask, $len) . "@" . end($em);   
	}
	
	
	static function get_livecoin_exchange($price = 1,$currency=null){
		$filename = JPATH_ROOT.'/exchange_rate.dat';
		if(file_exists($filename)){
			$data = file_get_contents($filename);
			$data = json_decode($data);
			if($data->created > (time() - 300)){
				return $data;
			}
		}
		$url = "https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=ETH,BTC";			
		$exchange_rate = self::get_data_from_url($url);
		$exchange_rate = json_decode($exchange_rate);
		$exchange_rate->created = time();
		file_put_contents($filename, json_encode($exchange_rate));
		return $exchange_rate;
	}
	
	public static function get_data_from_url($url){
		$ch = curl_init($url);
		curl_setopt($ch, CURLOPT_POST, 'GET');
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		// 		curl_setopt($ch, CURLOPT_POSTFIELDS, $postFields);
		// 		curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
			
		$response = curl_exec($ch);
		// 		debug($response);
		$statusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
			
		if ($statusCode!=200) {
			return false;
		}
		return $response;
	}
	
	
	public static function get_qacode($data){
		if(!isset($data['width']) || !$data['width']){
			$data['width'] = '150px';
		}
		if(!isset($data['height']) || !$data['height']){
			$data['height'] = $data['width'];
		}
		return "<img src='https://chart.googleapis.com/chart?cht=qr&chs=".preg_replace("/[^0-9]/", "", $data['width'])."x".preg_replace("/[^0-9]/", "", $data['height'])."&chl=".urlencode($data['data'])."'  style='{$data['width']}'/>";
	}
	
	public static function get_qacode_link($data){
		if(!isset($data['width']) || !$data['width']){
			$data['width'] = '150px';
		}
		if(!isset($data['height']) || !$data['height']){
			$data['height'] = $data['width'];
		}
	
		return "https://chart.googleapis.com/chart?cht=qr&chs=".preg_replace("/[^0-9]/", "", $data['width'])."x".preg_replace("/[^0-9]/", "", $data['height'])."&chl=".urlencode($data['data']);
	}

	public static function select_user_groups($name, $class = null, $id = null, $selected = null){

        $userGroup = DB::table('user_groups')->get();

        echo "<select class='$class form-control'>";
        foreach ($userGroup AS $value){
            echo "<option value='$value->id'>";
            echo $value->name;
            echo "</option>";
        }
        echo "</select>";

    }
	
	
}
