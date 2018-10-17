@extends('layouts.admin')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <h4 class="m-b-20 header-title">Danh mục</h4>
                @include('layouts.admin.notice')
                <form enctype='multipart/form-data' method="POST" action="{{url('admin?controller=GifCategories&task=update&id='.$item->id)}}">
                    {{ csrf_field() }}
                    <div class="col-sm-12">

                        <div class="form-group">
                            <label>Tên danh mục<span></span></label>
                            <input type="text" class="form-control" value="{{$item->name}}" name="data[name]">
                        </div>

                        <div class="form-group">
                            <label>Mô tả<span></span></label>
                            <textarea class="form-control" name="data[description]">{{$item->description}}</textarea>
                        </div>

                    </div>
                    <div class="col-sm-12">
                        <button type="submit" class="btn btn-primary">Submit</button>
                        <a href="{{ url()->previous() }}">
                            <button type="button" class="btn btn-primary">Back</button>
                        </a>
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection
