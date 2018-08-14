<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    public function __construct(){
    	$this->input = request();
    }
    public function execute(Request $request){
    	//khoi tao controller hoac view qua URL
    	if($request->input('controller')){
    		$controller = $this->get_controller($request->input('controller'));
    		$task = $request->input('task','index');
    		return $controller->$task($request);
    	}
    
    	if($request->input('view')){
    		$controller = $this->get_controller($request->input('view'));
    		return $controller->index();
    	}
    
    	return $this->index();
	}
	
    private function get_controller($controller_str){
    	$controller = __NAMESPACE__ . '\\' .$controller_str;
    	$controller = new $controller();
    	return $controller;
    }
    
    public function index(){
    	return view('admin');
    }
}
