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

}
