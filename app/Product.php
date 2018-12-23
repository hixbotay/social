<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $table = 'product';

    protected $fillable = [
        'name',
        'content',
        'price',
        'sale_price',
        'image',
        'params',
        'category_id',
        'agency_id',
        'type'
    ];
    public $timestamps = false;

    public static function getItems($data){
        $filter = $data['filter'];
        $type = $data['type'];
        $items = self::select('product.*', 'product_category.name AS category_name', 'agency.name AS agency_name')
            ->join('product_category', 'product_category.id', '=', 'product.category_id')
            ->join('agency', 'agency.id', '=', 'product.agency_id')
            ->where('product.type', '=', $type)
            ->paginate(20);
        return $items;
    }

}


