<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class Configuration extends Controller
{
    public function __construct(){
    }

    private $type = [
        'general', 'seo', 'price'
    ];

    public function index()
    {
        $request = Request::capture();
        $option = $request->get('option');

        if (!in_array($option, $this->type)){
            die("ahihi");
        }

        $item = \App\Configuration::where('name', "$option")->first();

        $view = view('admin.configuration.'.$option, ['name' => $item['name'], 'params' => json_decode($item['params'])]);
        return $view;
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
        return view('admin.provincegroup.create');
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

        $data['params'] = json_encode($data['params']);

        $item = \App\Configuration::where('name', "{$data['name']}")->first();

        if (!$item) {
            $result = \App\Configuration::create($data);
        }else{
            foreach ($data as $key => $value) {
                $item->$key = $value;
            }
            $item->save();

        }

        return redirect('admin?view=configuration&option='.$data['name']);
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

        $user = UserGroupModel::find($id);

        // show the view and pass the nerd to it
        return view('admin.provincegroup.detail')->with('item', $user);
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

        $usergroup = UserGroupModel::find($id);
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
