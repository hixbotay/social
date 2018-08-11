<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use League\Flysystem\Exception;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;

class User extends Controller
{
	
	public function __construct(){
		$this->input = request();
	}

	public function index(){
		return view('admin.user');
	}
}
