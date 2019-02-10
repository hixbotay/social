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
use Illuminate\Http\Request;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Auth;
use DateTime;

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
        
        $avatar = null;
        if(array_key_exists('avatar', $data)) {
            $avatar = $data['avatar'];
            unset($data['avatar']);
        }
        
        $data['password'] = Hash::make($data['password']);
        // $data['birthday'] = DateTime::createFromFormat('d/m/Y', $data['birthday'])->format('Y-m-d');
        
        // remove null fields
        $data = array_filter($data);

        $user = User::create($data);

        // save avatar
        // can luu user truoc de lay duoc user_id 
        if(is_file($avatar)) {
            $extension = $avatar->getClientOriginalExtension();
            $filename = (string) time().uniqid().'.'.$extension;
            $path = 'storage/app/user'.$user->id.'/avatar/'.$filename;
            $avatar->storeAs('user'.$user->id.'/avatar', $filename);
            $user->avatar = $path;
            $user->save();
        } else if(is_string($avatar)) {
            $user->avatar = $avatar;
            $user->save();
        }
        
        \App\UserConfiguration::create([
            'user_id' => $user->id,
            'notify_receive_message' => 1,
            'notify_profile_visited' => 1,
            'notify_liked' => 1,
            'notify_loved' => 1
        ]);

        return $user;
    }

    public function register(Request $request)
    {
        // $this->validator($request->all())->validate();

        event(new Registered($user = $this->create($request->all())));

        Auth::loginUsingId($user->id, TRUE);

        return $this->registered($request, $user)
                        ? : redirect($this->redirectPath());
    }
}
