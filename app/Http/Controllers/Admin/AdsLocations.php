<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\AdsLocations AS AdslocationModel;

class AdsLocations extends Controller
{
    public function index(){
        $items = AdslocationModel::getItems();
        return view('admin.adslocation.list', [
            'items' => $items
        ]);
    }

    public function edit($id){
        $item = AdslocationModel::find($id);
        $parents = AdslocationModel::getParentItems();
        return view('admin.adslocation.detail', [
            'item' => $item,
            'parents' => $parents
        ]);
    }

    public function create(){

        $parents = AdslocationModel::getParentItems();
        return view('admin.adslocation.create', [
            'parents' => $parents
        ]);
    }

    public function store(Request $request){
        $data = $request->get('data');
        $result = AdslocationModel::create($data);
        $url = url('admin?view=AdsLocations');
        if (!$result) return redirect($url)->withErrors(__('admin.SAVE_FAIL'));
        return redirect($url)->with('success', [__('admin.SAVE_SUCCESS')]);
    }

}
