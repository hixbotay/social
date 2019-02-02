<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Nối duyên</title>
    <link rel="stylesheet" type="text/css" href="{{asset('assets/css/bootstrap-4.1.3.min.css')}}">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css">
    <link rel="stylesheet" type="text/css" href="{{asset('assets/css/ioform-style.css')}}">
    <link rel="stylesheet" type="text/css" href="{{asset('assets/css/ioform-theme19.css')}}">
</head>
<body>
    <div class="form-body without-side">
        <div class="website-logo">
            <div class="logo">
                <img class="logo-size" src="{{asset('public/images/main/logo.png')}}" alt="noiduyen.vn">
            </div>
        </div>
        <div class="row">
            <div class="img-holder">
                <div class="bg"></div>
                <div class="info-holder">
                    <img src="{{asset('public/images/main/graphic3.svg')}}" alt="">
                </div>
            </div>
            <div class="form-holder">
                <div class="form-content">
                    <div class="form-items" id="additional-form">
                        <h4><b>Tạo lại mật khẩu mới</b></h4>
                        <p>
                            Tạo lại mật khẩu cho tài khoản có số điện thoại {{$mobile}}
                        </p>
                        <small>Các trường đánh dấu * là bắt buộc</small>
                        <div class="mb-2"></div>
                        @include('layouts.admin.notice')

                        <form method="POST" action="/password/reset">
                            {{ csrf_field() }}
                            <input type="hidden" value="{{$mobile}}" name="mobile" required readonly/>
                            <div class="form-group">
                                <label><b>Mật khẩu mới <span>*</span></b></label><br/>
                                <small>Mật khẩu này dùng khi bạn đăng nhập</small>
                                <input class="form-control" type="password" name="password" required>
                            </div>
                            <div class="form-group">
                                <label><b>Xác nhận lại mật khẩu mới <span>*</span></b></label><br/>
                                <small>Vui lòng nhập lại mật khẩu bạn vừa nhập ở trên</small>
                                <input class="form-control" type="password" name="retype-password" required>
                            </div>

                            <div class="form-button">
                                <button type="submit" class="btn btn-primary">Hoàn tất</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {{-- JS --}}
<script src="{{asset('assets/js/jquery-2.1.4.min.js')}}"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
<script src="{{asset('assets/js/bootstrap-4.1.3.min.js')}}"></script>
<script src="{{asset('assets/js/fbaccountkit.js')}}"></script>

</body>
</html>