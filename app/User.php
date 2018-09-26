<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\DB;

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

    

    public static function updateUser($data, $id) {
        $user = User::find($id);

        $data_arr = json_decode($data);

        $hobby = json_decode(json_encode($data_arr->hobby), true);
        $user_data = json_decode(json_encode($data_arr->user), true);

        // insert hobby
        DB::table('user_hobby_map')->insert( $hobby );

        // insert user property
        foreach ($user_data as $key => $value) {
            $user->$key = $value;
        }

        $user->save();
        return $user;
    }

    public static function visitProfile($data){

        try {
            $result = DB::table('profile_visitor')->insert( $data );
            return true;
        }
        catch (\Exception $e) {
            return false;
        }
    }
}
