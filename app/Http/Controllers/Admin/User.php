<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use App\User as UserModel;
use Session;    
use URL;

class User extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = DB::table('users')->paginate(2);
        $users->withPath('admin?view=User');

        return view('admin.user.list', ['items' => $users]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
    	return view('admin.user.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $new_user = $request->get('data');
        UserModel::create($new_user);

        return redirect('/admin?view=user');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
    	$user = UserModel::find($id);

        // show the view and pass the nerd to it
        return view('admin.user.detail', ['item' => $user]);
    }
    
    

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        console_log($id);
    	$user = UserModel::find($id);

        // show the view and pass the nerd to it
        return view('admin.user.detail', ['item' => $user]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $id =  $request->input('id');
        $user = UserModel::find($id);
        $data = $request->get('data');

        foreach ($data as $key => $value) {
            $user->$key = $value;
        }

        $user->save();
        return redirect('admin?view=User');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $id =  $request->input('id');
        // UserModel::destroy($id);
        Session::put('pre_url', URL::previous());
        console_log(Session::get('pre_url'));
        // return redirect(Session::get('pre_url'));
    }
}
