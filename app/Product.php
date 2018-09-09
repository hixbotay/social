<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $table = 'product';

    protected $fillable = ['name','content','price','sale_price','image','params','category_id','agency_id'];

    public $timestamps = false;
}
