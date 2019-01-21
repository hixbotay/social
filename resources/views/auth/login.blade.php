@extends('layouts.auth')

@section('content')
    <div class="page-links">
        <a href="{{url('/')}}/login" class="active">Đăng nhập</a>
        <a href="{{url('/')}}/register">Đăng ký</a>
    </div>

    <form method="POST" action="{{ route('login') }}">
        {{ csrf_field() }}
        <input type="text" class="form-control" name='email' placeholder="Số điện thoại hoặc Email" required/>
        <input type="password" class="form-control"  name="password" placeholder="Mật khẩu" required/>
        <input type="hidden" name="remember" value="1" />
        @if ($errors->has('email'))
            <div class="alert alert-danger">
                {{ $errors->first('email') }}
            </div>
        @endif
        <div class="form-button">
            <button type="submit" class="ibtn">Đăng nhập</button> 
            <a href="{{ route('password.request') }}">Forget password?</a>
        </div>
    </form>

@endsection

{{-- @extends('layouts.landing')
@section('login-register-form')

<div>
    <div class="form-top">
        <div class="col-sm-offset-2 col-sm-12">
        <img src="{{env('APP_URL')}}/public/images/main/logo.png" id="logo-form">
        </div>
    </div>
    <div class="form-bottom">
        <form method="POST" action="{{ route('login') }}">
            {{ csrf_field() }}
            <div class="form-group">
                <input type="text" class="form-control" name='email' placeholder="Số điện thoại hoặc Email" required/>
                @if ($errors->has('email'))
                <span class="help-block">
                    <strong>{{ $errors->first('email') }}</strong>
                </span>
                @endif
            </div>
            <div class="form-group">
                <input type="password" class="form-control"  name="password" placeholder="Mật khẩu" required/>
                @if ($errors->has('password'))
                <span class="help-block">
                    <strong>{{ $errors->first('password') }}</strong>
                </span>
                @endif
            </div>
            <div class="form-group">
                <button type="submit" class="btn">ĐĂNG NHẬP</button>
            </div>
            <div class="col-sm-offset-2">
                <div class="text-center">hoặc</div>
                <div class="form-group">
                    <div class="social-login-buttons text-center">
                        <a class="btn btn-link-1 btn-link-1-facebook" href="auth/facebook">
                            <i class="fa fa-facebook"></i> Facebook
                        </a>
                        <a class="btn btn-link-1 btn-link-1-google-plus" href="auth/google">
                            <i class="fa fa-google-plus"></i> Google Plus
                        </a>
                        <a class="btn btn-link" href="{{ route('password.request') }}">
                            Forgot Your Password?
                        </a>
                        
                    </div>
                    
                    <div class="text-center">
                        <small>Bạn chưa có tài khoản? <a href="/register">Đăng ký ngay!</a></small>
                    </div>
                    
                </div>
            </div>

            <input type="hidden" name="remember" value="1" />

        </form>
    </div>
</div>

@endsection --}}