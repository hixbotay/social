<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AgencyCoupons extends Model
{

    protected $table = 'agency_coupons';

    protected $fillable = [
        'type',
        'dating_type',
        'from_time',
        'to_time',
        'product_id',
        'value',
        'unit',
        'params',
        'agency_id',
        'code',
    ];
}
