<?php

namespace App\Http\Controllers\Admin\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\UserGroup;
use Auth;

class LoginController extends Controller
{
    public function index()
    {
    	return view('admin.admin_login');
    }

    public function login(Request $request) {

//        if(Auth::attempt(['email' => $request['email'], 'password' => $request['password'],'is_admin' => 1])) {


        if(Auth::attempt(['email' => $request['email'], 'password' => $request['password']])) {
            $user = \Auth::user();

            if ($user->is_admin == 1){
                return redirect('/admin');
            }else{
                $role = $user->role;
                if (in_array(config('auth.action.ACCESS_ADMIN'), $role)){
                    return redirect('/admin/agency');
                }
            }
        }else{
            return redirect('/admin/login')->withErrors('Email hoặc mật khẩu không hợp lệ');
        }
    }

    public function logout(Request $request){
        return redirect('/admin/login')->with(Auth::logout());
    }

}
