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

Route::get('cafes', 'Api\Cafe@list');
Route::get('cafe/{id}', 'Api\Cafe@get');

