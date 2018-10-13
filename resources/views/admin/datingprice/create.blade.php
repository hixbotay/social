@extends('layouts.admin')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <h4 class="m-b-20 header-title">Thêm cấu hình Finance</h4>

                @include('layouts.admin.notice')

                <form enctype='multipart/form-data' method="POST" action="{{url('admin?controller=DatingPrice&task=store')}}">
                    {{ csrf_field() }}
                    <div class="col-sm-12">

                        <div class="form-group">
                            <label>Loại hẹn hò<span>*</span></label>
                            <select name="data[type]" class="form-control" required>
                                <option value="2">Hẹn đôi</option>
                                <option value="3">Hẹn nhóm</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label>Nhóm tỉnh<span></span></label>

                            <select name="data[province_group_id]" class="form-control" required>
                                @foreach(\App\ProvinceGroup::all() AS $value)
                                    <option value="{{$value->id}}">{{$value->name}}</option>
                                @endforeach
                            </select>

                        </div>

                        <div class="form-group">
                            <label>Giá hẹn đôi<span></span></label>
                            <input type="number" step="0.01" class="form-control" name="data[double_dating_price]" required>
                        </div>


                        <div class="form-group">
                            <label>Giá hẹn nhóm (Nam)<span></span></label>
                            <input type="number" step="0.01" class="form-control" name="data[group_dating_m_price]" required>
                        </div>


                        <div class="form-group">
                            <label>Giá hẹn nhóm (Nữ)<span></span></label>
                            <input type="number" step="0.01" class="form-control" name="data[group_dating_f_price]" required>
                        </div>


                    </div>
                    <div class="col-sm-12">
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection
