<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Agency extends Model
{
    protected $table = 'agency';

    protected $fillable = ['user_id', 'name', 'address', 'province_id', 'district_id', 'authorized_dealer', 'contract'];
}
