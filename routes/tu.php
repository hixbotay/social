<?php
use Illuminate\Http\Request;

Route::get('getAllProvince', function () {
    $data = \App\ProvinceGroup::all_province();
    return $data;
});

Route::get('getAllDistrict', function () {
    $data = \App\ProvinceGroup::all_district();
    return $data;
});

Route::get('getListCafe/{index}', function () {
    $limit = 10; // Tính sau
    $data = \App\Agency::all();
    return $data;
});

Route::get('getDetailCafe/{url}', function ($url) {
    $id = $url;
    //    get id from url, tinh sau
    $data = \App\Agency::find($id);
    return $data;
});



