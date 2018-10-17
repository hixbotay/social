@extends('layouts.admin')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <h4 class="m-b-20 header-title">Thêm cấu hình Finance</h4>
                <form enctype='multipart/form-data' method="POST" action="{{url('admin?controller=Finance&task=store')}}">
                    {{ csrf_field() }}
                    <div class="col-sm-12">

                        <div class="form-group">
                            <label>Nhóm lợi ích <span>*</span></label>
                            {{BookproHtml::select_user_groups('data[group_id]')}}
                        </div>

                        <div class="form-group">
                            <label>Loại thu nhập <span></span></label>
                            <input type="text" class="form-control" name="data[type]">
                        </div>

                        <div class="form-group">
                            <label>Giá trị % <span></span></label>
                            <input type="number" step="0.01" class="form-control" name="data[value]">
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
