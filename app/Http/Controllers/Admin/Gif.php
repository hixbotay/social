<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class Gif extends Controller
{
    public function index(){
        $items = \App\Gif::all();
        return view('admin.gif.list', ['items' => $items]);
    }

    public function create()
    {
        $listCat = \App\GifCategories::all();
        return view('admin.gif.create', ['listCat' => $listCat]);
    }

    public function store(Request $request)
    {
        $data = request()->get('data');
        $result = \App\Gif::create($data);
        $url = url('admin?view=Gif');
        if ($result->id){
            return redirect($url)->with('success', ['SAVE_SUCCESS']);
        }else{
            return redirect($url)->withErrors('SAVE_FAIL');
        }
    }

    public function edit($id)
    {
        $item = \App\Gif::find($id);
        $listCat = \App\GifCategories::all();
        return view('admin.gif.detail', [
            'item' => $item,
            'listCat' => $listCat
        ]);
    }

    public function update(Request $request)
    {
        $id =  $request->input('id');
        $item = \App\Gif::find($id);

        $data = $request->get('data');

        if ($item->id){

            foreach ($data as $key => $value) {
                $item->$key = $value;
            }
        }

        $result = $item->save();
        $url = url('admin?view=Gif');

        if ($result){
            return redirect($url)->with('success', ['SAVE_SUCCESS']);
        }else{
            return redirect($url)->withErrors('SAVE_FAIL');
        }
    }

}
