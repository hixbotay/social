<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\DatingPrice AS DatingPriceModel;
use App\ProvinceGroup;

class DatingPrice extends Controller
{
    public function index()
    {
        $items = DatingPriceModel::getItems();
        return view('admin.datingprice.list', ['items' => $items]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('admin.datingprice.create');
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

        $result = \App\DatingPrice::create($data);

        if ($result->id)
        {
            return redirect('/admin?view=DatingPrice')->with('success', [__('admin.SAVE_SUCCESS')]);
        }else{
            return redirect('/admin?controller=DatingPrice&task=create')->withErrors(__('admin.SAVE_FAIL'));
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

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {

        $item = DatingPriceModel::find($id);
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
        foreach ($data as $key => $value) {
            $item->$key = $value;
        }
        $result = $item->save();
        if ($result)
        {
            return redirect('/admin?view=DatingPrice')->with('success', [__('admin.SAVE_SUCCESS')]);
        }else{
            return redirect('/admin?controller=DatingPrice&task=create')->withErrors(__('admin.SAVE_FAIL'));
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
        $id =  $request->input('id');
        PostModel::destroy($id);
        // redirect to previous url after destroy
        Session::put('pre_url', URL::previous());
        console_log(Session::get('pre_url'));
        return redirect(Session::get('pre_url'));
    }
}
