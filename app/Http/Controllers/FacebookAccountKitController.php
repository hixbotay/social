<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FacebookAccountKitController extends Controller
{

    public function endpoint(Request $request)
    {
        $code = $request->get('code');
        $url = "https://graph.accountkit.com/v1.2/access_token?grant_type=authorization_code&code="
            .$code."&access_token=AA|".env('FACEBOOK_APP_ID')."|".env("FACEBOOK_APP_SECRET");
        $get = json_decode(file_get_contents($url),true);

        $url_1 = "https://graph.accountkit.com/v1.2/me/?access_token=".$get['access_token'];
        $data = json_decode(file_get_contents($url_1),true);

        return view('auth.fbauth', compact("data"));
    }
}
