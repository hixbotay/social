<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class GifCategories extends Model
{
    protected $table = 'gif_categories';

    public $timestamps = false;

    protected $fillable = [
        'name', 'description', 'image', 'params'
    ];
}
