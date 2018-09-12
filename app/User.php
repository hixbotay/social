<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'is_admin',
        'gender',
        'mobile',
        'avatar',
        'group_id',
        'address',
        'longitude',
        'latitude',
        'is_verify',
        'credit',
        'ip_address',
        'id_number',
        'provider',
        'provider_id'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token', 'job'
    ];

    public static function get_list_user_by_key($group){
        $data = User::select('name', 'email', 'id')->where('group_id', $group)->get();
        return $data;
    }

    public static function get($id) {
        $users = User::where('users.id', $id)
            ->leftjoin('user_jobs', 'job', '=', 'user_jobs.id')
            ->select('users.*', 'user_jobs.name AS job_name')
            ->get();
        return json_encode($users[0]);
    }
}
