<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\ProductCategory AS ProductCategoryModel;

class ProductCategory extends Controller
{

    public function index()
    {
        $items = ProductCategoryModel::all();
        return view('admin.ProductCategory.list', ['items' => $items]);
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
        return view('admin.ProductCategory.create');
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
        $result = ProductCategoryModel::create($data);
        return redirect('admin?view=ProductCategory');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $item = ProductCategoryModel::find($id);
        return View::make('admin.ProductCategory.detail')->with('item', $item);
    }



    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $item = ProductCategoryModel::find($id);
//        return View::make('admin.ProductCategory.detail')->with('item', $item);
        return view('admin.ProductCategory.detail', ['item' => $item]);
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
        $id = $request->get('id');
        $data = $request->get('data');

        $item = ProductCategoryModel::find($id);

        foreach ($data as $key => $value) {
            $item->$key = $value;
        }

        if ($item->id)
        {
            $item->save();
        }

        return redirect('admin?view=ProductCategory');

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
        return redirect('admin?view=ProductCategory');
    }
}
