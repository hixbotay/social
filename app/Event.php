<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $table = 'events';

    public $timestamps = false;

    protected $hidden = ['agency_id'];

    protected $fillable = [
        'name', 
        'schedule_id', 
        'limit_number', 
        'min_number', 
        'limit_time_register', 
        'start_time', 
        'payment_m', 
        'payment_f', 
        'image', 
        'type', 
        'creator', 
        'is_approved',
        'status',
        'agency_id',
        'is_secret',
        'description'
    ];
}
