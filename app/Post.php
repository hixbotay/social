<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\PostPhoto;
use Illuminate\Support\Facades\Auth;

class Post extends Model
{
    protected $table = "posts";

    protected $fillable = ["user_id", "content", "like", "dislike"];

    public static function list() {
        $result = Post::leftjoin('users', 'posts.user_id', '=', 'users.id')
            ->leftjoin('post_photos', 'posts.id', '=', 'post_photos.post_id')
            ->leftjoin('user_photos', 'user_photos.id', '=', 'post_photos.photo_id')
            ->select('users.name AS author', 'users.avatar AS author_avatar','posts.*', 'user_photos.id AS photo_id', 'user_photos.source')
            ->orderBy('id', 'DESC')
            ->get();
        
        return json_encode($result);
    }

}
