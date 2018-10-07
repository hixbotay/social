<?php

class SystemConfig {

    /*
     * name = option name
     */
    public static function get($name = null){
        if ($name){
            $data = \App\Configuration::where('name', $name)->get();
            return $data;
        }
    }

}

?>