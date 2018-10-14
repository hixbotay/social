@extends('layouts.admin')

@section('content')


    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <h4 class="m-b-20 header-title">Thêm học vấn</h4>
                @include('layouts.admin.notice')
                <form enctype='multipart/form-data' method="POST"
                      action="{{url('admin?controller=Education&task=update&id='.$item->id)}}">
                    {{ csrf_field() }}

                    <div class="col-sm-12">

                        <div class="form-group">
                            <label>Tên <span>*</span></label>
                            <input type="text" class="form-control" name="data[name]" value="{{$item->name}}" required/>
                        </div>


                        <div class="form-group">
                            <label>Mô tả <span></span></label>
                            <textarea type="text" class="form-control" name="data[description]">{{$item->description}}</textarea>
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
