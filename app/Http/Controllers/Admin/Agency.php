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

    protected $type;

    public function __construct()
    {
        $this->type = config('agency.type');
    }

    public function index()
    {
        $filter = isset($_GET['filter'])?$_GET['filter']:array();
        $type = isset($_GET['type'])?$_GET['type']:null;
        $title = __('admin.agency_type_'.$type);
        if (!$type || (!in_array($type, $this->type))){
            return redirect('admin?view=Agency&type=1');
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
        $users = User::getUserByGroup(config('auth.usergroup.agency'));
        return view('admin.agency.list', [
            'items' => $items,
            'users' => $users,
            'filter' => $filter,
            'title' => $title,
            'type' => $type
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $type = isset($_GET['type'])?$_GET['type']:null;
        if (!$type || (!in_array($type, $this->type))){
            return redirect('admin?controller=Agency&task=create&type=1');
        }
        $users = User::getUserByGroup(config('auth.usergroup.agency'));
        return view('admin.agency.create', [
            'users' => $users,
            'type' => $type
        ]);
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

        $result = AgencyModel::create($data);

        $url = url('admin?view=Agency&type='.$data['type']);

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
        $users = User::getUserByGroup(config('auth.usergroup.agency'));
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
        $item = AgencyModel::find($id);
        $data = $request->get('data');
        $url = url('admin?view=Agency&type='.$data['type']);
        if (!$item->id)
            return redirect($url)->withErrors(__('admin.SAVE_FAIL'));
        foreach ($data as $key => $value) {
            if ($value)$item->$key = $value;
        }
        $result = $item->save();

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
        $id = $request->input('id');
        $result = AgencyModel::destroy($id);
        $type = isset($_GET['type'])?$_GET['type']:null;
        $url = 'admin?view=Agency&type='.$type;
        if (!$result)
            return redirect($url)->withErrors(__('admin.SAVE_FAIL'));
        return redirect($url)->with('success', [__('admin.SAVE_SUCCESS')]);
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
