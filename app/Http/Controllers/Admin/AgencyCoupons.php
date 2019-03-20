<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Event;
use App\Agency;
use App\AgencyCoupons AS AgencyCouponsModel;

class AgencyCoupons extends Controller
{
    protected $table = 'agency_coupons';
    protected $fillable = [
        'from_time',
        'to_time',
        'product_id',
        'dating_type',
        'value',
        'unit',
        'params',
        'type',
        'agency_id'
    ];
    public $timestamps = true;

    public function index(){
        $agency = Agency::all();
        $items = AgencyCouponsModel::paginate(10);
        return view('admin.agencycoupons.list',[
            'items' => $items,
            'agencies' => $agency
        ]);
    }

    public function create(){
        $agency = Agency::all();
        return view('admin.agencycoupons.create', ['agencies' => $agency]);
    }

    public function store(Request $request){
        $data = $request->get('data');
        $data['from_time'] = date('Y-m-d H:i', strtotime($data['from_time']));
        $data['to_time'] = date('Y-m-d H:i', strtotime($data['to_time']));
        AgencyCouponsModel::create($data);
        return redirect('/admin?view=AgencyCoupons');
    }
}
