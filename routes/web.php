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

<<<<<<< HEAD
Route::middleware(['auth'])->group(function() {
    Route::get('/home', 'HomeController@index')->name('home');
});
=======
Auth::routes();
Route::any('debug', 'Debug@show');
Route::any('debug/{name}', 'Debug@execute');
>>>>>>> bcfc43ec857c6a5cea610b4c0316b025a28968d8

Route::middleware(['admin'])->group(function() {
    Route::get('/admin', 'Admin\Controller@execute');
});

<<<<<<< HEAD
// Auth::routes();

// Route::get('/home', 'HomeController@index')->name('home');

// Auth::routes();

=======
Route::get('/admin', 'Admin\Controller@execute')->name('admin');
Route::post('/admin', 'Admin\Controller@execute')->name('admin.post');
Route::get('/admin/login', 'Admin\Auth\LoginController@showLoginForm')->name('admin.login');
Route::post('/admin/login', 'Admin\Auth\LoginController@login')->name('admin.login.submit');
Route::post('/logout', 'Admin\Auth\LoginController@logout')->name('admin.logout');
Route::get('/password/reset', 'Admin\Auth\ForgotPasswordController@showLinkRequestForm')->name('admin.password.request');
Route::post('/password/email', 'Admin\Auth\ForgotPasswordController@sendResetLinkEmail')->name('admin.password.email');
Route::get('/password/reset/{token}', 'Admin\Auth\ResetPasswordController@showResetForm')->name('admin.password.reset');
Route::post('/password/reset', 'Admin\Auth\ResetPasswordController@reset');

// Auth::routes();

// Route::get('/home', 'HomeController@index')->name('home');

// Auth::routes();

>>>>>>> bcfc43ec857c6a5cea610b4c0316b025a28968d8
// Route::get('/home', 'HomeController@index')->name('home');
