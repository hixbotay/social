@extends('layouts.admin')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <h4 class="m-b-20 header-title"></h4>


                @include('layouts.admin.notice')


                <form method="post" action="{{url('admin?controller=DatingPrice&task=update&id='.$item->id)}}" class="form-horizontal">

                    {{ csrf_field() }}

                    <div class="form-group">
                        <label>Loại hẹn hò<span>*</span></label>
                        <div class="form-control">
                            {{BookproHelper::get_finance_type_name($item->type)}}
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Nhóm tỉnh<span></span></label>

                        <div class="form-control">
                            {{\App\ProvinceGroup::find($item->province_group_id)->name}}
                        </div>

                    </div>

                    <div class="form-group">
                        <label>Giá hẹn đôi<span></span></label>
                        <input type="number" value="{{$item->couple_dating_price}}" step="0.01" class="form-control" name="data[couple_dating_price]">
                    </div>


                    <div class="form-group">
                        <label>Giá hẹn nhóm (Nam)<span></span></label>
                        <input type="number" value="{{$item->group_dating_m_price}}" step="0.01" class="form-control" name="data[group_dating_m_price]">
                    </div>


                    <div class="form-group">
                        <label>Giá hẹn nhóm (Nữ)<span></span></label>
                        <input type="number" value="{{$item->group_dating_f_price}}" step="0.01" class="form-control" name="data[group_dating_f_price]">
                    </div>


                    <div class="form-group">
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </div>


                </form>
            </div>

        </div>
    </div>
@endsection
