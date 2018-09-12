<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('articles', function() {
    // If the Content-Type and Accept headers are set to 'application/json',
    // this will return a JSON structure. This will be cleaned up later.
    die("111");
});

Route::get('country', function (Request $request){
    $result = \App\ProvinceGroup::all_province();
    return $result;
});

Route::get('user/{id}', function ($id){
    // die($id);
    $result = \App\User::get($id);
    return ($result);
});

Route::get('/post', function () {
    return \App\Post::list();
});