<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProductPhotos extends Model
{
    protected $table = 'product_photos';

    protected $fillable = ['product_id', 'url'];

    public $timestamps = true;

}
