<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

use App\User;
use View;
use App\Payments;
use Illuminate\Support\Facades\Auth;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    public function __construct(){
        $this->input = request();
	}

    public function execute(Request $request){

        $user = Auth::user();

        View::share ( 'currentUser', $user );

    	//khoi tao controller hoac view qua URL
    	if($request->input('controller')){
    		$controller = $this->get_controller($request->input('controller'));
    		$task = $request->input('task','index');
            $id = $request->input('id');
            return $controller->$task($request);
    	}
    
    	if($request->input('view')){
    		$controller = $this->get_controller($request->input('view'));
    		$id = $request->input('id');
    		$layout = $request->input('layout','index');

    		if($id){
    			return $controller->$layout($id);
    		}else{
    			return $controller->$layout();
    		}
    		
    	}
    
    	return $this->index();
	}
	
    private function get_controller($controller_str){
    	$controller = __NAMESPACE__ . '\\' .$controller_str;
    	$controller = new $controller();
    	return $controller;
    }
    
    public function index(){
        $user = Auth::user();

        switch ($user->group->key){
            case config('auth.usergroup.administrator'):
                $data = array(
                    'total_users' => User::getTotalUsers(),
                    'total_vip' => User::getTotalVip(),
                    'total_charge' => Payments::getTotalChargeAmount(),
                    'total_withdraw' => Payments::getTotalWithdrawAmount()
                );
                return view('admin', [
                    'data' => (object)$data,
                ]);
            case config('auth.usergroup.agency'):
                $data = array(
                    'total_users' => User::getTotalUsers(),
                    'total_vip' => User::getTotalVip(),
                    'total_charge' => Payments::getTotalChargeAmount(),
                    'total_withdraw' => Payments::getTotalWithdrawAmount()
                );
                return view('admin', [
                    'data' => (object)$data,
                ]);
            case config('auth.usergroup.agency_employee'):
                return view('admin');
        }

    }
}
