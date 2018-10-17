<?php
use Illuminate\Http\Request;



Route::get('hobbies', 'Api\User@getHobbies');
Route::get('education', 'Api\User@getEducation');
Route::get('job', 'Api\User@getJob');

//load relationship
// Route::get('relationship/{from_user_id}/{to_user_id}', 'Api\User@index');

Route::get('/posts', 'Api\Post@list');
/*
 * post/like/{post_id}
 * input:
 * type: like, dislike, love //
 * user_id: 99
 */
Route::middleware(['web'])->group(function() {
    //likeProfile/ folow, love
    Route::post('relationship/{user_id}', 'Api\User@createOrUpdateRelationship');
    Route::get('friends/{type}', 'Api\User@listFriends');

    Route::get('my-posts', 'Api\Post@getMyPosts');
    Route::post('post/like/{post_id}', 'Api\Post@like');
    Route::post('post/unlike/{post_id}', 'Api\Post@unlike');

    Route::post('/cafe/image/{id}', 'Api\Cafe@handleImage');

    Route::post('/event', 'Api\Event@create');
    Route::post('/event/{event_id}', 'Api\Event@joinEvent');
    
    Route::get('/events/around', 'Api\Event@listEventsAround');
    Route::get('/events/crush', 'Api\Event@listEventsHasYourCrush');
    Route::get('/events/{status}', 'Api\Event@list');
    Route::get('/event/{event_id}/registers', 'Api\Event@listUserByEvent');

    Route::get('/couple/search/{keyword}', 'Api\Couple@find');
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

Route::post('user/{id}/upload-id-card', 'Api\User@uploadIdCardPhoto');



Route::get('couple/view/{id}', function($id) {
    $results = \App\Http\Controllers\Api\Couple::findOne($id);
    return json_encode($results);
});

Route::post('/post', 'Api\Post@createPost');


Route::get('/jobs', 'Api\Job@list');

Route::get('cafes', 'Api\Cafe@list');
Route::get('cafe/{id}', 'Api\Cafe@get');



