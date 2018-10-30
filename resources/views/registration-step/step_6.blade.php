@extends('layouts.information')

@section('text')
<p>Giới thiệu thêm về bản thân đê Nối duyên giúp bạn tìm đúng người bạn đời của mình</p>
@endsection

@section('card')
<div class="text-center">
    <br/>
    <a href={{url('')}}><button class="btn btn-light">Bỏ qua</button></a>
</div>
<hr />
<div class="container">
    <form method="POST" action={{url('/update-information')}}>
        {{ csrf_field() }}
        <input type="hidden" name="step" value="6"/>
        <div class="form-group row">
            <div class="col-4">
                <label>Giới tính *</label>
            </div>
            <div class="col-8">
                <select type="text" class="custom-select" name="data[gender]" required>
                    <option value="M">Nam</option>
                    <option value="F">Nữ</option>
                </select>
            </div>
        </div>
        <div class="form-group row">
            <div class="col-4">
                <label>Tỉnh/TP *</label>
            </div>
            <div class="col-8">
                <select type="text" class="custom-select" name="data[province_id]" id="select-province">
                @foreach($provinces as $province) 
                    <option value={{$province->matp}}>{{$province->name}}</option>
                @endforeach
                </select>
            </div>
        </div>
        <div class="form-group row">
            <div class="col-4">
                <label>Quận/Huyện *</label>
            </div>
            <div class="col-8">
                <select type="text" class="custom-select" name="data[district_id]" id="select-district">
                </select>
            </div>
        </div>
        <div class="form-group row">
            <div class="col-4">
                <label>Xã/Phường *</label>
            </div>
            <div class="col-8">
                <select type="text" class="custom-select" name="data[village_id]" id="select-village">
                </select>
            </div>
        </div>
        <div class="form-group row">
            <div class="col-4">
                <label>Tình trạng hôn nhân *</label>
            </div>
            <div class="col-8">
                <select type="text" class="custom-select" name="data[marital_status]" required>
                    <option value="0">Độc thân</option>
                    <option value="1">Đã kết hôn</option>
                </select>
            </div>
        </div>
        <div class="form-group row">
            <div class="col-4">
                <label>Nghề nghiệp *</label>
            </div>
            <div class="col-8">
                <select type="text" class="custom-select" name="data[job]" required>
                    @foreach($jobs as $job) 
                    <option value={{$job->id}}>{{$job->name}}</option>
                    @endforeach
                </select>
            </div>
        </div>
        <div class="form-group row">
            <div class="col-4">
                <label>Ngày sinh</label>
            </div>
            <div class="col-8">
                <input type="date" class="form-control" name="data[birthday]" />
            </div>
        </div>
        <div class="text-center">
            <button type="submit" class="btn btn-primary">Gửi</button>
        </div>
    </form>
</div>

<script>
    var districts = [];
    $('#select-province').change(function() {
        $('#first-option').remove();
        $.getJSON('api/districts/' + $('#select-province').find(":selected").val(), function(data) {
            $('#select-district').empty();
            for (let i = 0; i < data.length; i ++){
                $("#select-district").append('<option value="'+data[i].maqh+'">'+data[i].name+'</option>');
            }
            console.log(data);
        }).fail(function (jqxhr, status, error) {
            console.log('error', status, error) }
        );;
    })

    $('#select-district').change(function() {
        $.getJSON('api/communes/' + $('#select-district').find(":selected").val(), function(data) {
            $('#select-village').empty();
            for (let i = 0; i < data.length; i ++){
                $("#select-village").append('<option value="'+data[i].xaid+'">'+data[i].name+'</option>');
            }
            console.log(data);
        }).fail(function (jqxhr, status, error) {
            console.log('error', status, error) }
        );
    })
</script>

@endsection