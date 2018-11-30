@extends('layouts.admin')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <h4 class="m-b-20 header-title">Sở thích</h4>

                @include('layouts.admin.notice')

                <form enctype='multipart/form-data' method="POST" action="{{url('admin?controller=Hobby&task=update&id='.$item->id)}}">
                    {{ csrf_field() }}
                    <div class="col-sm-12">
                        <div class="form-group">
                            <label>Name <span>*</span></label>
                            <input type="text" class="form-control" name="data[name]" value="{{$item->name}}" required />
                        </div>
                        <div class="form-group">
                            <label>Description <span></span></label>
                            <textarea class="form-control" name="data[description]">{{$item->description}}</textarea>
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <button type="submit" class="btn btn-primary">
                            @lang('admin.SUBMIT')
                        </button>
                        <a href="{{ url()->previous() }}">
                            <button type="button" class="btn btn-dark">@lang('admin.BACK')</button>
                        </a>
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection
