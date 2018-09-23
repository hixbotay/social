<?php
use Illuminate\Http\Request;



Route::get('hobbies', 'Api\User@getHobbies');
Route::get('education', 'Api\User@getEducation');
Route::get('job', 'Api\User@getJob');
//likeProfile/ folow, love
Route::post('relationship/create', 'Api\User@getJob');
//load relationship
Route::get('relationship/{from_user_id}/{to_user_id}', 'Api\User@index');

Route::get('/posts', 'Api\Post@list');
/*
 * post/like/{post_id}
 * input:
 * type: like, dislike, love //
 * user_id: 99
 */
Route::middleware(['web'])->group(function() {
    Route::post('post/like/{post_id}', 'Api\Post@like');
    Route::post('post/unlike/{post_id}', 'Api\Post@unlike');
});

Route::post('profile/visitprofile', 'Api\User@visitProfile');

Route::post('user/{id}', function (Request $request, $id){
    // $result = \App\User::updateUser($request, $id);
    // return json_encode($result);
    $data = $request->getContent();
    $result = \App\User::updateUser($data, $id);

    // return json_decode($data);
    return ($result);
});

Route::get('couple/search/{keyword}', function($keyword) {
    $results = \App\Http\Controllers\Api\Couple::find($keyword);
    return json_encode($results);
});

Route::get('couple/view/{id}', function($id) {
    $results = \App\Http\Controllers\Api\Couple::findOne($id);
    return json_encode($results);
});