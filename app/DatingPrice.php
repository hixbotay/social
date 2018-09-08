<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DatingPrice extends Model
{
    protected $table = 'dating_price';

    protected $fillable = ['type', 'province_group_id', 'double_dating_price', 'group_dating_m_price', 'group_dating_f_price'];

//    public $timestamps = false;
}
