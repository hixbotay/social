<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use League\Flysystem\Exception;
use Illuminate\Foundation\Auth\User;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Admin;

class Admin extends Controller
{
	
	public function __construct(){
		$this->input = request();
	}
	public function execute(Request $request){		
		//get input parameter
		$method = 'index';
		if($request->input('controller')){
			$controller = $request->input('controller');
			require 'Admin/'.$controller.'.php';
			$controller = new $controller();
			$task = $request->input('task','index');
			return $controller->$task($request);
		}
		
		if($request->input('view')){
			$controller = $request->input('view');
			require 'Admin/'.$controller.'.php';
			$controller = new Users();
			return $controller->index();
		}
		
		return $this->index();
	}
	
	public function index(){
		return view('admin');
	}
}
