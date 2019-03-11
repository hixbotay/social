@extends('layouts.auth')

@section('content')


    <form method="POST" action="{{ route('login') }}" class="form-horizontal">
        {{ csrf_field() }}
        <div class="form-group">
            <input type="text" class="form-control" name='mobile' placeholder="Số điện thoại" required/>
        </div>
        <div class="form-group">
            <input type="password" class="form-control"  name="password" placeholder="Mật khẩu" required/>
        </div>
        <input type="hidden" name="remember" value="1" />
        @include('layouts.admin.notice')
        <div class="form-button">
            <button type="submit" class="ibtn btn btn-primary">Đăng nhập</button>
            <a class="c-text" href="{{
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
