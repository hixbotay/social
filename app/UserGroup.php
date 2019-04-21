<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserGroup extends Model
{
    protected $table = 'user_groups';

    protected $fillable = ['name', 'params'];

    public $timestamps = false;

    public static function getGroupByKey($key){
        if (!$key) return false;
        $data = self::select('*')
            ->where('key', '=', $key)
            ->first();
        return $data;
    }

}
