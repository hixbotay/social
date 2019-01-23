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
                        <h4><b>Chỉ còn một bước để hoàn tất đăng ký!</b></h4>
                        <p>
                            Vui lòng điền đầy đủ tất cả những thông tin dưới đây, 
                            những thông tin này sẽ giúp chúng tôi tìm được người phù hợp với bạn.
                        </p>

                        @include('layouts.admin.notice')

                        <form method="POST" action="{{ route('register') }}" enctype="multipart/form-data">
                            {{ csrf_field() }}
                            {{-- <input class="form-control" type="text" name="name" placeholder="Họ tên" value="{{$user->name}}" required>
                            <input class="form-control" type="password" name="password" placeholder="Mật khẩu" required>
                            <input class="form-control" type="number" name="mobile" placeholder="Số điện thoại" value="{{$user->mobile}}" required disabled>
                            <input class="form-control" type="date" name="birthday" data-date="" data-date-format="DD MMMM YYYY" required> --}}
                            <input class="form-control" type="text" name="name" placeholder="Họ tên" required>
                            <input class="form-control" type="password" name="password" placeholder="Mật khẩu" required>
                            <input class="form-control" type="number" name="mobile" placeholder="Số điện thoại" required>
                            <input class="form-control" type="date" name="birthday" required>
                            
                            <div class="form-group row">
                                <div class="col-12 col-md-4">
                                    <select class="custom-select" name="gender" required>
                                        <option>Giới tính</option>
                                        <option value="M">Nam</option>
                                        <option value="F">Nữ</option>
                                    </select>
                                </div>
                                <div class="col-12 col-md-8">
                                    <select class="custom-select" name="marital_status" required>
                                        <option>Tình trạng hôn nhân</option>
                                        <option value="0">Độc thân</option>
                                        <option value="1">Đã kết hôn</option>
                                        <option value="2">Đã từng kết hôn trước đó</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group row no-gutters">
                                <div class="col-12">
                                    <label>Địa chỉ</label>
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
                            <div class="form-group">
                                <label class="form-label">Avatar của bạn</label>
                                <div class="input-group">
                                    <label class="input-group-btn">
                                        <span class="btn btn-primary">
                                            Tải lên <input type="file" name="avatar" style="display: none;" accept="image/*" required>
                                        </span>
                                    </label>
                                    <input type="text" class="form-control" readonly>
                                </div>
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

<script>
    const rootUrl = "{{env('APP_URL')}}";
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
</script>
</body>
</html>