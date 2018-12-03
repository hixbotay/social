<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\DB;
use League\Flysystem\Exception;


class ProvinceGroup extends Controller
{
    public function __construct(){
    }
    public function index()
    {
        $items = \App\ProvinceGroup::all();
        return view('admin.provincegroup.list', ['items' => $items]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */

    private $rule = [
        'name'=>'required|max:30',
    ];

    public function create()
    {
        $class = new \App\ProvinceGroup();
        $province = $class->get_list_province();
        $existProvince = \App\ProvinceGroup::all();
        $result = array();
        foreach ($existProvince AS $value){
            $data = json_decode($value->province_ids);
            $result = array_merge($result, $data);
        }

        if (!empty($result)){
            foreach ($result AS $value){
                foreach ($province AS $key => $val){
                    if ($val->matp == $value){
                        unset($province[$key]);
                    }
                }
            }
        }

        return view('admin.provincegroup.create', ['province' => $province]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = request()->get('data');
        $listProvince = $data['province_ids'];
        $data['province_ids'] = json_encode($data['province_ids']);
        $result = \App\ProvinceGroup::create($data);
        $url = url('admin?view=ProvinceGroup');

        if ($result->id){

            foreach ($listProvince AS $value) {
                DB::table('province_groups_map')
                    ->insert([
                        'province_group_id'=>$result->id,
                        'province_id'=>$value,
                        'created_at' => date('Y-m-d H:i:s'),
                        'updated_at' => date('Y-m-d H:i:s'),
                    ]);
            }

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
        $user = UserGroupModel::find($id);

        // show the view and pass the nerd to it
        return View::make('admin.provincegroup.detail')
            ->with('item', $user);
    }



    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        // $id = request()->input('id');

        $user = \App\ProvinceGroup::find($id);

        $class = new \App\ProvinceGroup();
        $province = $class->get_list_province();
        $existProvince = \App\ProvinceGroup::all();
        $result = array();

        foreach ($existProvince AS $value){
            if ($value->id != $id){
                $data = json_decode($value->province_ids);
                $result = array_merge($result, $data);
            }
        }

        if (!empty($result)){
            foreach ($result AS $value){
                foreach ($province AS $key => $val){
                    if ($val->matp == $value){
                        unset($province[$key]);
                    }
                }
            }
        }

        // show the view and pass the nerd to it
        return view('admin.provincegroup.detail', ['item' => $user, 'province' => $province]);
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
        $id = $request->input('id');
        $data = $request->get('data');

        $listProvince = $data['province_ids'];

        $data['province_ids'] = json_encode($listProvince);

        $usergroup = \App\ProvinceGroup::find($id);
        foreach ($data as $key => $value) {
            $usergroup->$key = $value;
        }
        $url = url('admin?view=provincegroup&layout=edit&id='.$id);
        $result = $usergroup->save();

        if ($result){

            try{
                DB::table('province_groups_map')
                    ->where('province_group_id', '=', $id)
                    ->delete();

                foreach ($listProvince AS $value) {
                    DB::table('province_groups_map')
                        ->insert([
                            'province_group_id'=>$id,
                            'province_id'=>$value,
                            'created_at' => date('Y-m-d H:i:s'),
                            'updated_at' => date('Y-m-d H:i:s'),
                        ]);
                }

            }catch (Exception $exception){

            }

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
        $id = $request->input('id');
        UserGroupModel::destroy($id);
        return redirect('admin?view=usergroup');
    }
}
