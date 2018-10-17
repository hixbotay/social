<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Gif extends Model
{
    protected $table = 'gif';

    public $timestamps = false;

    protected $fillable = [
        'name', 'description', 'image', 'price', 'sale_price',
        'regular_price', 'params'
    ];
}
