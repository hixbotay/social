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
        return redirect('/couple');
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

        $mobile = $request->get($this->username());
        if($mobile[0] == '0') {
            $mobile = substr($mobile, 1);
        }

        $field = is_numeric($request->get($this->username()))
            ? $this->username()
            : 'mobile';

        return [
            $field => $mobile,
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
        $success = false;
        if(array_key_exists('user', $data)) {
            $success = Auth::login($data['user'], TRUE);
        }

        if($success) {
            return redirect($data['path']);
        } else {
            return redirect('/login')->withErrors(['failed' => 'Đã có lỗi xảy ra, vui lòng thử lại']);
        }
        
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
            'avatar' => $user->avatar_original,
            'is_verify' => 1,
            'is_facebook_verified' => ($provider == 'facebook') ? 1 : 0,
            'is_gmail_verified' => ($provider == 'google') ? 1 : 0,
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

    public function resetPassword(Request $request) {
        $user = User::where('mobile', $request->get('mobile'))->first();
        if(!$user) return redirect()->back()->withErrors(['failed' => "Người dùng không tồn tại!"]);
        // compare password
        $password = $request->get('password');
        $retypePassword = $request->get('retype_password');
        if(strcmp($password, $retypePassword) == 0) {
            $user->password = Hash::make($password); 
            return view('auth.password_success');
        } else {
            return redirect()->back()->withErrors(['failed' => "Mật khẩu nhập lại không khớp!"]);
        }
    }
}
