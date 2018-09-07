<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Finance extends Model
{
    protected $table = "revenue";

    protected $fillable = ["group_id", "value", "type"];

//    public $timestamps = false;


}
