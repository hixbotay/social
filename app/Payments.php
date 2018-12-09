<?php

namespace App;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Configuration;

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
        $vipData['status'] = $vip;
        $vipData['expire'] = $result[0]->to_time;

        return (object)$vipData;
    }

    public static function getItems($data){
        $filter = $data['filter'];
        $request = Request::capture();
        $items = DB::table('user_payments')
            ->where(function ($query) use ($filter) {
                if (isset($filter['user_id']) && $filter['user_id']){
                    $query->where('user_payments.user_id', '=', $filter['user_id']);
                }
                if (isset($filter['time_from']) && isset($filter['time_to']) && $filter['time_from'] && $filter['time_to']){
                    $query->where('user_payments.created_at', '>=', $filter['time_from']);
                    $query->where('user_payments.created_at', '<=', $filter['time_to']);
                }
                if (isset($filter['pay_status']) && $filter['pay_status'] != null){
                    $query->where('user_payments.pay_status', '=', $filter['pay_status']);
                }
                if (isset($filter['pay_type']) && $filter['pay_type'] != null){
                    $query->where('user_payments.pay_type', '=', $filter['pay_type']);
                }

            })
            ->join('users', 'user_payments.user_id', '=', 'users.id')
            ->select('user_payments.*', 'users.name')->orderBy('id', 'DESC')
            ->paginate(20);

        $dataURL = $request->query();
        unset($dataURL['page']);
        $items->withPath('admin?'.http_build_query($dataURL));
        return $items;
    }

    public static function getPriceConfig(){
        $price = Configuration::where('name', 'price')->first();
        $data = \GuzzleHttp\json_decode($price->params);
        return $data;
    }

}
