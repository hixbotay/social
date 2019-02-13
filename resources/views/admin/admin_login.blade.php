@extends('layouts.admin_login')

@section('content')

    <div class="row">


        <div class="col-md-6 offset-md-3" id="landing-content">

            @if($errors->any())

                <div class="col-md-12">
                    <div class="alert alert-danger">
                        <strong>Lỗi!</strong> {{$errors->first()}}
                    </div>
                </div>

            @endif

            <form class="form-signin" method="POST" action="{{ route('admin') }}">

                <h1 class="h3 mb-3 font-weight-normal">Trang quản trị</h1>

                {{ csrf_field() }}

                <div class="form-group{{ $errors->has('mobile') ? ' has-error' : '' }}">
                    <label for="mobile" class="col-md-4 control-label">Số điện thoại</label>

                    <div class="col-md-12">
                        <input id="mobile" type="text" class="form-control" name="mobile" value="{{ old('mobile') }}" required autofocus>

                        @if ($errors->has('mobile'))
                            <span class="help-block">
                                <strong>{{ $errors->first('mobile') }}</strong>
                            </span>
                        @endif
                    </div>
                </div>

                <div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">
                    <label for="password" class="col-md-4 control-label">Password</label>

                    <div class="col-md-12">
                        <input id="password" type="password" class="form-control" name="password" required>

                        @if ($errors->has('password'))
                            <span class="help-block">
                                <strong>{{ $errors->first('password') }}</strong>
                            </span>
                        @endif
                    </div>
                </div>

                <div class="form-group col-md-12">
                    <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                </div>
            </form>

        </div>

    </div>

@endsection
