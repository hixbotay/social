<?php

namespace App;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;

class ProductCategory extends Model
{
    protected $table = 'product_category';

    protected $fillable = ['name', 'description', 'type', 'image'];

    public static function getItems($data){
        $filter = $data['filter'];
        $type = $data['type'];
        $request = Request::capture();
        $currentUser = Auth::user();
        $items = DB::table('product_category')
            ->where(function ($query) use ($filter, $type) {
                if ($type){
                    $query->where('product_category.type', '=', $type);
                }

            })
            ->where(function ($query) use ($currentUser){
                if ($currentUser->is_admin != 1){
                    $query->where('product_category.user_id', '=', $currentUser->id)->orWhereNull('product_category.user_id');
                }
            })
            ->paginate(20);
        return $items;
    }

    public static function getCateByType($type){
        $data = self::select('*')
            ->where('id', '=', $type)
            ->get();
        return $data;
    }

}
