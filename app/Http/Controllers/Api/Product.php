<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class Product extends Controller {
    public function listCategories() {
        $categories = \App\ProductCategory::all();
        return ['categories' => $categories];
    }

    public function listProducts(Request $request) {
        $query = $request->all();
        $products = \App\Product::where($query)->get();
        return ['products' => $products];
    }
}