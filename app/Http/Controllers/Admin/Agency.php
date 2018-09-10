<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;


class Agency extends Controller
{
    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
    {
        $items = \App\Agency::all();
        return view('admin.agency.list', ['items' => $items]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $users = User::get_list_user_by_key(12);
        return view('admin.agency.create', ['users' => $users]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->get('data');

        \App\Agency::create($data);

        return redirect('/admin?view=Agency');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $item = \App\DatingPrice::find($id);
        return view('admin.datingprice.detail', ['item' => $item]);
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
        $item = \App\DatingPrice::find($id);

        $data = $request->get('data');

        if ($item->id){

            foreach ($data as $key => $value) {
                $item->$key = $value;
            }
            $item->save();

        }

        return redirect('admin?view=DatingPrice');
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
        PostModel::destroy($id);
        // redirect to previous url after destroy
        Session::put('pre_url', URL::previous());
        console_log(Session::get('pre_url'));
        return redirect(Session::get('pre_url'));
    }
}
