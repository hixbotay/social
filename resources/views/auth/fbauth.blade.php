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
    <!-- HTTPS required. HTTP will give a 403 forbidden response -->
    <script src="https://sdk.accountkit.com/en_US/sdk.js" url="vi_VN"></script>
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
                    <div class="form-items">
                        <h3>Register new account</h3>
                        <p>Access to the most powerfull tool in the entire design and web industry.</p>
                        <form>
                        <input class="form-control" type="text" name="name" placeholder="Họ tên" value="{{$user->name}}" required>
                        <input class="form-control" type="password" name="password" placeholder="Mật khẩu" required>
                        <input class="form-control" type="number" name="mobile" placeholder="Số điện thoại" value="{{$user->mobile}}" required disabled>
                            <input class="form-control" type="date" name="birthday" data-date="" data-date-format="DD MMMM YYYY" required>
                            <select class="custom-select">
                                <option>Giới tính</option>
                                <option value="M">Nam</option>
                                <option value="F">Nữ</option>
                            </select>
                            <select class="custom-select">
                                <option>Tình trạng hôn nhân</option>
                                <option value="0">Độc thân</option>
                                <option value="1">Đã kết hôn</option>
                                <option value="2">Đã từng kết hôn trước đó</option>
                            </select>
                            {{-- <select class="custom-select">
                                <option>Tình trạng hôn nhân</option>
                                <option value="0">Độc thân</option>
                                <option value="1">Đã kết hôn</option>
                                <option value="2">Đã từng kết hôn trước đó</option>
                            </select> --}}

                            <div class="form-button">
                                <button id="submit" type="submit" class="ibtn">Register</button>
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