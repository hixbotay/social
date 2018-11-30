<?php

namespace App;

use Carbon\Carbon;
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
        'provider_id',
        'is_id_verified',
        'province_id',
        'district_id',
        'village_id',
        'marital_status',
        'birthday',
        'remember_token',
        'job',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 
        'remember_token', 
        'job', 
        // 'province_id',
        // 'district_id',
        // 'village_id',
    ];

    public static function getUserByGroup($group){
        $data = User::select('name', 'email', 'id')->where('group_id', $group)->get();
        return $data;
    }

    

    public static function updateUser($data, $id) {
        $user = User::find($id);

        $data_arr = json_decode($data, true);

        // remove old hobyy and insert new hobby
        if(array_key_exists('hobby', $data_arr)) {
            DB::table('user_hobby_map')->where('user_id', '=', $id)->delete();
            $result = DB::table('user_hobby_map')->insert( $data_arr['hobby'] );
        }

        // insert user property
        foreach ($data_arr['user'] as $key => $value) {
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

    public static function checkVip($userID){
        $dt = Carbon::now();
        $data = \App\Payments::select('*')
            ->where('user_id', $userID)
            ->where('pay_type', 'VIP')
            ->where('pay_status', 1)
            ->where('from_time', '<=', $dt)
            ->where('to_time', '>=', $dt)
            ->first();

        $vipInfo = array();

        if ($data->id){
            $vipInfo['from_time'] = $data->from_time;
            $vipInfo['to_time'] = $data->to_time;
            return $vipInfo;
        }else{
            return false;
        }
    }

    public static function getTotalUser(){

    }
}
