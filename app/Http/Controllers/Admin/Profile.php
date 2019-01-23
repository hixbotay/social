<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

use App\ProvinceGroup;
use App\User;
use Illuminate\Support\Facades\DB;


class Profile extends Controller
{
    public function index(){
        $current = Auth::user();
        $provinceGroup = ProvinceGroup::getListProvince();

        return view('admin.profile.detail', [
            'item' => $current,
            'province' => $provinceGroup
        ]);

    }

    public function update(Request $request){
        $id =  Auth::id();
        $user = User::find($id);
        $data = $request->get('data');

        if (isset($data['email'])) unset($data['email']);
        if (isset($data['mobile'])) unset($data['mobile']);

        foreach ($data as $key => $value) {
            $user->$key = $value;
        }
        $result = $user->save();
        if ($result)
        {
            $favourite = $request->get('favourite');

            $plans = array();
            $plans = array();
            if (!empty($favourite)){
                foreach ($favourite AS $value){
                    $plans[] = array(
                        'user_id' => $id,
                        'hobby_id' => $value
                    );
                }
            }

            DB::table('user_hobby_map')->insert( $plans );

            return redirect('admin?view=Profile')->with('success', [__('admin.SAVE_SUCCESS')]);
        }else{
            return redirect('admin?view=Profile')->withErrors(__('admin.SAVE_FAIL'));
        }
    }
}
