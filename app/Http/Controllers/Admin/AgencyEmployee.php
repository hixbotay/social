<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use App\Agency;
use App\AgencyEmployee AS AgencyEmployeeModel;

class AgencyEmployee extends Controller
{
    public function index(){


        $filter = isset($_GET['filter'])?$_GET['filter']:array();
        $items = AgencyEmployeeModel::select("agency_employee.agency_id", "agency_employee.user_id")
            ->select('users.name AS employee_name', 'agency.name AS agency_name')
            ->leftjoin('users', 'users.id', '=', 'agency_employee.user_id')
            ->leftjoin('agency', 'agency.id', '=', 'agency_employee.agency_id')
            ->where(function ($query) use ($filter){
                if (isset($filter['agency_id']) && $filter['agency_id']){
                    $query->where('agency_employee.agency_id', '=', $filter['agency_id']);
                }
            })
            ->paginate(20);

        $agency = Agency::all();
        return view('admin.agencyemployee.list', [
            'items' => $items,
            'agencies' => $agency,
            'filter' => $filter
        ]);
    }
}
