<?php

namespace App\Http\Controllers\Auth;

use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

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
    protected $redirectTo = '/registration?step=2';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
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
            'mobile' => 'required|numeric|unique:users',
            'gender' => ['required', Rule::in(['M', 'F'])],
            'marital_status' => ['required', Rule::in([0, 1])],
            'birthday' => 'required|date',
            'province_id' => 'required|numeric',
            'district_id' => 'required|numeric',
            'village_id' => 'required|numeric',
            'password' => 'required|string|min:6',
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
        // print_r($data);
        // return User::create([
        //     'name' => $data['name'],
        //     'mobile' => $data['mobile'],
        //     'gender' => $data['gender'],
        //     'marital_status' => $data['marital_status'],
        //     'birthday' => $data['birthday'],
        //     'province_id' => $data['province_id'],
        //     'district_id' => $data['district_id'],
        //     'village_id' => $data['village_id'],
        //     'password' => bcrypt($data['password']),
        // ]);
        $data['password'] = bcrypt($data['password']);
        
        return User::create($data);
    }
}
