<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use \App\Http\Controllers\Api\User as UserController;

use App\Payments;
use App\UserGroup;

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

    protected $appends = [
        'role',
    ];


    public function getRoleAttribute()
    {
        if ($this->group_id)
        {
            $group = UserGroup::find($this->group_id);
            if ($group->role){
                return \GuzzleHttp\json_decode($group->role);
            }
            return array();
        }
        return array();
    }

    public function getGroupAttribute(){
//        return (object) array('name' => '111', 'key' => '1212');
        if ($this->group_id)
        {
            $group = UserGroup::find($this->group_id);
            return (object)array(
                'name' => $group->name,
                'key' => $group->key
            );
        }
        return array();
    }


    public static function getUserByGroup($key){
        $data = User::select('users.name', 'users.email', 'users.id')
            ->join('user_groups', 'user_groups.id', '=', 'users.group_id')
            ->where('user_groups.key', '=', $key)
            ->get();
        return $data;
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

    // type: add or spend
    public static function pay($user_id, $amount, $type, $content) {
        $now = date('Y-m-d H:i:s');
        $user = User::find([['id', '=', $user_id]]);
        if($type === 'add') {
            $user->credit += $amount;
        } else {
            $user->credit -= $amount;
        }
        $user->save();

        // DB::table('user_payments')->insert([
        //     'user_id' => $user_id,
            
        // ])
    }
}
