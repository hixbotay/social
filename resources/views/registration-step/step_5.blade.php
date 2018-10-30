@extends('layouts.information')

@section('text')
<p>Miêu tả một chút về người ấy để chúng tôi giúp bạn được dễ dàng hơn</p>
@endsection

@section('card')
<div class="text-center">
    <br/>
    <a href="{{url('').'/registration?step=6'}}"><button class="btn btn-light">Bỏ qua</button></a>
</div>
<hr />
<div class="container">
    <form method="POST" action={{url('/update-ideal-person')}}>
        {{ csrf_field() }}
        <input type="hidden" name="step" value="5"/>
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
                <label>Tỉnh</label>
            </div>
            <div class="col-8">
                <select type="text" class="custom-select" name="data[marital_status]">
                @foreach($provinces as $province) 
                    <option value={{$province->matp}}>{{$province->name}}</option>
                @endforeach
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
                <label>Tuổi *</label>
            </div>
            <div class="col-8">
                <input type="number" class="form-control" name="data[age]" required />
            </div>
        </div>
        <div class="form-group row">
            <div class="col-4">
                <label>Chiều cao</label>
            </div>
            <div class="col-8">
                <input type="number" class="form-control" name="data[height]" />
            </div>
        </div>
        <div class="form-group row">
            <div class="col-4">
                <label>Cân nặng</label>
            </div>
            <div class="col-8">
                <input type="number" class="form-control" name="data[weight]" />
            </div>
        </div>
        <div class="text-center">
            <button type="submit" class="btn btn-primary">Xác nhận</button>
        </div>
    </form>
</div>
@endsection