<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserPhoto extends Model
{
    protected $table = "user_photos";

    protected $fillable = ["user_id", "source", "type", "is_avatar"];
}
