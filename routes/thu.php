<?php
use Illuminate\Http\Request;

Route::post('user/{id}', function (Request $request, $id){
    // $result = \App\User::updateUser($request, $id);
    // return json_encode($result);
    // $data = json_encode($request);
    // return json_decode($data);
    console_log(json_decode($request));
});