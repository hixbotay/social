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
    {{-- DatePicker --}}
    <link  href="{{asset('assets/datepicker/dist/datepicker.css')}}" rel="stylesheet">
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
                        <h4><b>Chỉ còn một bước để hoàn tất đăng ký!</b></h4>
                        <p>
                            Vui lòng điền đầy đủ tất cả những thông tin dưới đây, 
                            những thông tin này sẽ giúp chúng tôi tìm được người phù hợp với bạn.
                        </p>
                        <small>Các trường đánh dấu * là bắt buộc</small>
                        <div class="mb-2"></div>
                        @include('layouts.admin.notice')

                        <form method="POST" action="{{ route('register') }}" enctype="multipart/form-data">
                            {{ csrf_field() }}
                            <input type="hidden" name="email" value="{{$user->email}}" />
                            <input type="hidden" name="is_verify" value="{{$user->is_verify}}" />
                            <input type="hidden" name="is_facebook_verified" value="{{$user->is_facebook_verified}}" />
                            <input type="hidden" name="is_gmail_verified" value="{{$user->is_gmail_verified}}" />
                            <input type="hidden" name="provider" value="{{$user->provider}}" />
                            <input type="hidden" name="provider_id" value="{{$user->provider_id}}" />
                            <input type="hidden" name="is_phone_verified" value="{{$user->is_phone_verified}}" />

                            <div class="form-group">
                                <label><b>Họ tên <span>*</span></b></label>
                                <input class="form-control" type="text" name="name" value="{{$user->name ? $user->name : ""}}" required>
                            </div>
                            <div class="form-group">
                                <label><b>Mật khẩu <span>*</span></b></label><br/>
                                <small>Mật khẩu này dùng khi bạn đăng nhập</small>
                                <input class="form-control" type="password" name="password" required>
                            </div>
                            <div class="form-group">
                                <label><b>Số điện thoại <span>*</span></b></label><br/>
                                <small>Số điện thoại không thể thay đổi sau khi đã xác minh</small>
                                <input class="form-control" type="number" name="mobile" value="{{$user->mobile}}" disabled required>
                            </div>
                            <div class="form-group row">
                                <div class="col-12 col-md-6">
                                    <label><b>Ngày sinh <span>*</span></b></label>
                                    <input type="text" data-toggle="datepicker" name="birthday" required/>
                                    <div data-toggle="datepicker"></div>
                                </div>
                                <div class="col-12 col-md-6" id="form-gender">
                                    <label><b>Giới tính <span>*</span></b></label>
                                    <div class="row">
                                        <div class="col-6 d-flex align-items-center">
                                            <input type="radio" value="M" name="gender"/>
                                            <i class="fas fa-male"></i>
                                        </div>
                                        <div class="col-6 d-flex align-items-center">
                                            <input type="radio" value="F" name="gender"/>
                                            <i class="fas fa-female"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row no-gutters">
                                <div class="col-12">
                                    <label><b>Địa chỉ <span>*</span></b></label>
                                </div>
                                <div class="col-12 col-md-4">
                                    <select class="custom-select" name="province_id" id="provinces" onchange="changeProvince(this.value);" required>
                                        <option>Tỉnh / Thành phố</option>
                                    </select>
                                </div>
                                <div class="col-12 col-md-4">
                                    <select class="custom-select" name="district_id" id="districts" onchange="changeDistrict(this.value);" required>
                                        <option>Quận / Huyện</option>
                                    </select>
                                </div>
                                <div class="col-12 col-md-4">
                                    <select class="custom-select" name="village_id" id="communes" required>
                                        <option>Xã / Phường / Thị trấn</option>
                                    </select>
                                </div>
                            </div>

                            @if(!$user->avatar)
                            <div class="form-group">
                                <label class="form-label">
                                    <b>Avatar của bạn <span>*</span></b><br/>
                                    <small>Tải lên avatar để thu hút đối phương hơn nhé!</small>
                                </label>
                                <div class="input-group">
                                    <label class="input-group-btn">
                                        <span class="btn btn-primary">
                                            Tải lên <input type="file" name="avatar" style="display: none;" accept="image/*" >
                                        </span>
                                    </label>
                                    <input type="text" class="form-control" readonly>
                                </div>
                            </div>
                            @else 
                            <input type="hidden" name="avatar" value="{{$user->avatar}}" />
                            @endif

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
<script src="{{asset('assets/datepicker/dist/datepicker.js')}}"></script>

<script>
    const rootUrl = "{{URL::to('/')}}";
    $.ajax({
        url: rootUrl + "/api/provinces",
        method: "GET",
        async: true,
        success: function(provinces) {
            var data = '';
            provinces.forEach(province => {
                data += `<option value="${province.matp}">${province.name}</option>`
            }); 
            $("#provinces").append(data);
        }
    });

    function changeProvince(province_id) {
        $.ajax({
            url: rootUrl + "/api/districts/" + province_id,
            method: "GET",
            async: true,
            success: function(districts) {
                var data = '<option>Chọn quận / huyện</option>';
                districts.forEach(district => {
                    data += `<option value="${district.maqh}">${district.name}</option>`
                }); 
                $("#districts").empty();
                $("#districts").append(data);

                $("#communes").empty();
                $("#communes").append('<option>Chọn xã / phường / thị trấn</option>');
            }
        });
    }

    function changeDistrict(district_id) {
        $.ajax({
            url: rootUrl + "/api/communes/" + district_id,
            method: "GET",
            async: true,
            success: function(communes) {
                var data = '<option>Chọn xã / phường / thị trấn</option>';
                communes.forEach(commune => {
                    data += `<option value="${commune.xaid}">${commune.name}</option>`
                }); 
                $("#communes").empty();
                $("#communes").append(data);
            }
        });
    }

    $(function() {

    // We can attach the `fileselect` event to all file inputs on the page
    $(document).on('change', ':file', function() {
        var input = $(this),
            numFiles = input.get(0).files ? input.get(0).files.length : 1,
            label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
        input.trigger('fileselect', [numFiles, label]);
        });

        // We can watch for our custom `fileselect` event like this
        $(document).ready( function() {
            $(':file').on('fileselect', function(event, numFiles, label) {

                var input = $(this).parents('.input-group').find(':text'),
                    log = numFiles > 1 ? numFiles + ' files selected' : label;

                if( input.length ) {
                    input.val(log);
                } else {
                    if( log ) alert(log);
                }

            });
        });

    });


    $('[data-toggle="datepicker"]').datepicker({
        language: 'vi-VN',
        format: "dd/mm/yyyy"
    });
</script>
</body>
</html>