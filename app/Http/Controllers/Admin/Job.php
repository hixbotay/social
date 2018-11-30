<?php

namespace App\Http\Controllers\ADmin;

use Faker\Factory;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Job AS JobModel;
use App\UserGroup;

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
        $user = JobModel::find($id);

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

        $job = JobModel::find($id);

        return view('admin.job.detail')->with('item', $job);
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

        $job = JobModel::find($id);
        foreach ($data as $key => $value) {
            $job->$key = $value;
        }
        $result = $job->save();

        if ($result){
            return redirect('admin?view=Job&layout=edit&id='.$id)->with('success', ['SAVE_SUCCESS']);
        }

        return redirect('admin?view=job')->withErrors('SAVE_FAIL');

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
        $result = JobModel::destroy($id);
        if ($result){
            return redirect('admin?view=Job')->with('success', ['SAVE_SUCCESS']);
        }
        return redirect('admin?view=Job')->withErrors('SAVE_FAIL');
    }
}
