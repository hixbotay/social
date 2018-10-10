<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $table = 'events';

    public $timestamps = false;

    protected $fillable = ['name', 'schedule_id', 'address', 'address_id', 'limit_number', 'min_number', 'limit_time_register', 'start_time', 'payment_m', 'payment_f', 'image', 'type'];
}
