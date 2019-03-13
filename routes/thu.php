<?php
use Illuminate\Http\Request;



Route::get('hobbies', 'Api\User@getHobbies');
Route::get('education', 'Api\User@getEducation');
Route::get('job', 'Api\User@getJob');

//load relationship
// Route::get('relationship/{from_user_id}/{to_user_id}', 'Api\User@index');

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

    Route::post('/event/group', 'Api\Event@createGroupEvent');
    Route::post('/event/couple', 'Api\Event@createCoupleEvent');
    Route::post('/event/status/{id}', 'Api\Event@updateStatus');
    Route::post('/event/review/{id}', 'Api\Event@reviewEvent');
    Route::post('/event/subscribe', 'Api\Event@subscribeEvent');
    Route::post('/event/{event_id}', 'Api\Event@joinEvent');
    Route::put('/event/cancel/{event_id}', 'Api\Event@cancelEventByMember');
    Route::put('/event/refuse/{event_id}', 'Api\Event@refuseRegister');
    Route::put('/event/reset/{event_id}', 'Api\Event@resetEvent');
    Route::get('/event/members/{event_id}', 'Api\Event@getCoupleEventMember');
    
    Route::get('/events/around', 'Api\Event@listEventsAround');
    Route::get('/events/crush', 'Api\Event@listEventsHasYourCrush');
    Route::get('/events/upcoming', 'Api\Event@listEventsUpcoming');
    Route::get('/events/invited', 'Api\Event@listInvitation');
    Route::get('/event/search', 'Api\Event@search');
    Route::get('/events/{status}', 'Api\Event@list');
    Route::get('/event/{event_id}', 'Api\Event@get');
    
    Route::post('/invite/{event_id}', 'Api\Event@invite');
    Route::post('/invite/{event_id}/update', 'Api\Event@updateInvitation');

    Route::get('/couple/search', 'Api\Couple@search');
    Route::post('/couple/dismiss', 'Api\Couple@dismiss');

    Route::get('logout', 'Api\User@logout');
    
    Route::get('/posts', 'Api\Post@list');
    Route::post('/post', 'Api\Post@createPost');
    Route::post('/post/share', 'Api\Post@share');
    Route::get('my-posts', 'Api\Post@getMyPosts');
    Route::post('post/react/{post_id}', 'Api\Post@react');
    Route::post('post/unreact/{post_id}', 'Api\Post@unreact');
    Route::put('post/{post_id}', 'Api\Post@updatePost');
    Route::delete('post/{post_id}', 'Api\Post@removePost');

    Route::get('/notifications', 'Api\Notification@list');
    Route::post('/notifications/all', 'Api\Notification@markAllAsRead');
    Route::post('/notification/{id}', 'Api\Notification@markRead');
    Route::get('/notifications/count-unread', 'Api\Notification@countUnread');

    Route::post('/update-avatar', 'Api\User@updateAvatar');
    Route::post('user/{id}', 'Api\User@updateUser');
    
    Route::post('/cafe/image/{id}', 'Api\Cafe@handleImage');
    Route::get('/subscribers', 'Api\Event@listSubscribers');
    Route::get('/my-subscribers', 'Api\Event@getCurrentUserSubscribers');
    Route::delete('/subscribers/{id}', 'Api\Event@deleteSubscriber');

    Route::post('/verify-id-card', 'Api\User@storeIdCardInfo');
    Route::get('/verify-id-card', 'Api\User@getIdCardVerifyRecord');
    Route::put('/verify-id-card', 'Api\User@updateIdCardVerifyRecord');
    Route::get('/user/{id}/featured-photos', 'Api\User@getFeaturePhotos');
    Route::get('/user/photos/{type}', 'Api\User@getPhotosByType');
    Route::post('/user/featured-photos', 'Api\User@uploadFeaturedPhotos');
    Route::get('/user/configurations', 'Api\User@getUserConfiguration');
    Route::post('/user/configurations', 'Api\User@updateConfiguration');
    Route::post('/user/password', 'Api\User@updatePassword');
    // Route::post('user/upload-id-card', 'Api\User@uploadIdCardPhoto');
    Route::get('/product-categories/{type}', 'Api\Product@listCategories');
    Route::get('/products', 'Api\Product@listProducts');
    Route::get('/products/{id}', 'Api\Product@getProductDetail');
    Route::get('/cart', 'Api\Product@getCart');
    Route::post('/cart/add', 'Api\Product@addToCart');
    Route::put('/cart/{id}', 'Api\Product@updateCart');
    Route::delete('/cart/{id}', 'Api\Product@removeFromCart');
    Route::post('/checkout', 'Api\Product@checkout');
    Route::put('/wishlist', 'Api\Product@updateWishlist');
    Route::get('/wishlist', 'Api\Product@getWishlist');

    Route::get('/orders', 'Api\Product@getOrders');
    Route::get('/orders/{id}', 'Api\Product@getOrderDetail');

    Route::delete('/photos/{id}', 'Api\User@removeUserPhoto');
    Route::delete('/avatar/photo/{id}', 'Api\User@setAvatarFromPhoto');
    Route::get('/other-user/photos/{user_id}', 'Api\User@getOtherUserPhotos');
});


Route::post('profile/visitprofile', 'Api\User@visitProfile');



Route::get('/ethnicities', 'Api\User@getAllEthnicity');
Route::get('/religion', 'Api\User@getAllReligion');



Route::get('couple/view/{id}', function($id) {
    $results = \App\Http\Controllers\Api\Couple::findOne($id);
    return json_encode($results);
});

Route::get('/jobs', 'Api\Job@list');

Route::get('cafes', 'Api\Cafe@list');
Route::get('cafe/search', 'Api\Cafe@search');
Route::get('cafe/{id}', 'Api\Cafe@get');




