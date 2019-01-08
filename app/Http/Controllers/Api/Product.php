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

    public function updateCart(Request $request, $id) {
        $user_id = Auth::id();
        $item = \App\Cart::where([['id', '=', $id], ['user_id', '=', $user_id]])->first();
        $item->quantity = $request->get('quantity');
        $item->save();

        return $this->getCartItems($user_id, $item->receiver);
    }

    public function removeFromCart($id) {
        $user_id = Auth::id();
        $item = \App\Cart::where([['id', '=', $id], ['user_id', '=', $user_id]])->first();
        $receiver = $item->receiver;
        $item->delete();
        return $this->getCartItems($user_id, $receiver);
    }

    public function checkout(Request $request) {
        $user = Auth::user();
        // check user enough money or not
        if((int) $user->credit < ($request->get('cartTotal') + $request->get('shipFee'))) {
            return (['alert' => 'Tài khoản của bạn không đủ để thanh toán!']); 
        }

        $receiver = \App\User::where('id', $request->get('receiver'))
            ->leftjoin('devvn_tinhthanhpho', 'users.province_id', '=', 'devvn_tinhthanhpho.matp')
            ->leftjoin('devvn_quanhuyen', 'users.district_id', '=', 'devvn_quanhuyen.maqh')
            ->leftjoin('devvn_xaphuongthitran', 'users.village_id', '=', 'devvn_xaphuongthitran.xaid')
            ->select(DB::raw(
                'users.*,
                devvn_tinhthanhpho.name AS province_name,
                devvn_quanhuyen.name AS district_name,
                devvn_xaphuongthitran.name AS village_name'
            ))
            ->first();
        $items = \App\Cart::where('receiver', $receiver->id)->get();

        $order = \App\Order::create([
            'user_id' => $user->id,
            'receiver_id' => $receiver->id,
            'receiver_name' => $receiver->name,
            'order_number' =>  time(),
            'order_status' => 1,
            'total' => $request->get('cartTotal'),
            'ship_fee' => $request->get('shipFee'),
            'address1' => $receiver->village_name.', '.$receiver->district_name.', '.$receiver->province_name,
            'params' => $request->get('params'),
            'created_at' => date("Y-m-d H:i:s"),
            'updated_at' => date("Y-m-d H:i:s")
        ]);

        $temp = [];
        foreach($items as $item) {
            array_push($temp, [
                'order_id' => $order->id,
                'product_id' => $item->product_id,
                'quantity' => $item->quantity,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ]);
        }
        \App\OrderItem::insert($temp);

        $user->credit = (int) $user->credit - $request->get('cartTotal') - $request->get('shipFee');
        $user->save();

        $items = \App\Cart::where('receiver', $receiver->id)->delete();

        return ['ok' => 1];
    }

    public function updateWishlist(Request $request) {
        $user = Auth::user();
        $wishlist = explode(',', $user->wishlist_product);
        if($request->get('type') == 'add') {
            array_push($wishlist, $request->get('product_id'));
        } else if($request->get('type') == 'remove') {
            // remove product from wishlist 
            $wishlist = array_merge(array_diff($wishlist, [$request->get('product_id')]));
        }
        
        $user->wishlist_product = implode(',', $wishlist);
        $user->save();

        return ['ok' => 1];
    }

    public function getWishlist() {
        $user = Auth::user();
        $wishlist = explode(',', $user->wishlist_product);
        $products = ProductModel::whereIn('id', $wishlist)->get();

        return ['products' => $products];
    }
}