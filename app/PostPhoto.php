<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PostPhoto extends Model
{
    protected $table = "post_photos";

    protected $fillable = ["post_id", "photo_id"];
}
