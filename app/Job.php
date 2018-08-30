<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    protected $table = 'user_jobs';

    protected $fillable = ['name'];

    public $timestamps = false;
}
