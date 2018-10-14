<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;


class Hobby extends Model
{
    protected $table = 'user_hobby';

    protected $fillable = ['name', 'description'];

    public $timestamps = true;

    static function get_all_hobbies() {
        return Hobby::all();
    }

    static function get_hobby_by_user($id){
        $result = DB::table('user_hobby_map')->where("user_id", $id)->get();
        return $result;
    }
}
