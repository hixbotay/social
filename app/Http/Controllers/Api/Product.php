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

    public function listCategories($type) {
        $categories = ProductCategory::where('type', $type)->get();
        return ['categories' => $categories];
    }

    public function listProducts(Request $request) {
        $query = $request->all();
        $products = ProductModel::where($query)->get();
        return ['products' => $products];
    }

    public function getProductDetail($id) {
        $product = ProductModel::leftjoin('product_category', 'category_id', '=', 'product_category.id')
            ->where('product.id', '=', $id)
            ->select(DB::raw('product.*, product_category.name AS category_name'))
            ->first();
        
        $photos = DB::table('product_photos')->where('product_id', '=', $id)->get();
        $product['photos'] = $photos;

        return ['product' => $product];
    }

    function getCartItems($user_id, $receiver) {
        $cartItems = DB::table('cart')
                    ->join('product', 'product.id', '=', 'cart.product_id')
                    ->where([
                        ['user_id', '=', $user_id],
                        ['receiver', '=', $receiver],
                    ])
                    ->select(DB::raw('cart.*, product.name, product.price, product.sale_price, product.image'))
                    ->get();
        
        $total = 0;
        foreach($cartItems as $item) {
            if($item->sale_price) $total += $item->sale_price * $item->quantity;
            else $total += $item->price * $item->quantity;
        }

        return ['cartItems' => $cartItems, 'total' => $total];
    }

    public function getCart(Request $request) {
        $user_id = Auth::id();
        $receiver = $request->get('receiver') ? $request->get('receiver') : $user_id;

        return $this->getCartItems($user_id, $receiver);
    }

    public function addToCart(Request $request) {
        $data = $request->all();
        $user_id = Auth::id();

        $item = \App\Cart::create([
                        'user_id' => $user_id,
                        'product_id' => $data['product_id'],
                        'quantity' => $data['quantity'],
                        'receiver' => $data['receiver'],
                        'created_at' => date('Y-m-d h:i:s'),
                        'updated_at' => date('Y-m-d h:i:s')
                    ]);

        return $this->getCartItems($user_id, $data['receiver']);
    }

    public function updateCart(Request $request) {
        
    }

    public function removeFromCart($id) {
        $user_id = Auth::id();
        $item = \App\Cart::where([['id', '=', $id], ['user_id', '=', $user_id]])->first();
        $receiver = $item->receiver;
        $item->delete();
        return $this->getCartItems($user_id, $receiver);
    }
}