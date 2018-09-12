<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    protected $table = 'user_jobs';

    protected $fillable = ['name', 'description'];

    public $timestamps = false;

    public static function select_job($name, $class = null, $id = null, $selected = null){

        $job = self::all();

        echo "<select class='$class form-control'>";
        foreach ($job AS $value){
            echo "<option value='$value->id'>";
            echo $value->name;
            echo "</option>";
        }
        echo "</select>";
    }
}
