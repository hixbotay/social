<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Libraries\Payments\VTCPay;
use Illuminate\Support\Facades\URL;

class Payment extends Controller
{
    //
    public function returnPayment(){
        echo "ok";
        die;
    }

    public function requestUrl() {
        $logged_id = Auth::id();
        if (!$logged_id){
            return false;
        }

        $url = VTCPay::buildCheckoutUrl(
            'https://noiduyen.vn', 123134534, 23245, 'order_code', 10000000
        );



        return $url;
    }
}
