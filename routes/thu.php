<?php
use Illuminate\Http\Request;

Route::get('/hobbies', function() {
    return \App\Hobby::get_all_hobbies();
});

Route::post('user/{id}', function (Request $request, $id){
    // $result = \App\User::updateUser($request, $id);
    // return json_encode($result);
    $data = $request->getContent();
    $result = \App\User::updateUser($data, $id);

    // return json_decode($data);
    return ($result);
});