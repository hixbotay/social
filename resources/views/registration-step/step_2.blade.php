@extends('layouts.information')

@section('card')
    <div class="container">
        <div class="mb-4">
            <div class="text-center">
                <h4>
                    Số điện thoại dùng để đăng nhập và 
                    nhận các thống báo khi đăng ký hẹn hò với người ấy
                </h4>
            </div>
        </div>

        <form enctype="multipart/form-data" method="POST" action={{url('/update-information')}}>
            {{csrf_field()}}
            <input type="hidden" name="step" value="2"/>
            <div class="form-group">
                <input class="form-control" name="data[mobile]" type="text" placeholder="Số điện thoại"/>
                @if ($errors->has('data[mobile]'))
                <span class="help-block">
                    <strong>{{ $errors->first('data[mobile]') }}</strong>
                </span>
                @endif
            </div>
            <div class="form-group">
                <input class="form-control" name="data[password]" type="password" placeholder="Mật khẩu"/>
            </div>
            <div class="form-group text-center">
                <button class="btn btn-primary" type="submit">Xác nhận</button>
            </div>
        </form>
    </div>

@endsection