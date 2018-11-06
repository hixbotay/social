<?php
use Illuminate\Http\Request;

Route::get('provinces', function () {
    $data = \App\ProvinceGroup::all_province();
    return $data;
});

Route::get('districts/{province_id}', function ($province_id) {
    $data = \App\ProvinceGroup::all_district($province_id);
    return $data;
});

Route::get('communes/{district_id}', function ($district_id){
    $data = \App\ProvinceGroup::all_commune($district_id);
    return $data;
});

Route::middleware(['web'])->group(function() {
    Route::post('cafe/create', 'Api\Cafe@create');
});

Route::post('chat/auth', function (Request $request){

});

Route::get('chat/session', function (Request $request){
//    laravel_session
    return Session::getId();
});
Route::middleware(['web'])->group(function() {
    Route::get('chat/list', 'Api\Chat@listChat');
});

Route::get('chat/hello', 'Api\Chat@hello');
Route::post('chat/conversation/create', 'Api\Chat@createConversation');
