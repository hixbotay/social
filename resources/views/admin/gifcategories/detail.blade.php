@extends('layouts.admin')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <h4 class="m-b-20 header-title"></h4>
                <form method="post" action="{{url('admin?controller=Finance&task=update&id='.$item->id)}}" class="form-horizontal">

                    {{ csrf_field() }}

                    <div class="form-group">
                        <label>Tên nhóm <span>*</span></label>
                        <label>{{BookproHelper::get_group_name_by_id($item->group_id)}}</label>
                    </div>

                    <div class="form-group">
                        <label>Loại thu nhập <span></span></label>

                        {{BookproHelper::get_finance_type_name($item->type)}}

                    </div>

                    <div class="form-group">
                        <label>Giá trị % <span></span></label>
                        <input type="number" step="0.01" class="form-control" name="data[value]" value="{{$item->value}}">
                    </div>

                    <div class="form-group">
                        <button type="submit" class="btn btn-primary">Submit</button>
                        <button type="reset" class="btn btn-dark">Reset</button>
                    </div>


                </form>
            </div>

        </div>
    </div>
@endsection
