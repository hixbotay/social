<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Product AS ProductModel;
use App\ProvinceGroup;
use App\Agency;
use App\ProductCategory;
use App\ProductPhotos;

class Product extends Controller
{
    protected $type;
    private $rule = [
        'name'=>'required|max:30',
    ];

    public function __construct(){
        $this->type = config('agency.type');
    }
    public function index()
    {
        $filter = isset($_GET['filter'])?$_GET['filter']:array();
        $type = isset($_GET['type'])?$_GET['type']:null;
        $title = __('admin.product_type_'.$type);

        if (!$type || (!in_array($type, $this->type))){
            return redirect('admin?view=Product&type=1');
        }

        $data = array();
        $data['filter'] = $filter;
        $data['type'] = $type;

        $items = ProductModel::getItems($data);
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

    public function create()
    {
        $type = isset($_GET['type'])?$_GET['type']:null;
        $store = Agency::getAgencyByType($type);
        $categories = ProductCategory::getCateByType($type);
        return view('admin.product.create', [
            'store' => $store,
            'categories' => $categories,
            'type' => $type
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

            $file = $request->file('images');
            if ($file){
                $images = [];
                $images['product_id'] = $result->id;
                foreach ($file AS $value){
                    $file_name = time() . '_' . $value->getClientOriginalName();
                    $file_path = 'storage/app/product/category/'.$data['type'].'/';
                    $newFile = $value->move($file_path, $file_name);
                    $images['url'] = $file_path . $file_name;
                    ProductPhotos::create($images);
                }
            }

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
        $id = request()->input('id');
        $type = isset($_GET['type'])?$_GET['type']:null;
        $store = Agency::getAgencyByType($type);
        $categories = ProductCategory::getCateByType($type);
        $item = ProductModel::find($id);
        $images = ProductPhotos::where('product_id', '=', $id)->get();
        return view('admin.product.detail', [
            'store' => $store,
            'categories' => $categories,
            'type' => $type,
            'item' => $item,
            'images' => $images
        ]);
    }

    public function update(Request $request)
    {
//        echo "<pre>";
//        print_r($request->get('old_images'));
//        die;
        $id = $request->input('id');
        $data = $request->get('data');
        $url = 'admin?view=Product&layout=edit&id='.$id.'&type=' . $data['type'];
        $item = ProductModel::find($id);
        if (!$item->id) return redirect($url)->withErrors(__('admin.SAVE_FAIL'));
        foreach ($data as $key => $value) {
            $item->$key = $value;
        }
        $result = $item->save();
        if ($result){
            $file = $request->file('images');
            $oldImages = $request->get('old_images');

            if ($file){

                if ($oldImages && is_array($oldImages))
                {
                    ProductPhotos::where('product_id', '=', $id)
                        ->whereNotIn('id', $oldImages)->delete();
                }else{
                    ProductPhotos::where('product_id', '=', $id)
                        ->delete();
                }

                $images = [];
                $images['product_id'] = $id;
                foreach ($file AS $value){
                    $file_name = time() . '_' . $value->getClientOriginalName();
                    $file_path = 'storage/app/product/category/'.$data['type'].'/';
                    $newFile = $value->move($file_path, $file_name);
                    $images['url'] = $file_path . $file_name;
                    ProductPhotos::create($images);
                }
            }
        }
        if (!$result) return redirect($url)->withErrors(__('admin.SAVE_FAIL'));
        return redirect($url)->with('success', [__('admin.SAVE_SUCCESS')]);
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
        $result = ProductModel::destroy($id);
        $type = isset($_GET['type'])?$_GET['type']:null;
        $url = 'admin?view=Product&type='.$type;
        if (!$result)
            return redirect($url)->withErrors(__('admin.SAVE_FAIL'));
        return redirect($url)->with('success', [__('admin.SAVE_SUCCESS')]);
    }
}
