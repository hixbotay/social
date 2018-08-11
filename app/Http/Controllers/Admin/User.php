<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class User extends Controller
{
    //
	public function index(){
		return view('admin.user');
	}
	
	public function test(){
		debug('test');
		return view('admin'); 
	}
}
