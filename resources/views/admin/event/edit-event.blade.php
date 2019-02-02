@extends('layouts.admin')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <h4 class="m-b-20 header-title">@lang('admin.DATING_MANAGER')</h4>

                @include('layouts.admin.notice')

                <form enctype='multipart/form-data' method="POST" action="{{url('admin?controller=Event&task=update&id='.$item->id)}}">
                    {{ csrf_field() }}
                    <div class="col-sm-12">

                        <div class="form-group">
                            <label>@lang('admin.NAME') <span>*</span></label>
                            <input type="text" class="form-control" name="data[name]" value="{{$item->name}}" readonly required />
                        </div>

                        <div class="form-group">
                            <label>Min <span>*</span></label>
                            <input type="text" class="form-control" name="data[min_number]" value="{{$item->min_number}}" readonly required />
                        </div>

                        <div class="form-group">
                            <label>Max <span>*</span></label>
                            <input type="text" class="form-control" name="data[limit_number]" value="{{$item->limit_number}}" readonly required />
                        </div>

                        <div class="form-group">
                            <label>Hạn <span>*</span></label>
                            <input type="text" class="form-control" name="data[limit_time_register]" value="{{$item->limit_time_register}}" readonly required />
                        </div>

                        <div class="form-group">
                            <label>@lang('admin.START_TIME') <span>*</span></label>
                            <input type="text" class="form-control" name="data[start_time]" value="{{$item->start_time}}" readonly required />
                        </div>

                        <div class="form-group">
                            <label>@lang('admin.TYPE') <span>*</span></label>
                            <input type="text" class="form-control" name="data[type]" value="{{$item->type}}" readonly required />
                        </div>

                        <div class="form-group">
                            <label>@lang('admin.CREATOR') <span>*</span></label>
                            <input type="text" class="form-control" name="data[creator]" value="{{$item->creator}}" readonly required />
                        </div>

                        <div class="form-group">
                            <label>@lang('admin.AGENCY') <span>*</span></label>
                            <input type="text" class="form-control" name="data[agency_id]" value="{{$item->agency_id}}" readonly required />
                        </div>

                        <div class="form-group">
                            <label>@lang('admin.STATUS') <span>*</span></label>
                            <input type="text" class="form-control" name="data[status]" value="{{$item->status}}" readonly required />
                        </div>

                        <div class="form-group">
                            <label>Đại lý phê duyệt <span>*</span></label>
                            <input type="text" class="form-control" name="data[is_agency_approved]" value="{{$item->is_agency_approved}}" readonly required />
                        </div>


                    </div>

                    <div class="col-sm-12">
                        <a href="admin?view=Event&layout=listEvent">
                            <button type="button" class="btn btn-primary">@lang('admin.BACK')</button>
                        </a>
                    </div>
                </form>
            </div>
        </div>
    </div>


@section('javascript')
    <script>


    </script>
@stop


@endsection
