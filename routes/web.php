<?php
use Illuminate\Http\Request;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes();
Route::get('/', function () {
	return view('welcome');
})->middleware('auth');
Route::get('/facebook/endpoint', 'FacebookAccountKitController@endpoint');

Route::any('debug', 'Debug@show');
Route::any('debug/{name}', 'Debug@execute');

Route::middleware(['guest'])->group(function() {
   
    Route::get('/alert', function() {
        return view('alert');
    });
    
    Route::get('/admin/login', 'Admin\Auth\LoginController@index');
    Route::post('/admin/login', 'Admin\Auth\LoginController@login')->name('admin');
    Route::get('auth/{provider}', 'Auth\LoginController@redirectToProvider');
	Route::get('auth/{provider}/callback', 'Auth\LoginController@handleProviderCallback');
    
});

Route::middleware(['web', 'auth'])->group(function() {
    Route::get('/registration', 'User@getRegistrationStep');

    Route::post('/update-information', 'User@update');
    Route::post('/update-ideal-person', 'User@updateIdealPerson');
    Route::post('/upload-avatar', 'User@uploadAvatar');
    Route::get('/payment/verify', 'Api\Payment@verifyPayment');
});

Route::middleware(['auth', 'agency'])->group(function() {
    Route::any('/admin/agency', 'Admin\Controller@execute');
});

Route::middleware(['admin', 'verify'])->group(function() {
    Route::get('/admin/logout', 'Admin\Auth\LoginController@logout');
    Route::any('/admin', 'Admin\Controller@execute');
    // Route::post('/admin', 'Admin\Controller@execute')->name('admin.post');
});

Route::middleware(['web', 'auth'])->group( function() {
    Route::view('{any}', 'layouts.app')
    ->where('any', '.*');
});

