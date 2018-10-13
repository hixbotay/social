<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class Hobby extends Controller
{
    public function __construct(){

    }
    public function index()
    {
        $items = \App\Hobby::all();
        return view('admin.hobby.list', ['items' => $items]);
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
        return view('admin.hobby.create');
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
        $result = \App\Hobby::create($data);

        $url = url('admin?view=Hobby');

        if ($result->id){
            return redirect($url)->with('success', ['SAVE_SUCCESS']);
        }else{
            return redirect($url)->withErrors('SAVE_FAIL');
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = \App\Hobby::find($id);

        // show the view and pass the nerd to it
        return View::make('admin.hobby.detail')
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

        $user = \App\Hobby::find($id);

        // show the view and pass the nerd to it
        return view('admin.hobby.detail')->with('item', $user);
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

        $usergroup = \App\Hobby::find($id);
        foreach ($data as $key => $value) {
            $usergroup->$key = $value;
        }
        $result = $usergroup->save();
        $url = url('admin?view=Hobby');

        if ($result){
            return redirect($url)->with('success', ['SAVE_SUCCESS']);
        }else{
            return redirect($url)->withErrors('SAVE_FAIL');
        }

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
        \App\Hobby::destroy($id);
        return redirect('admin?view=hobby');
    }
}
