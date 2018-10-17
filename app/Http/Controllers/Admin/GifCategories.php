<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class GifCategories extends Controller
{
    public function index(){
        $items = \App\GifCategories::all();
        return view('admin.gifcategories.list', ['items' => $items]);
    }

    public function create()
    {
        return view('admin.gifcategories.create');
    }

    public function store(Request $request)
    {
        $data = request()->get('data');
        console_log($data);

        $result = \App\GifCategories::create($data);
        $url = url('admin?view=GifCategories');
        if ($result->id){
            return redirect($url)->with('success', ['SAVE_SUCCESS']);
        }else{
            return redirect($url)->withErrors('SAVE_FAIL');
        }
    }
    public function edit($id)
    {
        $item = \App\GifCategories::find($id);
        return view('admin.gifcategories.detail', ['item' => $item]);
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
        $item = \App\GifCategories::find($id);

        $data = $request->get('data');

        if ($item->id){

            foreach ($data as $key => $value) {
                $item->$key = $value;
            }
        }

        $result = $item->save();
        $url = url('admin?view=GifCategories');

        if ($result){
            return redirect($url)->with('success', ['SAVE_SUCCESS']);
        }else{
            return redirect($url)->withErrors('SAVE_FAIL');
        }
    }
}
