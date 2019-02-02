<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Event extends Model
{
    protected $table = 'events';

    public $timestamps = false;

    protected $hidden = ['agency_id'];

    // protected $fillable = [
    //     'name', 
    //     'schedule_id', 
    //     'limit_number', 
    //     'min_number', 
    //     'limit_time_register', 
    //     'start_time', 
    //     'payment_m', 
    //     'payment_f', 
    //     'image', 
    //     'type', 
    //     'creator', 
    //     'is_approved',
    //     'status',
    //     'agency_id',
    //     'is_secret',
    //     'description'
    // ];

    protected $guarded = [];

    public static function getItems($data){
        $currentUser = Auth::user();
        $items = self::select('events.*', 'users.name AS creator_name', 'users.id AS creator_id', 'agency.id AS agency_id', 'agency.name AS agency_name')
            ->join('users', 'events.creator', '=', 'users.id')
            ->join('agency', 'events.agency_id', '=', 'agency.id')
            ->where(function ($query) use ($currentUser){
                if ($currentUser->is_admin != 1){
                    $query->where('agency.user_id', '=', $currentUser->id);
                }
            })
            ->paginate(20);

        $items->withPath('admin?view=Event&layout=listEvent');
        return $items;

    }

    public static function getItem($id){
        $item = self::select('events.*', 'users.name AS creator_name', 'users.id AS creator_id', 'agency.id AS agency_id', 'agency.name AS agency_name')
            ->join('users', 'events.creator', '=', 'users.id')
            ->join('agency', 'events.agency_id', '=', 'agency.id')
            ->where('events.id', '=', $id)
            ->first();
        return $item;
    }
}
