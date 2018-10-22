@extends('layouts.landing')

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
                    <!-- </div> -->
                    <div class="text-center">
                        <small>Bạn chưa có tài khoản? <a href="/register">Đăng ký ngay!</a></small>
                    </div>
                    
                </div>
            </div>

            {{--VANTU--}}

            <input type="hidden" name="remember" value="1" />

            {{--END VANTU--}}

        </form>
    </div>
</div>

@endsection


{{-- @section('content')
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">Login</div>

                <div class="panel-body">
                    <form class="form-horizontal" method="POST" action="{{ route('login') }}">
                        {{ csrf_field() }}

                        <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
                            <label for="email" class="col-md-4 control-label">E-Mail Address</label>

                            <div class="col-md-6">
                                <input id="email" type="email" class="form-control" name="email" value="{{ old('email') }}" required autofocus>

                                @if ($errors->has('email'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('email') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">
                            <label for="password" class="col-md-4 control-label">Password</label>

                            <div class="col-md-6">
                                <input id="password" type="password" class="form-control" name="password" required>

                                @if ($errors->has('password'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('password') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <div class="checkbox">
                                    <label>
                                        <input type="checkbox" name="remember" {{ old('remember') ? 'checked' : '' }}> Remember Me
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-8 col-md-offset-4">
                                <button type="submit" class="btn btn-primary">
                                    Login
                                </button>

                                <button type="button" class="btn btn-primary">
                                    <a href="auth/google">Login with Google</a>
                                </button>

                                <a class="btn btn-link" href="{{ route('password.request') }}">
                                    Forgot Your Password?
                                </a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
 --}}