<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $table = 'events';

    // protected $appends = ['job_conditional', 'marital_status', 'min_male_age', 'min_female_age', 'max_male_age', 'max_female_age'];

    protected $fillable = ['name', 'schedule_id', 'description', 'address', 'address_id', 'limit_number', 'min_number','min_m', 'min_f', 'limit_time_register', 'start_time', 'payment_m', 'payment_f', 'params'];
}
