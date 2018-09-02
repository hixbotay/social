<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\App;

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
        \App\ProvinceGroup::create($data);
        return redirect('admin?view=ProvinceGroup');
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

        $data['province_ids'] = json_encode($data['province_ids']);

        $usergroup = \App\ProvinceGroup::find($id);
        foreach ($data as $key => $value) {
            $usergroup->$key = $value;
        }
        $usergroup->save();

        return redirect('admin?view=provincegroup');

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
