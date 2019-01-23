<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Session;
use \App\User;

class FacebookAccountKitController extends Controller
{

    public function endpoint(Request $request)
    {
        $code = $request->get('code');
        $client = new Client();

        $url = "https://graph.accountkit.com/v1.2/access_token?grant_type=authorization_code&code="
            .$code."&access_token=AA|".env('FACEBOOK_APP_ID')."|".env("ACCOUNTKIT_APP_SECRET");

        $res = $client->get(rawurldecode($url));
        $data = json_decode($res->getBody());

        $url_1 = "https://graph.accountkit.com/v1.2/me/?access_token=".$data->access_token;
        $phone_data = json_decode($client->get(rawurldecode($url_1))->getBody());

        $user = json_decode(Session::get('newUser'));

        // find if user existed 
        $users = User::where('mobile', $phone_data->phone->national_number)->get();
        if(count($users)) {
            return redirect('/login')->withErrors('failed', 'Tài khoản đã tồn tại, vui lòng đăng nhập');
        }

        $user->mobile = $phone_data->phone->national_number;
        $user->is_phone_verified = 1;

        return view('auth.fbauth', compact("user"));
        // return view('auth.fbauth');
    }
}
