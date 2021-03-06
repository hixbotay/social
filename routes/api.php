<?php

use Illuminate\Http\Request;


require 'tu.php';
require 'thu.php';

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

Route::middleware(['web'])->group(function() {
    Route::get('auth/user', 'Api\User@getCurrentUser');
    Route::get('user', 'Api\User@getCurrentUserDetail');
    Route::get('user/{id}', 'Api\User@getOtherUserDetail');
});


