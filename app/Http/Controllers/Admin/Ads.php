<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Ads AS AdsModel;

class Ads extends Controller
{
    public function index(){
        $items = AdsModel::getItems();
        return view('admin.ads.list', [
            'items' => $items
        ]);
    }
}
