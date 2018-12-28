<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\ProductCategory;
use App\Product AS ProductModel;

class Product extends Controller {

    protected $type;

    public function __construct()
    {
        $this->type = config('agency.type');
    }

    public function listCategories() {
        $categories = ProductCategory::all();
        return ['categories' => $categories];
    }

    public function listProducts(Request $request) {
        $query = $request->all();
        $products = ProductModel::where($query)->get();
        return ['products' => $products];
    }

    public function getProductByCate(){

    }

    public function getCateByType(){

    }

    public function listCategory(Request $request){
        return $this->type;
        $type = 1;
        $items = ProductCategory::getCateByType($type);
    }

}