<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Product AS ProductModel;
use App\ProvinceGroup;
use App\Agency;
use App\ProductCategory;

class Product extends Controller
{
    public function __construct(){
    }
    public function index()
    {
        $filter = isset($_GET['filter'])?$_GET['filter']:array();
        $type = isset($_GET['type'])?$_GET['type']:null;
        $title = __('admin.product_type_'.$type);

        if (!$type || ($type != 1 && $type != 2 && $type != 3)){
            return redirect('admin?view=Product&type=1');
        }

        $items = ProductModel::all();
        return view('admin.product.list', [
            'items' => $items,
            'title' => $title,
            'type' => $type
        ]);
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
        $type = isset($_GET['type'])?$_GET['type']:null;
        $store = Agency::getAgencyByType($type);
        $categories = ProductCategory::getCateByType($type);
        return view('admin.product.create', [
            'store' => $store,
            'categories' => $categories
        ]);
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
        $result = ProductModel::create($data);
        $url = 'admin?view=Product&type='.$data['type'];
        if ($result->id){
            return redirect($url)->with('success', [__('admin.SAVE_SUCCESS')]);
        }else{
            return redirect($url)->withErrors(__('admin.SAVE_FAIL'));
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
        $user = UserGroupModel::find($id);

        // show the view and pass the nerd to it
        return View::make('admin.product.detail')
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
        $user = ProvinceGroup::find($id);
        $province = ProvinceGroup::getListProvince();
        return view('admin.product.detail', ['item' => $user, 'province' => $province]);
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

        $data['province_ids'] = json_encode($data['province_ids']);

        $usergroup = \App\ProvinceGroup::find($id);
        foreach ($data as $key => $value) {
            $usergroup->$key = $value;
        }
        $usergroup->save();

        return redirect('admin?view=provincegroup');

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
        UserGroupModel::destroy($id);
        return redirect('admin?view=usergroup');
    }
}
