<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\DB;

use App\Payments;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 
        'remember_token', 
        // 'province_id',
        // 'district_id',
        // 'village_id',
    ];

    public static function getUserByGroup($key){
        $data = User::select('users.name', 'users.email', 'users.id')
            ->join('user_groups', 'user_groups.id', '=', 'users.group_id')
            ->where('user_groups.key', '=', $key)
            ->get();
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
        $data = Payments::select('*')
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

    public static function getTotalUsers(){
        return self::count();
    }
    public static function getTotalVip(){
        $dt = Carbon::now();
        $count = Payments::join('users', 'user_payments.user_id', '=', 'users.id')
            ->where('user_payments.pay_type', 'VIP')
            ->where('user_payments.pay_status', 1)
            ->where('user_payments.from_time', '<=', $dt)
            ->where('user_payments.to_time', '>=', $dt)
            ->count();
        return $count;
    }
}
