<?php

namespace App\Http\Controllers\Api;

use App\Payments;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Libraries\Payments\VTCPay;
use App\Payments AS PaymentModel;
use Illuminate\Support\Facades\URL;
use App\User AS UserModel;
use App\Configuration;
use App\DatingFee;
use App\DatingPrice;

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
        $data = $request;
        $logged_id = Auth::id();
        if (!$logged_id){
            return redirect(URL());
        }

        $check = VTCPay::verifyPayment($data);

        $payment = PaymentModel::where('pay_number', $data->reference_number)
            ->first();

        if ($check == true && $payment->pay_status != 1){
           if ($data->status == 1){
               $user = UserModel::find($logged_id);
               $user->credit = $user->credit + $data->amount;
               $user->save();

               $params = array(
                   'amount' => $data->amount,
                   'message' => $data->message,
                   'payment_type' => $data->payment_type,
                   'reference_number' => $data->reference_number,
                   'status' => $data->status,
                   'trans_ref_no' => $data->trans_ref_no,
                   'website_id' => $data->website_id,
                   'signature' => $data->signature
               );

               $payment->pay_status = 1;
               $payment->tx_id = $data->trans_ref_no;
               $payment->params = \GuzzleHttp\json_encode($params);
               $payment->save();

           }
        }
        return redirect(URL('payment/history'));
    }


    public function getPriceConfig(){
        $price = array();
        $config = Configuration::select('params')->where('name', '=', 'price')->first();

//        get price of group dating and couple dating

        $datingPrice = DatingPrice::all();
        return $datingPrice;



        $price[''] = $config->params;
        return $config->params;
    }


}
