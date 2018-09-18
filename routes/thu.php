<?php
use Illuminate\Http\Request;

Route::get('hobbies', 'Api\User@getHobbies');
Route::get('education', 'Api\User@getEducation');
Route::get('job', 'Api\User@getJob');

/**
 * This function create new relationship
 *
 */
Route::post('relationship/create', 'Api\Relationship@getJob');
Route::get('relationship/{from_user_id}/{to_user_id}', 'Api\Relationship@index');


Route::post('user/{id}', function (Request $request, $id){
    // $result = \App\User::updateUser($request, $id);
    // return json_encode($result);
    $data = $request->getContent();
    $result = \App\User::updateUser($data, $id);

    // return json_decode($data);
    return ($result);
});