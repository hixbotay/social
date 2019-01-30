<?php

namespace App\Http\Controllers\Admin;

use http\Url;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\UserGroup AS UserGroupModel;
use Validator;
use Illuminate\Support\Facades\Auth;


class UserGroup extends Controller
{
	public function __construct(){
	/*
		$this->user = Factory::getUser();
		if(!$this->user->role->is_admin){
			throw new Exception('None permission');
		}
	*/
	}
    public function index()
    {
        $currentUser = Auth::user();
        if ($currentUser->is_admin != 1){
            $this->authorize(config('auth.action.LIST_USER_GROUP'));
        }

        $data = UserGroupModel::all();
        return view('admin.usergroup.list', ['items' => $data]);
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
        return view('admin.usergroup.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $usergroup = request()->get('data');

        UserGroupModel::create($usergroup);
        return redirect('admin?view=UserGroup');
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
        return View::make('admin.usergroup.detail')
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
        $roles = config('auth.action');
        $groupROLE = json_decode($user->role);
        // show the view and pass the nerd to it
        return view('admin.usergroup.detail', ['item' => $user, 'roles' => $roles, 'groupROLE' => $groupROLE]);
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
        $data['role'] = json_encode($data['role']);
        $usergroup = UserGroupModel::find($id);
        foreach ($data as $key => $value) {
            $usergroup->$key = $value;
        }
        $result = $usergroup->save();

        $url = url('admin?view=usergroup&layout=edit&id='.$id);

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
        UserGroupModel::destroy($id);
        return redirect('admin?view=usergroup');
    }
}
