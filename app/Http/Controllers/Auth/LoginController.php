<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Socialite;
use Session;
use URL;
use Illuminate\Support\Facades\Auth;
use App\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Cookie;
use Illuminate\Support\Facades\Log;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
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
        $this->middleware('guest')->except('logout');
    }

    //        cach 2
    public function authenticated(Request $request, $user)
    {
//        lam gi cung dc
        return redirect('/');
    }

    public function username()
    {
        return "mobile";
    }

    /**
    *  ghi đè phương thức để login bằng điện thoại
    */
    protected function credentials(Request $request)
    {
//        cach 1
//        \Session::put('url.intended','/');
        // if(is_numeric($request->get('email'))){
        //     return ['mobile'=>$request->get('email'),'password'=>$request->get('password')];
        // }
        // return $request->only($this->username(), 'password');
        $field = is_numeric($request->get($this->username()))
            ? $this->username()
            : 'mobile';

        return [
            $field => $request->get($this->username()),
            'password' => $request->password,
        ];
    }

    /**
     * Chuyển hướng người dùng sang OAuth Provider.
     *
     * @return Response
     */
    public function redirectToProvider($provider)
    {
        if(!Session::has('pre_url')){
            Session::put('pre_url', URL::previous());
        }else{
            if(URL::previous() != URL::to('/login')) Session::put('pre_url', URL::previous());
        }
        return Socialite::driver($provider)->redirect();
    }

    /**
     * Lấy thông tin từ Provider, kiểm tra nếu người dùng đã tồn tại trong CSDL
     * thì đăng nhập, ngược lại nếu chưa thì tạo người dùng mới trong SCDL.
     *
     * @return Response
     */
    public function handleProviderCallback($provider)
    {
        $user = Socialite::driver($provider)->user();

        $data = $this->findOrCreateUser($user, $provider);
        if(array_key_exists('user', $data)) {
            Auth::login($data['user'], true);
        }
        return redirect($data['path']);
    }

    /**
     * @param  $user Socialite user object
     * @param $provider Social auth provider
     * @return  User
     */
    public function findOrCreateUser($user, $provider)
    {
        $authUser = User::where('provider_id', $user->id)->first();
        if ($authUser) {
            return ['user' => $authUser, 'path' => '/'];
        }

        $newUser =  [
            'name'     => $user->name,
            'email'    => $user->email,
            'avatar' => $user->avatar,
            'password' => Hash::make($user->email),
            'is_verify' => 1,
            'is_facebook_verified' => ($provider == 'facebook') ? 1 : 0,
            'is_google_verified' => ($provider == 'google') ? 1 : 0,
            'provider' => $provider,
            'provider_id' => $user->id
        ];

        Session::put('newUser', json_encode($newUser));
        return ['path' => rawurldecode('https://www.accountkit.com/v1.0/basic/dialog/sms_login/?app_id='
            .env('FACEBOOK_APP_ID')
            .'&redirect='.env("ACCOUNTKIT_REDIRECT_URL")
            .'&state='.csrf_token()
            .'&fbAppEventsEnabled=true')];
    }
}
