<?php

namespace App\Http\Controllers\Auth;

use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = '/';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    public function username()
    {
        return 'mobile';
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => 'required|string|max:255',
            // 'mobile' => 'required|numeric|unique:users',
            'gender' => ['required', Rule::in(['M', 'F'])],
            'marital_status' => ['required', Rule::in([0, 1])],
            'birthday' => 'required|date',
            'province_id' => 'required|numeric',
            'district_id' => 'required|numeric',
            'village_id' => 'required|numeric',
            // 'password' => 'required|string|min:6',
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\User
     */
    protected function create(array $data)
    {
        
        if(array_key_exists('q', $data)) {
            unset($data['q']);
        }

        $avatar = $data['avatar'];
        unset($data['avatar']);

        $data['password'] = Hash::make($data['password']);
        
        $user = User::create($data);

        // save avatar
        $extension = $avatar->getClientOriginalExtension();
        $filename = (string) time().uniqid().'.'.$extension;
        $path = 'storage/app/user'.$user->id.'/avatar/'.$filename;
        $avatar->storeAs('user'.$user->id.'/avatar', $filename);
        $user->avatar = $path;
        $user->save();
        \App\UserConfiguration::create([
            'user_id' => $user->id,
            'notify_receive_message' => 1,
            'notify_profile_visited' => 1,
            'notify_liked' => 1,
            'notify_loved' => 1
        ]);

        return $user;
        // return redirect('/');
    }

}
