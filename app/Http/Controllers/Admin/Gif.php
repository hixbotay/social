<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class Gif extends Controller
{
    public function index(){
        $items = \App\Education::all();
        return view('admin.gif.list', ['items' => $items]);
    }
}
