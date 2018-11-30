<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use phpDocumentor\Reflection\Types\Object_;

class Payments extends Model
{
    protected $table = 'user_payments';
    protected $fillable = [
        'user_id',
        'total',
        'tx_id', 'pay_type',
        'pay_status',
        'params',
        'from_time',
        'to_time',
        'to_user',
        'currency',
        'pay_number'
    ];

    public static function checkVIP($id){

        $now = date("Y-m-d H:i:s");

        $result = Payments::where('pay_type', 'VIP')->where('pay_status', 1)
            ->where(function($query) use ($now) {
                $query->orWhere(function($query) use ($now) {
                    $query->where('from_time', '<=', $now);
                    $query->where('to_time', '>=', $now);
                });
                $query->orWhere(function($query) use ($now) {
                    $query->orWhere('from_time', '>=', $now);
                });
            })
            ->where('user_id', '=', $id)
            ->orderBy('to_time', 'DESC')
            ->get();

        $vip = false;
        foreach ($result AS $value){

            $from = new \DateTime($value->from_time);
            $to = new \DateTime($value->to_time);
            $current = new \DateTime($now);
            if ($from <= $current && $current <= $to) {
                $vip = true;
                break;
            }

        }

        $vipData = array();
        $vipData['vip'] = $vip;
        $vipData['expire'] = $result[0]->to_time;

        return (object)$vipData;

    }

}
