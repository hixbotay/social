<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DatingFee extends Model
{
    protected $table = 'dating_fee';

    protected $fillable = ['dating_price_id', 'user_id', 'price', 'type'];

}
