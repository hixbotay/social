<?php


Route::get('thu', function() {
    // If the Content-Type and Accept headers are set to 'application/json',
    // this will return a JSON structure. This will be cleaned up later.
    die(json_encode(array('íd'=>1,'çontent'=>'vantu')));
});