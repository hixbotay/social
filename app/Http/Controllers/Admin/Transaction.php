<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\User;
use App\Payments;
use Illuminate\Support\Facades\DB;


class Transaction extends Controller
{
    public function index(){
        $users = User::all();
        $items = Payments::paginate(20);

        $items = DB::table('user_payments')
            ->join('users', 'user_payments.user_id', '=', 'users.id')
            ->select('user_payments.*', 'users.name')->orderBy('id', 'DESC')
            ->paginate(20);

        return view('admin.transaction.list', [
            'users' => $users,
            'items' => $items
        ]);
    }

    public function edit($id) {
//        $item = Payments::find($id);
        $item = DB::table('user_payments')
            ->join('users', 'user_payments.user_id', '=', 'users.id')
            ->select('user_payments.*', 'users.name AS user_name')
            ->where('user_payments.id', '=', $id)->first();
        return view('admin.transaction.detail', ['item' => $item]);
    }
}
