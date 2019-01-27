<?php

require 'convertlunaryear.php';
Class BoiToan{
	static function get_year($date){
		$date = new DateTime($date);
		
		$date_converted = SunClass::convertSolar2Lunar($date->format('d'), $date->format('m'), $date->format('Y'));
		
		return date('Y',$date_converted);
	}
	
	static function get_cung($birthday,$gender,$text = false){
		$year = self::get_year($birthday);
		$phan_du = array_sum(str_split($year)) % 9;
		$cung_nam = array('1'=>'kham','2'=>'ly','3'=>'can', '4'=>'doai','5'=>'can_f',
		'6'=>'khon','7'=>'ton','8'=>'chan','9'=>'khon');
		$cung_nu = array('1'=>'can','2'=>'can_f','3'=>'doai', '4'=>'can','5'=>'ly',
		'6'=>'kham','7'=>'khon','8'=>'chan','9'=>'ton');
		if($gender=='F'){
			$cung = $cung_nam[$phan_du];
		}else{
			$cung = $cung_nu[$phan_du];
		}
		if($text){
			return self::get_text('cung',$cung);
		}
		return $cung;
	}
	
	static function get_can($birthday, $text=false){
		$year = self::get_year($birthday);
		$last = $year[3];
		$data = ['canh','tan','nham','quy','giap','at','binh','dinh','mau','ky'];
		if($text){
			return self::get_text('can',$data[$last]);
		}
		return $data[$last];
	}
	
	static function get_chi($birthday,$text=false){
		$year = self::get_year($birthday);
		$last = (int)($year[2].$year[3])%12;
		$data = ['ti','suu','dan','mao','thin','ty','ngo','mui','than','dau','tuat','hoi'];
		if($text){
			return self::get_text('chi',$data[$last]);
		}
		return $data[$last];
	}
	
	static function get_can_chi($birthday,$text=false){
		return self::get_can($birthday,$text).' '.self::get_chi($birthday,$text);
	}
	
	static function get_thien_can($birthday){
		$can = self::get_can($birthday);
		$data_thien_can = ['giap'=>1,'at'=>'1','binh'=>2,'dinh'=>2,'mau'=>3,'ky'=>3,'can'=>4,'tan'=>4,'nham'=>5,'quy'=>5];
		return $data_thien_can[$can];
	}
	
	static function get_dia_chi($birthday){
		$chi = self::get_chi($birthday);
		$data_dia_chi = ['ty'=>0,'suu'=>0,'ngo'=>0,'mui'=>0,'dan'=>1,'mao'=>1,'than'=>1,'dau'=>1,'thin'=>2,'ty'=>2,'tuat'=>2,'hoi'=>2];
		return $data_dia_chi[$chi];
	}
	
	static function get_ngu_hanh($birthday, $text = false){
		$number = self::get_thien_can($birthday) + self::get_dia_chi($birthday);
		$data = [1=>'kim','2'=>'thuy','3'=>'hoa','4'=>'tho','5'=>'moc'];
		$number = $number > 5 ? ($number-5) : $number;
		if($text){
			return self::get_text('ngu_hanh',$data[$number]);
		}
		return $data[$number];
	}

	static function get_menh($birthday){
		$key = self::get_can($birthday).'-'.self::get_chi($birthday);
		return self::get_text('menh',$key);
	}
	
	static function get_text($type,$value){
		return self::get_data()[$type][$value];
	}

	static function get_data($key = null){
		static $data_boi_toan;
		if(!$data_boi_toan){
			$data_boi_toan = json_decode(file_get_contents('data_boi_toan.json'),true);
		}
		if($key){
			return $data_boi_toan[$key];
		}
		return $data_boi_toan;
	}

	static function get_hoang_dao($birthday,$text = false){
		$data_hoang_dao = self::get_data('cung_hoang_dao');
		$date = date('m-d',$birthday);
		foreach($data_hoang_dao as $cung){
			if($date >= $cung->from && $date <= $cung->to){
				return $cung;
			}
		}
		return end($cung);
	}
}