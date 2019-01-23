@extends('layouts.auth')

@section('content')

    <div class="page-links">
        <a href="{{url('/')}}/login">Đăng nhập</a>
        <a href="{{url('/')}}/register" class="active">Đăng ký</a>
    </div>
    <form method="GET" action="https://www.accountkit.com/v1.0/basic/dialog/sms_login/">
        <input type="hidden" name="app_id" value="{{env('FACEBOOK_APP_ID')}}">
        <input type="hidden" name="redirect" value="{{env("ACCOUNTKIT_REDIRECT_URL")}}">
        <input type="hidden" name="state" value="{{csrf_token()}}">
		<input type="hidden" name="fbAppEventsEnabled" value=true>
        <div class="form-button text-center">
            <button type="submit" class="ibtn">Đăng ký tài khoản mới qua số điện thoại</button>
        </div>
    </form>

@endsection
