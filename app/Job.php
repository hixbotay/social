<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    protected $table = 'user_jobs';

    protected $fillable = ['name', 'description'];

    public $timestamps = false;

    public static function select_job($name, $selected = null, $class = null, $id = null){

        $job = self::all();

        echo '<select class="$class form-control" name="'.$name.'">';
        foreach ($job AS $value){
            $checked = null;
            if ($value->id == $selected) $checked = "selected";
            echo '<option value="'.$value->id.'" '.$checked.'>';
            echo $value->name;
            echo "</option>";
        }
        echo "</select>";
    }
}
