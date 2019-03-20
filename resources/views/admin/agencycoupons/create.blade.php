@extends('layouts.admin')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <h4 class="m-b-20 header-title">Thêm mã giảm giá</h4>

                @include('layouts.admin.notice')

                <form enctype='multipart/form-data' method="POST" action="{{url('admin?controller=AgencyCoupons&task=store')}}">
                    {{ csrf_field() }}
                    <div class="col-sm-12">

                        <div class="form-group">
                            <label>Agency<span>*</span></label>
                            <select name="data[agency_id]" class="form-control" required>
                                @foreach($agencies AS $agen)
                                    <option value="{{ $agen->id }}">{{ $agen->name }}</option>
                                @endforeach
                            </select>
                        </div>

                        <div class="form-group">
                            <label>Loại hẹn hò<span>*</span></label>
                            <select name="data[dating_type]" class="form-control" required>
                                <option value="dating_couple">Hẹn đôi</option>
                                <option value="dating_group">Hẹn nhóm</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label>Code<span></span></label>
                            <input type="text" class="form-control" name="data[code]" required>
                        </div>

                        <div class="form-group">
                            <label>Giá trị<span></span></label>
                            <input type="number" step="0.01" class="form-control" name="data[value]" required>
                        </div>


                        <div class="form-group">
                            <label>Đơn vị<span></span></label>
                            <select name="data[unit]" class="form-control" required>
                                <option value="1">VND</option>
                                <option value="2">%</option>
                            </select>
                        </div>


                        <div class="form-group">
                            <label>Ngày hiệu lực</label>
                            <div>
                                <div class="input-daterange input-group" id="date-range">
                                    <input type="text" class="form-control" name="data[from_time]">
                                    <span class="input-group-addon b-0">tới</span>
                                    <input type="text" class="form-control" name="data[to_time]">
                                </div>
                            </div>
                        </div>


                    </div>
                    <div class="col-sm-12">
                        <button type="submit" class="btn btn-primary">@lang('admin.SUBMIT')</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection


@section('javascript')
    <script>
        // Date Picker
        jQuery('.datepicker').datepicker({
            autoclose: true,
            todayHighlight: true
        });
        jQuery('#datepicker-autoclose').datepicker({
            autoclose: true,
            todayHighlight: true
        });
        jQuery('#datepicker-inline').datepicker();
        jQuery('#datepicker-multiple-date').datepicker({
            format: "mm/dd/yyyy",
            clearBtn: true,
            multidate: true,
            multidateSeparator: ","
        });
        jQuery('#date-range').datepicker({
            toggleActive: true
        });
    </script>
@endsection