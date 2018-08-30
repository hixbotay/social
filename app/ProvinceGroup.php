<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProvinceGroup extends Model
{
    protected $table = 'province_groups';

    protected $fillable = ['name', 'province_ids'];

    public $timestamps = false;
}
