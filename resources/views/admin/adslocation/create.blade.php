@extends('layouts.admin')


@section('content')


    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <h4 class="m-b-20 header-title">@lang('admin.ADS_LOCATION')</h4>
                <form method="post" action="{{url('admin?controller=AdsLocation&task=store')}}" class="form-horizontal">

                    {{ csrf_field() }}

                    <div class="form-group">
                        <label for="parent_id">Vị trí quảng cáo <span>*</span></label>
                        <select class="form-control" id="parent_id" name="data[parent_id]">
                            <option value="">@lang('admin.SELECT')</option>
                            @foreach($parents AS $value)
                                <option value="{{$value->id}}">{{$value->name}}</option>
                            @endforeach
                        </select>
                    </div>

                    <div class="form-group">
                        <label>@lang('admin.ADS_LOCATION_NAME') <span>*</span></label>
                        <input class="form-control" type="text" name="data[name]" value="" required />
                    </div>

                    <div class="form-group">
                        <button type="submit" class="btn btn-primary">Submit</button>
                        <button type="reset" class="btn btn-dark">@lang('admin.BACK')</button>
                    </div>


                </form>
            </div>

        </div>
    </div>


@endsection