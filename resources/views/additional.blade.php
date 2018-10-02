@extends('layouts.information')

@section('text')
<small>Giới thiệu thêm về bản thân đê Nối duyên giúp bạn tìm đúng người bạn đời của mình</small>
@endsection

@section('card')
<div class="text-center">
    <br/>
    <a href={{url('/upload-avatar')}}><button class="btn btn-light">Bỏ qua</button></a>
</div>
<hr />
<div class="container">
    <form method="POST" action={{url('/update-information')}}>
        {{ csrf_field() }}
        <div class="form-group row">
            <div class="col-4">
                <label>Số điện thoại</label>
            </div>
            <div class="col-8">
                <input type="text" class="form-control" name="data[mobile]" required />
            </div>
        </div>
        <div class="form-group row">
            <div class="col-4">
                <label>Địa chỉ</label>
            </div>
            <div class="col-8">
                <input type="text" class="form-control" name="data[address]" required />
            </div>
        </div>
        <div class="form-group row">
            <div class="col-4">
                <label>Tình trạng hôn nhân</label>
            </div>
            <div class="col-8">
                <input type="text" class="form-control" name="data[marital_status]" required />
            </div>
        </div>
        <div class="form-group row">
            <div class="col-4">
                <label>Nghề nghiệp</label>
            </div>
            <div class="col-8">
                <input type="text" class="form-control" name="data[job]" required />
            </div>
        </div>
        <div class="form-group row">
            <div class="col-4">
                <label>Ngày sinh</label>
            </div>
            <div class="col-8">
                <input type="date" class="form-control" name="data[birthday]" required />
            </div>
        </div>
        <div class="text-center">
            <button type="submit" class="btn btn-primary">Gửi</button>
        </div>
    </form>
</div>
@endsection