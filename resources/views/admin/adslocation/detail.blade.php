@extends('layouts.admin')


@section('content')


    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <h4 class="m-b-20 header-title">@lang('admin.ADS_LOCATION')</h4>
                <form method="post" action="{{url('admin?controller=AdsLocations&task=update&id='.$item->id)}}" class="form-horizontal">

                    {{ csrf_field() }}

                    @if($item->parent_id != 0)
                    <div class="form-group">
                        <label for="parent_id">Vị trí quảng cáo <span>*</span></label>
                        <select class="form-control" id="parent_id" name="data[parent_id]">
                            <option value="">@lang('admin.SELECT')</option>
                            @foreach($parents AS $value)
                                <option
                                        @if($value->id == $item->parent_id)
                                                selected
                                        @endif
                                        value="{{$value->id}}">{{$value->name}}</option>
                            @endforeach
                        </select>
                    </div>
                    @endif

                    <div class="form-group">
                        <label>@lang('admin.ADS_LOCATION_NAME') <span>*</span></label>
                        <input class="form-control" type="text" name="data[name]" value="{{$item->name}}" />
                    </div>

                    <div class="form-group">
                        <label>@lang('admin.PRICE') <span>*</span></label>
                        <input class="form-control" type="number" step="1000" name="data[price]" value="{{$item->price}}" required />
                    </div>

                    @if(1 == 0)
                    <div class="form-group">
                        <label>@lang('admin.CODE') <span>*</span></label>
                        <input type="number" step="0.01" class="form-control" name="data[value]" value="{{$item->value}}">
                    </div>
                    @endif

                    <div class="form-group">
                        <button type="submit" class="btn btn-primary">@lang('admin.SUBMIT')</button>
                        <a href="{{url('admin?view=AdsLocations')}}">
                            <button type="button" class="btn btn-dark">@lang('admin.BACK')</button>
                        </a>
                    </div>


                </form>
            </div>

        </div>
    </div>


@endsection