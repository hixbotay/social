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

        $data = $request->getContent();
        $data = json_decode($data);

        $logged_id = Auth::id();
        if (!$logged_id){
            return false;
        }

        $paymentData = array(
            'user_id' => $logged_id,
            'total' => $data->amount,
            'pay_type' => 'CHARGE',
            'pay_status' => 0,
            'pay_number' => \BookproHelper::createPaymentNumber()
        );

//        return $paymentData;

        $order = PaymentModel::create($paymentData);

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
