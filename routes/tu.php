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
    Route::get('chat/message/load/{conversation_id}', 'Api\Chat@loadConversation');
    Route::get('chat/hello', 'Api\Chat@hello');
    Route::post('chat/conversation/create', 'Api\Chat@createConversation');

    Route::post('payment/getresult', 'Api\Payment@returnPayment');
    Route::post('payment/request', 'Api\Payment@requestUrl');
    Route::get('payment/getprice', 'Api\Payment@getPriceConfig');

});


Route::get('testsocket', function (Request $request){

    $context = stream_context_create([
        'ssl' => [
            'verify_peer' => false,
            'verify_peer_name' => false
        ]
    ]);

    $hostname = "tls://chat.noiduyen.vn:80";
    $socket = stream_socket_client($hostname, $errno, $errstr, ini_get("default_socket_timeout"), STREAM_CLIENT_CONNECT, $context);
    $result = fwrite($socket, 'notify');
    fwrite($socket, 'notify'."\r\n");
    return fread($socket, 4096)."\n";

    return $data;

});

