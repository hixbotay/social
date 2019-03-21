<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AgencyEmployee extends Model
{
    protected $table = 'agency_employee';
    protected $fillable = [
        'agency_id',
        'user_id',
        'params',
    ];
}
