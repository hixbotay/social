<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Hobby extends Model
{
    protected $table = 'user_hobby';

    protected $fillable = ['name'];

    public $timestamps = false;
}
