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

    public static function get($id) {
        $users = User::where('users.id', $id)
            ->leftjoin('user_jobs', 'job', '=', 'user_jobs.id')
            ->leftjoin('user_relationship', 'users.id', '=', 'user_relationship.to_user_id')
            // ->select(DB::raw(
            //     'users.*, 
            //     user_jobs.name AS job_name, 
            //     COUNT(user_relationship.is_loved = 1) AS loveNumber, 
            //     COUNT(user_relationship.is_like = 1) AS likeNumber'
            // ))
            ->select(DB::raw(
                'users.*, 
                user_jobs.name AS job_name, 
                SUM(case user_relationship.is_loved WHEN 1 THEN 1 ELSE null END) AS loveNumber, 
                SUM(case user_relationship.is_like WHEN 1 THEN 1 ELSE null END) AS likeNumber'
            ))
            // ->groupBy('users.id')
            ->get();

        $hobbies =  DB::table('user_hobby_map')
                    ->where('user_hobby_map.user_id', $id)
                    ->leftjoin('user_hobby', 'hobby_id', '=', 'user_hobby.id')
                    ->select('user_hobby.name')
                    ->get();
        $result = [
            'user' => $users[0],
            'hobbies' => $hobbies
        ];

        return json_encode($result);
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

        $result = DB::table('profile_visitor')->insert( json_decode($data, true) );
        return $result;
    }
}
