@extends('layouts.landing')

@section('login-register-form')

<div>
    <div class="form-top">
        <div class="col-sm-offset-2 col-sm-12">
            <img src="storage/app/public/logo.png" id="logo-form">
        </div>
    </div>
    <div class="form-bottom">
        <form method="POST" action="{{ route('register') }}">
            {{ csrf_field() }}
            <div class="form-group">
                <input type="text" class="form-control" placeholder="Tên của bạn" name="name" required/>
            </div>      
            <div class="form-group row">
                <div class="col-sm-12">
                    <input type="date" class="form-control" name="birthday"  required/>
                </div>
            </div>
            <div class="form-group row">
                <div class="col-sm-7">
                    <select class="form-control" name="marital_status" required>
                        <option>Tình trạng hôn nhân</option>
                        <option value="0">Độc thân</option>
                        <option value="1">Đã kết hôn</option>
                    </select>
                </div>
                <div class="col-sm-5">
                    <select class="form-control" name="gender" required>
                        <option>Giới tính</option>
                        <option value="M">Nam</option>
                        <option value="F">Nữ</option>
                    </select>
                </div>
            </div>
            <div class="form-group row">
                <div class="col-sm-4">
                    <select class="form-control" name="province_id" id="register-province" required>
                        <option>Tỉnh/TP</option>
                        @foreach(App\ProvinceGroup::all_province() AS $value)
                            <option value="{{$value->matp}}">{{$value->name}}</option>
                        @endforeach
                        {{-- @foreach ($provinces as $item)
                            <option value={{$item->matp}}>{{$item->name}}</option>
                        @endforeach --}}
                    </select>
                </div>
                <div class="col-sm-4">
                    <select class="form-control" name="district_id" id="district" required>
                        <option value="">Huyện/Quận</option>
                        {{-- @foreach ($districts as $item)
                            <option value={{$item->maqh}}>{{$item->name}}</option>
                        @endforeach --}}
                    </select>
                </div>
                <div class="col-sm-4">
                    <select class="form-control" name="village_id" id="village" required>
                        <option value="">Xã/Phường</option>
                        {{-- @foreach ($villages as $item)
                            <option value={{$item->xaid}}>{{$item->name}}</option>
                        @endforeach --}}
                    </select>
                </div>
            </div>
            <div class="form-group">
                <input type="number" name="mobile" class="form-control" placeholder="Số điện thoại"  required/>
            </div>
            <div class="form-group">
                <input type="password" name="password" class="form-control" placeholder="Mật khẩu"  required/>
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
        $.getJSON('api/districts/' + $('#register-province').find(":selected").val(), function(data) {
            // var items = [];
            // $.each( data, function( key, val ) {
            //     items.push(value);
            // });
            for (let i = 0; i < data.length; i ++){
                jQuery("#district").append('<option value="'+data[i].maqh+'">'+data[i].name+'</option>');
            }
            console.log(data);
        }).fail(function (jqxhr, status, error) {
            console.log('error', status, error) }
        );
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
            }
        });
        jQuery.ajax({
            url: 'api/districts/' + $('#register-province').find(":selected").val(),
            type: 'GET',
            dataType: "json",
            data: {districts: districts},
        }).done(function(data) {
            console.log(data);
        }).fail(function (jqxhr, status, error) {
            console.log('error', status, error)
        });
    })

    $('#district').change(function() {
        $.getJSON('api/communes/' + $('#district').find(":selected").val(), function(data) {
            for (let i = 0; i < data.length; i ++){
                jQuery("#village").append('<option value="'+data[i].maqh+'">'+data[i].name+'</option>');
            }
            console.log(data);
        }).fail(function (jqxhr, status, error) {
            console.log('error', status, error) }
        );
    })
</script>

@endsection