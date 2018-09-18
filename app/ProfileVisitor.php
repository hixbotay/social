<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProfileVisitor extends Model
{
    protected $table = "profile_visitor";
    protected $fillable = [
        "profile_id",
        "visitor_id",
    ];
}
