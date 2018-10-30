@extends('layouts.landing')

@section('login-register-form')

<div>
    <div class="form-top">
        <div class="col-sm-offset-2 col-sm-12">
            <img src="{{env('APP_URL')}}/public/images/main/logo.png" id="logo-form">
        </div>
    </div>
    <div class="form-bottom">
        <form method="POST" action="{{ route('register') }}">
            {{ csrf_field() }}
            <div class="form-group">
                <input type="text" class="form-control" placeholder="Tên của bạn" name="name" required/>
                @if ($errors->has('name'))
                <span class="help-block">
                    <strong>{{ $errors->first('name') }}</strong>
                </span>
                @endif
            </div>      
            <div class="form-group row">
                <div class="col-sm-12">
                    <input type="date" class="form-control" name="birthday"  required/>
                    @if ($errors->has('birthday'))
                    <span class="help-block">
                        <strong>{{ $errors->first('birthday') }}</strong>
                    </span>
                    @endif
                </div>
            </div>
            <div class="form-group row">
                <div class="col-sm-7">
                    <select class="form-control" name="marital_status" required>
                        <option>Tình trạng hôn nhân</option>
                        <option value="0">Độc thân</option>
                        <option value="1">Đã kết hôn</option>
                    </select>
                    @if ($errors->has('marital_status'))
                    <span class="help-block">
                        <strong>{{ $errors->first('marital_status') }}</strong>
                    </span>
                    @endif
                </div>
                <div class="col-sm-5">
                    <select class="form-control" name="gender" required>
                        <option>Giới tính</option>
                        <option value="M">Nam</option>
                        <option value="F">Nữ</option>
                    </select>
                    @if ($errors->has('gender'))
                    <span class="help-block">
                        <strong>{{ $errors->first('gender') }}</strong>
                    </span>
                    @endif
                </div>
            </div>
            <div class="form-group row">
                <div class="col-sm-4">
                    <select class="form-control" name="province_id" id="register-province" required>
                        <option id="first-option">Tỉnh/TP</option>
                        @foreach(App\ProvinceGroup::all_province() AS $value)
                            <option value="{{$value->matp}}">{{$value->name}}</option>
                        @endforeach
                    </select>
                    @if ($errors->has('province_id'))
                    <span class="help-block">
                        <strong>{{ $errors->first('province_id') }}</strong>
                    </span>
                    @endif
                </div>
                <div class="col-sm-4">
                    <select class="form-control" name="district_id" id="register-district" required>
                        <option value="">Huyện/Quận</option>
                    </select>
                    @if ($errors->has('district_id'))
                    <span class="help-block">
                        <strong>{{ $errors->first('district_id') }}</strong>
                    </span>
                    @endif
                </div>
                <div class="col-sm-4">
                    <select class="form-control" name="village_id" id="register-village" required>
                        <option value="">Xã/Phường</option>
                    </select>
                    @if ($errors->has('village_id'))
                    <span class="help-block">
                        <strong>{{ $errors->first('village_id') }}</strong>
                    </span>
                    @endif
                </div>
            </div>
            <div class="form-group">
                <button type="submit" class="btn">ĐĂNG KÝ</button>
            </div>
        </form>
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
            <div class="text-center">
                <small>Bạn đã có tài khoản? <a href="/login">Đăng nhập</a></small>
            </div>
        </div>
    </div>
</div>

<script>
    var districts = [];
    $('#register-province').change(function() {
        $('#first-option').remove();
        $.getJSON('api/districts/' + $('#register-province').find(":selected").val(), function(data) {
            $('#register-district').empty();
            for (let i = 0; i < data.length; i ++){
                $("#register-district").append('<option value="'+data[i].maqh+'">'+data[i].name+'</option>');
            }
            console.log(data);
        }).fail(function (jqxhr, status, error) {
            console.log('error', status, error) }
        );;
    })

    $('#register-district').change(function() {
        $.getJSON('api/communes/' + $('#register-district').find(":selected").val(), function(data) {
            $('#register-village').empty();
            for (let i = 0; i < data.length; i ++){
                $("#register-village").append('<option value="'+data[i].xaid+'">'+data[i].name+'</option>');
            }
            console.log(data);
        }).fail(function (jqxhr, status, error) {
            console.log('error', status, error) }
        );
    })
</script>

@endsection