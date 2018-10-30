<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use phpDocumentor\Reflection\Types\Parent_;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Validator;
use App\User as UserModel;

class User extends Controller
{
	public $input;
	public function __construct(){
		$this->input = request();
	}

	public function getRegistrationStep(Request $request) {
		$step = $request->input('step');

		if($step == 5 || $step == 6) {
			$jobs = \App\Job::all();
			$provinces = DB::table('devvn_tinhthanhpho')->get();

			return view('registration-step.step_'.$step, [
				'jobs' => $jobs, 
				'provinces' => $provinces,
			]);
		} else {
			return view('registration-step.step_'.$step);
		}
	}

	public function execute($method = null){
		if(!$method){
			$url = url()->current();
			$function = explode('/',$url);
			$method = last($function);
		}
		return $this->$method(request());
	}
	
	public function update(Request $request)
    {
        $id =  Auth::id();
        $user = UserModel::find($id);
		$data = $request->get('data');

		$validator = Validator::make($data, [
			'mobile' => 'unique:users',
			'password' => 'min:6'
		]);

		if ($validator->fails()) {
            return redirect('/registration?step=2')
                        ->withErrors($validator)
                        ->withInput();
        }

        foreach ($data as $key => $value) {
			if($key == 'password') {
				$user->$key =  Hash::make($value);
			} else {
				$user->$key = $value;
			}
        }

		$user->save();

		$next_step = $request->get('step') + 1;
		if($next_step == 7) {
			return redirect('/');
		} else {
			return redirect('/registration?step='.$next_step);
		}
	}
	
	public function uploadAvatar(Request $request) {
		$id = Auth::id();
		$user = UserModel::find($id);

        $request->validate([
            'avatar' => 'sometimes|mimes:jpeg,bmp,png|max:20000',
        ]);

        if($request->hasFile('avatar')) {
            $filename = (string) time().'.'.$request->avatar->getClientOriginalExtension();
            $request->avatar->storeAs('user'.$id.'/avatar', $filename);
		}
		$user->avatar = 'storage/app/user'.$id.'/avatar/'.$filename;

        $user->save();
		
		$next_step = $request->get('step') + 1;
		if($next_step == 7) {
			return redirect('/');
		} else {
			return redirect('/registration?step='.$next_step);
		}
	}
	
	public function updateIdealPerson(Request $request) {
		$id = Auth::id();
		$user = UserModel::find($id);

		$data = json_encode($request->get('data'));
		$user->ideal_person = $data;
		$user->save();
		
		$next_step = $request->get('step') + 1;

		if($next_step == 7 || $user->provider == null) {
			return redirect('/');
		} else {
			return redirect('/registration?step='.$next_step);
		}
	}

// 	public function update(){
// 		$data = \Request::all();
// 		$user = \Auth::user();
		
// // 		$user = User::whereCompanyName($company_name)->firstOrFail();
// 		if(!empty($user->eth_address)){
// 			\Session::flash('alert-warning', 'Your ETH Address is exist already!');
// 			return redirect('/dashboard/wallet');
// 		}
// 		// this 'fills' the user model with all fields of the Input that are fillable
// 		$user->fill(array('eth_address'=>$data['eth_address']));
// // 		debug($data);
// // 		debug($user);die;
// 		if(!preg_match('^0x[a-fA-F0-9]{40}$^',$data['eth_address'])){
// 			\Session::flash('alert-danger', 'ETH Address is invalid');			
// 			return redirect('dashboard/wallet');
// 		}
// 		if($user->save()){
// 			\Session::flash('alert-success', 'Your ETH Address has been updated');
// // 			die('df');
// 		}else{
// 			\Session::flash('alert-danger', 'Update failed');
// 		}
		
// 		return redirect(url('dashboard/wallet'));
// 	}
	
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
