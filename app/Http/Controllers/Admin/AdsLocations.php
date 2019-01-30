<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\AdsLocations AS AdslocationModel;
use Illuminate\Support\Facades\DB;

class AdsLocations extends Controller
{
    public function index(){

        $this->authorize(config('auth.action.ADS_LOCATIONS'));

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

    public function update(Request $request){
        $id =  $request->input('id');
        $item = AdslocationModel::find($id);
        $url = url('admin?view=AdsLocations');
        if (!$item->id) return redirect($url)->withErrors(__('admin.SAVE_FAIL'));

        $data = $request->get('data');
        foreach ($data as $key => $value) {
            if ($value)$item->$key = $value;
        }
        $result = $item->save();
        if (!$result) return redirect($url)->withErrors(__('admin.SAVE_FAIL'));
        return redirect($url)->with('success', [__('admin.SAVE_SUCCESS')]);
    }


    public function migratehihi(){
        die;
        $data = array(
            [
                'name' => 'Hẹn tốc độ 1',
                'code' => 'DATING_ADS_1',
                'parent_id' => 0,
                'price' => 300000
            ],
            [
                'name' => 'Hẹn tốc độ 2',
                'code' => 'DATING_ADS_2',
                'parent_id' => 0,
                'price' => 200000
            ],
            [
                'name' => 'Hẹn tốc độ 3',
                'code' => 'DATING_ADS_3',
                'parent_id' => 0,
                'price' => 200000
            ],
            [
                'name' => 'Module kết đôi 1',
                'code' => 'COUPLE_ADS_1',
                'parent_id' => 0,
                'price' => 200000
            ],
            [
                'name' => 'Module kết đôi 2',
                'code' => 'COUPLE_ADS_2',
                'parent_id' => 0,
                'price' => 200000
            ],
            [
                'name' => 'Trang like cá nhân 1',
                'code' => 'LIKE_YOU_ADS_1',
                'parent_id' => 0,
                'price' => 200000
            ],
            [
                'name' => 'Trang like cá nhân 2',
                'code' => 'LIKE_YOU_ADS_2',
                'parent_id' => 0,
                'price' => 200000
            ],
            [
                'name' => 'Trang like cá nhân 3',
                'code' => 'LIKE_YOU_ADS_3',
                'parent_id' => 0,
                'price' => 200000
            ],
            [
                'name' => 'Trang cà phê 1',
                'code' => 'CAFE_ADS_1',
                'parent_id' => 0,
                'price' => 200000
            ],
            [
                'name' => 'Trang cà phê 2',
                'code' => 'CAFE_ADS_2',
                'parent_id' => 0,
                'price' => 200000
            ],
            [
                'name' => 'Trang cà phê 3',
                'code' => 'CAFE_ADS_3',
                'parent_id' => 0,
                'price' => 200000
            ],

        );
        DB::table('ads_location')->insert($data);
    }

}
