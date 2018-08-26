@extends('layouts.landing')

@section('login-register-form')

<div>
    <div class="form-top">
        <div class="col-sm-offset-2 col-sm-12">
            <img src="{{asset('assets/landing/img/logo.png')}}" id="logo-form">
        </div>
    </div>
    <div class="form-bottom">
        <form>
            <div class="form-group">
                <input type="text" class="form-control" placeholder="Tên của bạn" />
            </div>      
            <div class="form-group row">
                <div class="col-sm-4">
                    <select class="form-control">
                        <option>Ngày</option>
                        @for($i=1; $i<=31; $i++)
                        <option value="{{$i}}">{{$i}}</option>
                        @endfor
                    </select>
                </div>
                <div class="col-sm-4">
                    <select class="form-control">
                        <option>Tháng</option>
                        @for($i=1; $i<=12; $i++)
                        <option value="{{$i}}">{{$i}}</option>
                        @endfor
                    </select>
                </div>
                <div class="col-sm-4">
                    <select class="form-control">
                        <option>Năm</option>
                        @for($i=2000; $i>=1950; $i--)
                        <option value="{{$i}}">{{$i}}</option>
                        @endfor
                    </select>
                </div>
            </div>
            <div class="form-group row">
                <div class="col-sm-7">
                    <select class="form-control">
                        <option>Tình trạng hôn nhân</option>
                    </select>
                </div>
                <div class="col-sm-5">
                    <select class="form-control">
                        <option>Giới tính</option>
                    </select>
                </div>
            </div>
            <div class="form-group row">
                <div class="col-sm-4">
                    <select class="form-control">
                        <option>Xã/Phường</option>
                    </select>
                </div>
                <div class="col-sm-4">
                    <select class="form-control">
                        <option>Huyện/Quận</option>
                    </select>
                </div>
                <div class="col-sm-4">
                    <select class="form-control">
                        <option>Tỉnh/TP</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <input type="number" class="form-control" placeholder="Số điện thoại" />
            </div>
            <div class="form-group">
                <input type="password" class="form-control" placeholder="Mật khẩu" />
            </div>
            <div class="form-group">
                <button type="submit" class="btn">ĐĂNG KÝ</button>
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
                    </div>
                    <!-- </div> -->
                </div>
            </div>

        </form>
    </div>
</div>

@endsection

{{-- @section('content')
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">Register</div>

                <div class="panel-body">
                    <form class="form-horizontal" method="POST" action="{{ route('register') }}">
                        {{ csrf_field() }}

                        <div class="form-group{{ $errors->has('name') ? ' has-error' : '' }}">
                            <label for="name" class="col-md-4 control-label">Name</label>

                            <div class="col-md-6">
                                <input id="name" type="text" class="form-control" name="name" value="{{ old('name') }}" required autofocus>

                                @if ($errors->has('name'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('name') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
                            <label for="email" class="col-md-4 control-label">E-Mail Address</label>

                            <div class="col-md-6">
                                <input id="email" type="email" class="form-control" name="email" value="{{ old('email') }}" required>

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
                            <label for="password-confirm" class="col-md-4 control-label">Confirm Password</label>

                            <div class="col-md-6">
                                <input id="password-confirm" type="password" class="form-control" name="password_confirmation" required>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary">
                                    Register
                                </button>
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