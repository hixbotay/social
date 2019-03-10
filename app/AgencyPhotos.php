<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AgencyPhotos extends Model
{

    protected $table = 'agency_photos';
    protected $fillable = [
        'agency_id',
        'source',
        'type',
    ];

}
