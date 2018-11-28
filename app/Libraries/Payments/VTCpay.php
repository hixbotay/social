<?php

namespace App\Libraries\Payments;

class VTCPay
{

    protected static $securityCode = "izW5yYUkplywaHiS2CZoFA2D1dYfunxe2be3l7LI";
    protected static $websiteId = 84180;

//http://alpha1.vtcpay.vn/portalgateway/checkout.html?website_id=83178&reference_number=330760&receiver_account=0963465816&url_return=http%3A%2F%2Fthaipart.webike.vn%2F%3Fwc-api%3Dwc_gateway_vtcpay&bill_to_phone=3902435439634958&payment_type=&language=vi&amount=13601014&currency=VND&signature=F9DAA36E1CC0DA8335BE9C45BE3DD22AEEAA65B13D8C26F19727580BDE233B84


    //Hàm xây dựng url
    public static function buildCheckoutUrl($reference_number, $order_code, $amount)
    {
        $websiteid = self::$websiteId;
        $secret_key = self::$securityCode;
        // Mảng các tham số chuyển tới VTC Pay
        $arr_param = array(
            'url_return'		=>	strtolower(urlencode(config('payment.vtc.url_return'))),
            'receiver_account'	=>	strval(config('payment.vtc.receiver_account')),
            'reference_number'	=>	strval($reference_number),
            'order_code'		=>	strval($order_code),
            'amount'			=>	strval($amount),

        );
        $currency = 1;
        $vtcpay_url  = "http://alpha1.vtcpay.vn/portalgateway/checkout.html";
//        $vtcpay_url  = "http://sandbox1.vtcebank.vn/pay.vtc.vn/gate/checkout.html";
        $plaintext = $websiteid . "|" . $currency . "|" . $arr_param['order_code'] . "|" . $arr_param['amount'] . "|" . $arr_param['receiver_account'] . "|" . "|" . $secret_key;

        $plaintext = $amount. "|VND" ."|".$arr_param['receiver_account']."|".$reference_number."|".$websiteid."|".$secret_key;

        $sign = strtoupper(hash('sha256', $plaintext));
        $data = "?website_id=" . $websiteid
            . "&reference_number=" . $reference_number
            . "&receiver_account=" . $arr_param['receiver_account']
//            . "&bill_to_phone=" .  '0977119830'
//            . "&url_return=".$arr_param['url_return']
//            . "&language=vi"
            . "&amount=" . $amount
            . "&amp;currency=VND";
        $data = $data . "&signature=" . $sign;
        $destinationUrl = $vtcpay_url . $data;
        $destinationUrl = str_replace("%3a",":",$destinationUrl);
        $destinationUrl = str_replace("%2f","/",$destinationUrl);
        return $destinationUrl;
    }


    public static function verifyPayment(){
        return 1;
    }

    /*Hàm thực hiện xác minh tính đúng đắn của các tham số trả về từ VTC Pay*/

    public function verifyPaymentUrl($status, $order_code, $amount, $website_id, $sign)
    {
        // My plaintext
        $secret_key = $this->securityCode;
        $plaintext = $status . "-" . $website_id . "-" . $order_code . "-" . $amount . "-" . $secret_key;
        //print $plaintext;
        // Mã hóa sign
        $verify_secure_code = '';
        $verify_secure_code = strtoupper(hash('sha256', $plaintext));;
        // Xác thực chữ ký của chủ web với chữ ký trả về từ VTC Pay
        if ($verify_secure_code === $sign) 		return strval($status);

        return false;
    }


}
?>