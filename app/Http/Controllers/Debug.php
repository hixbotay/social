<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use League\Flysystem\Exception;
use Illuminate\Foundation\Auth\User;
use Illuminate\Support\Facades\Hash;

class Debug extends Controller
{
	public $online_page;
	public $init_test;
	public $input;
	
	public function __construct(){
		$this->input = request();
	}
	public function test(){
		
		return view('emails.register-confirm',\Auth::user()->toArray());
	}
	public function execute($method = null){
		
		if(file_exists(JPATH_ROOT.'/logs/init_test.ini')){
			$this->init_test = parse_ini_file(JPATH_ROOT.'/logs/init_test.ini',true);
				
		}else{
			$this->init_test = array();
		}
		$this->online_page = isset($this->init_test['online_page']) ? $this->init_test['online_page'] : array();
// 		$this->checkPermission();
		
		if(!$method){
			$url = url()->current();
			$function = explode('/',$url);
			$method = last($function);
		}
		
// 		debug($function);die;
// 		dump($function);die;
		
// 		echo $function;die;
		return $this->$method();
	}
	
	private function checkPermission(){
		$user = \Auth::user();
		if($user->group != 'admin' && substr(url(''), 0,16) != 'http://localhost'){
			$username = request('username');
			$password = request('password');
			if(\Auth::attempt(array('email'=>$username,'password'=>$password))){
				$user = \Auth::user();
				if($user->group =='admin'){
					return true;
				}
			}
			die('invalid request');
		}
		return;
	}
	
	public function pingUrl($url=NULL,$timeout = 0)
	{
		if($url == NULL) return false;
		$ch = curl_init($url);
		curl_setopt($ch, CURLOPT_TIMEOUT,$timeout);
		//curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 1);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
		$data = curl_exec($ch);
		//	    $httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
		curl_close($ch);
		return $data;
	}
    public function show(){
    	$html = '';
    	echo $html;
    	return;
    }
    
    public function create_user(){
    	$user = new User();
    	$user->username = 'admin';
    	$user->password = \Illuminate\Support\Facades\Hash::make('admin');
    	$user->email = 'admin@something.com';
    	$user->save();
    }
    
    public function script(){
    	
    }
    
    public function sql(){
//     	dump($_POST);die;
    	if(isset($_GET['sqlcode'])){
    		$sql_str = base64_decode($_GET['sqlcode']);
    	}else{
    		$sql_str = request('sql');
    	}
    	$sqls = explode(';'.PHP_EOL,$sql_str);
    	foreach($sqls as $i=>$sql){
    		$sqls[$i] = trim($sql);
    		if(empty($sqls[$i])){
    			unset($sqls[$i]);
    		}
    	}
    	
    	$remote = request('remote');
    	$w_log = 1;request('log');
    	$result = array();
    	
    	$plain_sql = isset($_POST['sql'])?$_POST['sql']:'';
    	
    	try{
	    	foreach($sqls as $plain_sql){
	    		$sql = str_replace('#__',\DB::getTablePrefix(),$plain_sql);
	    			
	    		$check = \DB::unprepared($sql);
		    	if (!is_dir('/logs/')) {
				    mkdir('/logs/');         
				}
	    		write_log('jb_sql.txt', $sql);
	    		dump($check);
	    		dump($plain_sql);
	    		
	    		$result[] = array('status' => $check,'sql' => $plain_sql);
	    		if($check  && $w_log){
	    			$this->write_log('jb_sql.txt', PHP_EOL.$sql);
	    		}
	    		if ((strpos($sql,'select')) !== false){
	    			dump(\DB::select($sql)) ;
	    		}
	    	
	    		if($remote){
	    			foreach ($this->online_page as $online_page){
	    				$url = $online_page['url'].'debug/sql/?die=1&remote=0&sqlcode='.base64_encode($sql).'&log='.$w_log.'&username='.$online_page['username'].'&password='.$online_page['password'];
	    	
	    				$remote_result = $this->pingUrl($url,0);
	    				dump('Remote '.$online_page['url'].': '.$remote_result);
	    				$manual=$online_page['url'].'debug/sql/?sqlcode='.base64_encode($sql).'&log='.$w_log.'&username='.$online_page['username'].'&password='.$online_page['password'];
	    				dump("<a href='{$manual}'>{$manual}</a>");
	    			}
	    				
	    		}
	    	}
    	}catch (\Exception $e){
    		dump($e);
    	}
    	
    	$html = '<form method="post" action="'.url('debug/sql').'" name="debug">
		SQL query: <br>
		<textarea name="sql" style="width:100%" rows="15">'.$plain_sql.'</textarea><br>
		<input type="checkbox" name="log" value="1"/>Save log<br>
		<input type="checkbox" name="remote" value="1"/>Send request to Remote Host<br>
		'.csrf_field().'
		<input type="submit"/>
		
		</form>';
    	
    	
		return $html;
    }
    
    function setup(){
    	$file = JPATH_ROOT.'/logs/init_test.ini';
    	$data = isset($_POST['data']) ? $_POST['data'] : '';
    	if(!empty($data)){
    		$fh = fopen($file, 'w');
    		if(fwrite($fh, $data)){
    			dump('SUCCESS');
    		}else{
    			dump('FAILED');
    		}
    		fclose($fh);
    	}
    	if(file_exists($file)){
    		$data = file_get_contents($file);
    	}else{
    		$data = "update_team=1".PHP_EOL.
			"localhost='localhost/myproject'".PHP_EOL.
    		"[online_page]".PHP_EOL.
			"0[url]='http://flight.joombooking.com/'".PHP_EOL.
			"0[username]='admin'".PHP_EOL.
			"0[password]='123@123a'";
    		
    	}
    	
    		
		    	
    	$html = '<form method="post" action="'.url('debug/setup').'" name="debug">
    		<textarea rows="15" style="width:100%" name="data">'.$data.'</textarea>
    		<button type="submit">Submit</button>
    		'.csrf_field().'
    	</form>/';
    	
    	return $html; 
    }
    
    private function write_log($file,$log){
    	return write_log($file,$log);
    }
    
    public function store(){
    	die('store');
    }
}
