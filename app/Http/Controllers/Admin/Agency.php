<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use App\Agency AS AgencyModel;
use Illuminate\Support\Facades\DB;


class Agency extends Controller
{
    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
    {
        $filterData = isset($_GET['filter'])?$_GET['filter']:array();

//        echo "<pre>";
//        print_r($filterData);
//        die;

        $items = DB::table('agency')
            ->join('users', 'agency.user_id', '=', 'users.id')
            ->leftjoin('agency_photos', 'agency.id', '=', 'agency_photos.agency_id')
            ->select('agency.*', 'users.name AS username', 'agency_photos.source AS image')
            ->orderBy('agency.id', 'DESC')
            ->paginate(20);

//        if (!empty($filterData)){
//            foreach ($filterData AS $key => $value):
//                if ($value)$items->orWhere('agency'.$key, 'like', '%' . DB::raw($value) . '%');
//            endforeach;
//        }

        $items->withPath('admin?view=Agency');
        $users = User::get_list_user_by_key(12);
        return view('admin.agency.list', [
            'items' => $items,
            'users' => $users,
            'filter' => $filterData
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $users = User::get_list_user_by_key(12);
        return view('admin.agency.create', ['users' => $users]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->get('data');

        $result = \App\Agency::create($data);

        $url = url('admin?view=Agency');

        if ($result->id){
            return redirect($url)->with('success', ['SAVE_SUCCESS']);
        }else{
            return redirect($url)->withErrors('SAVE_FAIL');
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $item = \App\Agency::find($id);
        $users = User::get_list_user_by_key(12);
        $village = \App\ProvinceGroup::getListVillageByDistrict($item->district_id);
        $district = \App\ProvinceGroup::getListDistrictByProvince($item->province_id);
//        echo "<pre>";
//        print_r($district);
//        die;
        return view('admin.agency.detail', [
            'item' => $item,
            'users' => $users,
            'district' => $district,
            'village' => $village
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $id =  $request->input('id');
        $item = \App\Agency::find($id);

        $data = $request->get('data');

        foreach ($data as $key => $value) {
            if ($value)$item->$key = $value;
        }
        $result = $item->save();
        $url = url('admin?view=Agency');

        if ($result){
            return redirect($url)->with('success', ['SAVE_SUCCESS']);
        }else{
            return redirect($url)->withErrors('SAVE_FAIL');
        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $id =  $request->input('id');
        PostModel::destroy($id);
        // redirect to previous url after destroy
        Session::put('pre_url', URL::previous());
        console_log(Session::get('pre_url'));
        return redirect(Session::get('pre_url'));
    }

    public function ajaxLoadDistrict(){
        $provinceID = $_POST['provinceID'];
        $data = DB::table('devvn_quanhuyen')->where('matp', $provinceID)->get();
        print_r(json_encode($data));
        die;
    }

    public function ajaxLoadVillage(){
        $district = $_POST['districtID'];
//        $data = \App\ProvinceGroup::getListVillageByDistrict($district);
        $data = DB::table('devvn_xaphuongthitran')->where('maqh', $district)->get();
//        print_r( response()->json($data) );
        print_r(json_encode($data));
        die;
    }
}
