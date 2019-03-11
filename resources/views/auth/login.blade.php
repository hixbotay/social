@extends('layouts.auth')

@section('content')


    <form method="POST" action="{{ route('login') }}">
        {{ csrf_field() }}
        <input type="text" class="form-control" name='mobile' placeholder="Số điện thoại" required/>
        <input type="password" class="form-control"  name="password" placeholder="Mật khẩu" required/>
        <input type="hidden" name="remember" value="1" />
        @include('layouts.admin.notice')
        <div class="form-button">
            <button type="submit" class="ibtn">Đăng nhập</button> 
            <a href="{{
                "https://www.accountkit.com/v1.0/basic/dialog/sms_login/?app_id=".env('FACEBOOK_APP_ID').
                "&redirect=".env('ACCOUNTKIT_RESET_PASSWORD_REDIRECT_URL').
                "&state=".csrf_token().
                "&fbAppEventsEnabled=true"
            }}">
                Quên mật khẩu?
            </a>
        </div>
    </form>

@endsection
