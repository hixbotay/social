<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\PostPhoto;
use Illuminate\Support\Facades\Auth;

class Post extends Model
{
    protected $table = "posts";

    protected $fillable = ["user_id", "content", "like", "dislike"];

}
