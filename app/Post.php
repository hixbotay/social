<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\PostPhoto;

class Post extends Model
{
    protected $table = "posts";

    protected $fillable = ["user_id", "content", "like", "dislike"];

    public static function list() {
        $result = Post::leftjoin('post_photos', 'posts.id', '=', 'post_photos.post_id')
            ->leftjoin('user_photos', 'user_photos.id', '=', 'post_photos.photo_id')
            ->select('posts.*', 'user_photos.id AS photo_id', 'user_photos.source')
            ->get();
        
        return json_encode($result);
    }

}
