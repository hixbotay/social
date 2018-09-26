<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class Cafe extends Controller
{
    public function create(Request $request) {
        $data = $request->all();
        return $data;
    }
}
