<?php

class Importer {

    public static function helper($name)
    {
        $names = func_get_args();
        self::import('helpers', $names);
    }

    private static function import($base, $names, $ext = 'php')
    {
        if (! is_array($names)) {
            $names = array($names);
        }
        foreach ($names as $name) {
            $filePathMask = base_path() . '/' . $base. '/' . $name . '.' . $ext;
            self::importFile($filePathMask);
        }
    }

    private static function importFile($fileURL){
        if (file_exists($fileURL)){
            require_once ($fileURL);
        }else{
            return false;
        }
    }
}

?>