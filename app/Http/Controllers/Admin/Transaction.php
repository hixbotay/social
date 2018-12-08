<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\User;
use App\Payments;


class Transaction extends Controller
{
    public function index(){
        $users = User::all();
        $items = Payments::paginate(20);
        return view('admin.transaction.list', [
            'users' => $users,
            'items' => $items
        ]);
    }
}
