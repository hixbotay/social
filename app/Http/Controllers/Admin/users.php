<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class Users extends Controller
{
	
	public function __construct(){
		$this->input = request();
	}

	public function index(){
		die;
		return view('admin.user');
	}
}
