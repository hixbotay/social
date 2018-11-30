<?php

namespace App\Http\Controllers\ADmin;

use Faker\Factory;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Job AS JobModel;

class Job extends Controller
{
    public function __construct(){

    }
    public function index()
    {
        $items = JobModel::all();
        return view('admin.job.list', ['items' => $items]);
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
        return view('admin.job.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = request()->get('data');
        console_log($data);

        JobModel::create($data);
        return redirect('admin?view=job');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = UserGroupModel::find($id);

        // show the view and pass the nerd to it
        return View::make('admin.job.detail')
            ->with('item', $user);
    }



    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        // $id = request()->input('id');

        $user = UserGroupModel::find($id);

        // show the view and pass the nerd to it
        return view('admin.job.detail')->with('item', $user);
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
        $id = $request->input('id');
        $data = $request->get('data');

        $usergroup = UserGroupModel::find($id);
        foreach ($data as $key => $value) {
            $usergroup->$key = $value;
        }
        $usergroup->save();

        return redirect('admin?view=job');

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $id = $request->input('id');
        UserGroupModel::destroy($id);
        return redirect('admin?view=usergroup');
    }
}
