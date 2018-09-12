<?php

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

Route::middleware(['auth', 'verify'])->group(function() {
    Route::get('/home', 'HomeController@index')->name('home');
    
});

Route::middleware(['admin', 'verify'])->group(function() {
    Route::any('/admin', 'Admin\Controller@execute');
    // Route::post('/admin', 'Admin\Controller@execute')->name('admin.post');
});

Route::view('{any}', 'layouts.app')
    ->where('any', '.*');