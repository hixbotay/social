<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nối duyên</title>
    <link rel="stylesheet" type="text/css" href="{{asset('assets/css/bootstrap-4.1.3.min.css')}}">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css">
    <link rel="stylesheet" type="text/css" href="{{asset('assets/css/ioform-style.css')}}">
    <link rel="stylesheet" type="text/css" href="{{asset('assets/css/ioform-theme4.css')}}">
</head>
<body>
    <div class="form-body">
        <div class="website-logo">
        <a href="{{url('/')}}">
                <div class="logo">
                    <img class="logo-size" src="{{asset('public/images/main/logo.png')}}" alt="">
                </div>
            </a>
        </div>
        <div class="row">
            <div class="img-holder">
                <div class="bg"></div>
                <div class="info-holder">
                    <img src="{{asset('public/images/main/graphic.jpg')}}" alt="">
                </div>
            </div>
            <div class="form-holder">
                <div class="form-content">
                    <div class="form-items">
                        <h3>Hãy tham gia ngay cùng chúng tôi.</h3>
                        <p>Nếu bạn thực sự muốn tìm một người bạn có ý nghĩa với cuộc đời mình.</p>

                        @yield('form-content')
                        
                        <div class="other-links">
                            <span>Hoặc sử dụng tài khoản thông qua</span>
                            <a href="auth/facebook"><i class="fab fa-facebook-f"></i></a>
                            <a href="auth/google"><i class="fab fa-google"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
<script src="{{asset('assets/js/jquery-2.1.4.min.js')}}"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
<script src="{{asset('assets/js/bootstrap-4.1.3.min.js')}}"></script>
{{-- <script>
    $(window).on("load", function() {
        $('.btn-forget').on('click',function(e){
            e.preventDefault();
        $('.form-items','.form-content').addClass('hide-it');
        $('.form-sent','.form-content').addClass('show-it');
        })
    });


</script> --}}
</body>
</html>