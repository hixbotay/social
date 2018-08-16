<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\UserGroup AS UserGroupModel;
use Validator;


class UserGroup extends Controller
{
    public function index()
    {
        return view('admin.usergroup.list', ['items' => UserGroupModel::all()]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */

    private $rule = [
        'name'=>'required|max:30',
    ];

    public function create()
    {
        //
        return view('admin.usergroup.edit');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $name = request()->input('name');

        $model = new UserGroupModel();
        $model->name = $name;
        $model->save();

        return redirect(route('admin').'?view=usergroup')->with('success','Data updated successfully!');


    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        $user = UserGroupModel::find($id);

        // show the view and pass the nerd to it
        return View::make('admin.usergroup.show')
            ->with('item', $user);
    }



    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit()
    {
        //
        $id = request()->input('id');

        $user = UserGroupModel::find($id);

        // show the view and pass the nerd to it
        return \View::make('admin.usergroup.edit')
            ->with('item', $user);
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
        $id = $request->get('id');
        $name = $request->get('name');
        $this->validate($request, $this->rule);
        $item = UserGroupModel::find($id);
        $item->name = $name;
        $item->save();

        return redirect(route('admin') . '?view=usergroup')->with('success','Data updated successfully!');

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
