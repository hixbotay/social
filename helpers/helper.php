<?php

use Illuminate\Support\Facades\DB;
use App\UserGroup;


function url_root(){
	return env('APP_URL');
}

class BookproHelper{


    public static $finance_type = array(
        '1' => 'nang_cap',
        '2' => 'hen_nhom',
        '3' => 'hen_doi',
        '4' => 'tang_qua',
        '5' => 'quang_cao',
    );

    public static function get_finance_type_name($type){
        $data = self::$finance_type;
        foreach ($data AS $key => $value){
            if ($key == $type){
                return $value;
            }
        }
        return false;
    }

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


	public static function get_group_name_by_id($id){
        try{
            $result = UserGroup::find($id);
            return $result->name;
        }catch (Exception $exception){

        }

    }

    function generate_url($string) {
        $search = array (
            '#(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)#',
            '#(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)#',
            '#(ì|í|ị|ỉ|ĩ)#',
            '#(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)#',
            '#(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)#',
            '#(ỳ|ý|ỵ|ỷ|ỹ)#',
            '#(đ)#',
            '#(À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ)#',
            '#(È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ)#',
            '#(Ì|Í|Ị|Ỉ|Ĩ)#',
            '#(Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ)#',
            '#(Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ)#',
            '#(Ỳ|Ý|Ỵ|Ỷ|Ỹ)#',
            '#(Đ)#',
            "/[^a-zA-Z0-9\-\_]/",
        ) ;
        $replace = array (
            'a',
            'e',
            'i',
            'o',
            'u',
            'y',
            'd',
            'A',
            'E',
            'I',
            'O',
            'U',
            'Y',
            'D',
            '-',
        ) ;
        $string = preg_replace($search, $replace, $string);
        $string = preg_replace('/(-)+/', '-', $string);
        $string = strtolower($string);
        return $string;
    }


    public static function scanView(){
        $full_path = base_path().'\\resources\\views\\admin\\';

        if(!is_dir($full_path))
            return 'Views directory not found';

        $files = scandir($full_path);
        unset($files[0]);
        unset($files[1]);

        if(($key = array_search('emails', $files)) !== false) {
            unset($files[$key]);
        }

        foreach($files AS $file){
            $link = str_replace('.blade.php','',$file);
            echo '<a href="'.$link.'">'.$link.'</a>'.'<br>';
        }
    }


}
