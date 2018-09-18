<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserRelationship extends Model
{
    protected $table = "user_photos";
    protected $fillable = [
        "from_user_id",
        "to_user_id",
        "is_like",
        "is_friend",
        "is_follow",
        "is_block",
        "is_loved",
        "friend_status",
    ];

}
