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
            'currency' => config('payment.vtc.currency'),
            'pay_number' => \BookproHelper::createPaymentNumber()
        );

//        return $paymentData;

        $order = PaymentModel::create($paymentData);

        $url = VTCPay::buildCheckoutUrl($order->pay_number, $order->total);

        return $url;
    }

    public function verifyPayment(Request $request){
//        process here

        $data = $request;

        $ketqua = VTCPay::verifyPayment($data);

        return $ketqua;

        $result = VTCPay::verifyPayment(
            $request->amount,
            config('payment.vtc.receiver_account'),
            $request->reference_number,
            config('payment.vtc.website_id'),
            config('payment.vtc.security_code'),
            $request->signature
        );

        return \GuzzleHttp\json_encode($result);

        return redirect(\url('payment'));
    }
}
