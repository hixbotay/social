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
        $filter = isset($_GET['filter'])?$_GET['filter']:array();
        $type = isset($_GET['type'])?$_GET['type']:null;
        if (!$type){
            redirect('admin?view=Agency&type=1');
        }

        $items = DB::table('agency')
            ->where(function ($query) use ($filter, $type) {
                if (isset($filter['user_id']) && $filter['user_id']){
                    $query->where('agency.user_id', $filter['user_id']);
                }
                if (isset($filter['name']) && $filter['name']){
                    $query->where('agency.name', 'like', '%' . $filter['name'] .'%');
                }
                if ($type){
                    $query->where('agency.type', '=', $type);
                }
            })
            ->join('users', 'agency.user_id', '=', 'users.id')
            ->leftjoin('agency_photos', 'agency.id', '=', 'agency_photos.agency_id')
            ->select('agency.*', 'users.name AS username', 'agency_photos.source AS image')
            ->orderBy('agency.id', 'DESC')
            ->paginate(20);

        $items->withPath('admin?view=Agency');
        $users = User::getUserByGroup(12);
        return view('admin.agency.list', [
            'items' => $items,
            'users' => $users,
            'filter' => $filter
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $users = User::getUserByGroup(12);
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
            return redirect($url)->with('success', [__('admin.SAVE_SUCCESS')]);
        }else{
            return redirect($url)->withErrors(__('admin.SAVE_FAIL'));
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
        $users = User::getUserByGroup(12);
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
            return redirect($url)->with('success', [__('admin.SAVE_SUCCESS')]);
        }else{
            return redirect($url)->withErrors(__('admin.SAVE_FAIL'));
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
