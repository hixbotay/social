<?php
	
Class BoiToan{
	static function get_year($date){
		return (new DateTime($date))->format('Y');
	}
	
	static function get_cung($birthday,$gender){
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
		return $cung;
	}
	
	static function get_can($birthday){
		$year = self::get_year($birthday);
		$last = $year[3];
		$data = ['canh','tan','nham','quy','giap','at','binh','dinh','mau','ky'];
		return $data[$last];
	}
	
	static function get_chi($birthday){
		$year = self::get_year($birthday);
		$last = ($year[2]+$year[3])%12;
		$data = ['ti','suu','dan','mao','thin','ty','ngo','mui','than','dau','tuay','hoi'];
		return $data[$last];
	}
	
	static function get_can_chi($birthday){
		return self::get_can($birthday).' '.self::get_chi($birthday);
	}
	
	static function get_thien_can($birthday){
		$can = self::get_can($birthday);
		$data_thien_can = ['giap'=>1,'at'=>'1','binh'=>2,'dinh'=>2,'mau'=>3,'ky'=>3,'can'=>4,'tan'=>4,'nham'=>5,'quy'=>5];
		return $data_thien_can[$can];
	}
	
	static function get_dia_chi($birthday){
		$can = self::get_can($birthday);
		$data_thien_can = ['ty'=>1,'suu'=>'1','ngo'=>1,'mui'=>1,'dan'=>1,'mao'=>1,'than'=>1,'dau'=>1,'thin'=>2,'ty'=>2,'tuat'=>2,'hoi'=>2];
		return $data_thien_can[$can];
	}
	
	static function get_ngu_hanh($birthday){
		$number = self::get_thien_can($birthday) + self::get_dia_chi($birthday);
		$data = [1=>'kim','2'=>'thuy','3'=>'hoa','4'=>'tho','5'=>'moc'];
		
		$number = $number >5 ? $number-5 : $number;
		return $data[$number];
	}
	
	static function get_text($type,$value){
		static $data_ngu_hanh;
		if(!$data_ngu_hanh){
			$data_ngu_hanh = json_decode(file_get_contents('data_ngu_hanh.json'));
		}
		return $data_ngu_hanh[$type][$value];
	}
}