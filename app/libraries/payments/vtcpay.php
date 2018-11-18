<?php


class VTCPay_Checkout
{

    protected $securityCode = "RMdEwvuWUvYcMewczVB0SVT78SzdxacNZUtcKHyc";
    protected $websiteId = 6606;

    //Hàm xây dựng url
    public function buildCheckoutUrl($return_url, $receiver, $transaction_info, $order_code, $amount)
    {
        $websiteid = $this->websiteId;
        $secret_key = $this->securityCode;
        // Mảng các tham số chuyển tới VTC Pay
        $arr_param = array(
            'return_url'		=>	strtolower(urlencode($return_url)),
            'receiver'			=>	strval($receiver),
            'transaction_info'	=>	strval($transaction_info),
            'order_code'		=>	strval($order_code),
            'amount'			=>	strval($amount)
        );
        $currency = 1;
        $vtcpay_url  = "http://sandbox1.vtcebank.vn/pay.vtc.vn/gate/checkout.html";
        $plaintext = $websiteid . "-" . $currency . "-" . $arr_param['order_code'] . "-" . $arr_param['amount'] . "-" . $arr_param['receiver'] . "-" . "-" . $secret_key;
        $sign = strtoupper(hash('sha256', $plaintext));
        $data = "?website_id=" . $websiteid
            . "&payment_method=" . $currency
            . "&order_code=" . $arr_param['order_code']
            . "&amount=" . $arr_param['amount']
            . "&receiver_acc=" .  $arr_param['receiver'];
        $customer_name = "";
        $customer_mobile = "";
        $data = $data . "&customer_name=" . $customer_name. "&customer_mobile=" . $customer_mobile . "&order_des=" . $arr_param['transaction_info'] . "&sign=" . $sign;
        $destinationUrl = $vtcpay_url . $data;
        $destinationUrl = str_replace("%3a",":",$destinationUrl);
        $destinationUrl = str_replace("%2f","/",$destinationUrl);
        return $destinationUrl;
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