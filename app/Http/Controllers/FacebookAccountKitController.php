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
        $user = null;
        $code = $request->get('code');
        $client = new Client();

        $url = "https://graph.accountkit.com/v1.2/access_token?grant_type=authorization_code&code="
            .$code."&access_token=AA|".env('FACEBOOK_APP_ID')."|".env("ACCOUNTKIT_APP_SECRET");

        $res = $client->get(rawurldecode($url));
        $data = json_decode($res->getBody());

        $url_1 = "https://graph.accountkit.com/v1.2/me/?access_token=".$data->access_token;
        $phone_data = json_decode($client->get(rawurldecode($url_1))->getBody());

        // find if user existed 
        $users = User::where('mobile', $phone_data->phone->national_number)->get();
        if(count($users)) {
            return redirect('/login')->withErrors(['failed' => 'Tài khoản đã tồn tại, vui lòng đăng nhập']);
        }

        $user = json_decode(Session::get('newUser'));
        if($user) {
            $user->mobile = $phone_data->phone->national_number;
            $user->is_phone_verified = 1;
            //  forget data in this session
            Session::forget('newUser');
        } else {
            $user = (object) [
                'mobile' => $phone_data->phone->national_number,
                'is_phone_verified' => 1
            ];
        }

        return view('auth.fbauth', compact("user"));
    }

    public function endpoint2(Request $request) {
        $user = null;
        $code = $request->get('code');
        $client = new Client();

        $url = "https://graph.accountkit.com/v1.2/access_token?grant_type=authorization_code&code="
            .$code."&access_token=AA|".env('FACEBOOK_APP_ID')."|".env("ACCOUNTKIT_APP_SECRET");

        $res = $client->get(rawurldecode($url));
        $data = json_decode($res->getBody());

        $url_1 = "https://graph.accountkit.com/v1.2/me/?access_token=".$data->access_token;
        $phone_data = json_decode($client->get(rawurldecode($url_1))->getBody());

        // find if user existed 
        $user = User::where('mobile', $phone_data->phone->national_number)->first();
        if(!$user) {
            return redirect('/register')->withErrors(['failed' => 'Bạn chưa có tài khoản, hãy đăng ký ngay!']);
        }

        return view('auth.reset', ['mobile' => $user->mobile]);
    }
}
