<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Ads AS AdsModel;

class Ads extends Controller
{
    public function index(){
        $this->authorize(config('auth.action.ADS_ORDERS'));
        $items = AdsModel::getItems();
        return view('admin.ads.list', [
            'items' => $items
        ]);
    }
}
