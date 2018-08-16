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

Route::middleware(['guest'])->group(function() {
    Route::get('/', function () {
        return view('welcome');
    });
    Route::get('/admin/login', 'Admin\Auth\LoginController@index');
    Route::post('/admin/login', 'Admin\Auth\LoginController@login')->name('admin');
    Route::any('debug', 'Debug@show');
    Route::any('debug/{name}', 'Debug@execute');
});

Route::middleware(['auth'])->group(function() {
    Route::get('/home', 'HomeController@index')->name('home');
});

Route::middleware(['admin'])->group(function() {
    Route::get('/admin', 'Admin\Controller@execute');
    Route::post('/admin', 'Admin\Controller@execute')->name('admin.post');
});
