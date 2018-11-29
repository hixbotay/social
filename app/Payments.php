<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Payments extends Model
{
    protected $table = 'user_payments';
    protected $fillable = [
        'user_id',
        'total',
        'tx_id', 'pay_type',
        'pay_status',
        'params',
        'from_time',
        'to_time',
        'to_user',
        'currency',
        'pay_number'
    ];

    public function checkVIP(){

    }

}
