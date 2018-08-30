<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class EventSchedules extends Model
{
    protected $table = 'event_schedules';

    protected $fillable = ['name', 'desciption', 'address_id', 'schedule_type', 'start_time', 'start_date', 'limit_number', 'min_number','min_m', 'min_f'];

    public $timestamps = false;
}
