<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use phpDocumentor\Reflection\Types\Parent_;
use Illuminate\Support\Facades\Lang;

class User extends Controller
{
	public $input;
	public function __construct(){
		$this->input = request();
	}
	public function execute($method = null){
		if(!$method){
			$url = url()->current();
			$function = explode('/',$url);
			$method = last($function);
		}
		return $this->$method(request());
	}
		
	
	public function update(){
		$data = \Request::all();
		$user = \Auth::user();
		
// 		$user = User::whereCompanyName($company_name)->firstOrFail();
		if(!empty($user->eth_address)){
			\Session::flash('alert-warning', 'Your ETH Address is exist already!');
			return redirect('/dashboard/wallet');
		}
		// this 'fills' the user model with all fields of the Input that are fillable
		$user->fill(array('eth_address'=>$data['eth_address']));
// 		debug($data);
// 		debug($user);die;
		if(!preg_match('^0x[a-fA-F0-9]{40}$^',$data['eth_address'])){
			\Session::flash('alert-danger', 'ETH Address is invalid');			
			return redirect('dashboard/wallet');
		}
		if($user->save()){
			\Session::flash('alert-success', 'Your ETH Address has been updated');
// 			die('df');
		}else{
			\Session::flash('alert-danger', 'Update failed');
		}
		
		return redirect(url('dashboard/wallet'));
	}
	
	public function confirm(){
		
		$activation_code = request('code');
		if($activation_code){
			$check = \DB::table('users')->where(['activation_code'=>$activation_code])->update(['activation_code'=>'']);
			if($check){
				\Session::flash('alert-success','Thank you for register Trip');
			}else{
				\Session::flash('alert-success',trans('Invalid activation code'));
			}
		}
		return redirect(url('/notify'));
	}
	
	public function update_password(Request $request){
		
		
		$validator = \Validator::make($request->all(), [
				'original_password' => 'required|string|min:6',
				'password' => 'required|string|min:6|confirmed',		
		]);
		$user = \Auth::user();
		if($validator->passes()){	
			if (\Hash::check($request->original_password, $user->password)) { 
	               $user->fill([
	                'password' => \Hash::make($request->password)
	                ])->save();
	
	               $request->session()->flash('alert-success', trans('Password changed'));
	                return redirect()->back();
	
	            } else {
	                $request->session()->flash('alert-error', trans('Password does not match'));
	                return redirect()->back();
	            }
		}else {
			return Redirect()->back()->withErrors($validator)->withInput();
		}
	}
}
