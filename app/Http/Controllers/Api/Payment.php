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
            'https://noiduyen.vn', "0977119830", 23245, '987623435849', 10000000
        );

        return $url;
    }

    public function verifyPayment(){
//        process here
        return redirect(\url('payment'));
    }
}
