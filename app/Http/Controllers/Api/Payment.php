<?php

namespace App\Http\Controllers\Api;

use App\Payments;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Libraries\Payments\VTCPay;
use App\Payments AS PaymentModel;
use Illuminate\Support\Facades\URL;

class Payment extends Controller
{
    //
    public function returnPayment(){
        echo "ok";
        die;
    }

    public function requestUrl(Request $request) {

        return $request->getContent();

        $logged_id = Auth::id();
        if (!$logged_id){
            return false;
        }

        $paymentData = array(
            'user_id' => $logged_id,
            'total' => 12323,
            'type' => 'CHARGE',
            'pay_status' => 0,
        );

        $order = PaymentModel::saved($paymentData);

        return $order;

        $url = VTCPay::buildCheckoutUrl(
            '12wawegawegwe53543e', 'wegaw4t43t34t', '21232434'
        );

        return $url;
    }

    public function verifyPayment(){
//        process here
        return redirect(\url('payment'));
    }
}
