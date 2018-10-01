@extends('layouts.information')

@section('card')
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
        <button type="submit" class="btn btn-outline-primary">Gửi</button>
    </form>
</div>
@endsection