<?php


Route::get('getAllProvince', function() {
    $data = \App\ProvinceGroup::all_province();
    return $data;
});


Route::get('getAllDistrict', function() {
    $data = \App\ProvinceGroup::all_district();
    return $data;
});

