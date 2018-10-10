<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class Job extends Controller
{
    public function list() {
        $jobs = \App\Job::all();
        return json_encode($jobs);
    }
}