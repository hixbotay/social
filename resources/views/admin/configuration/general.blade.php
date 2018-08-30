@extends('layouts.admin')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-sm-6">
                <h4 class="m-b-20 header-title">Cấu hình chung</h4>
                <form enctype='multipart/form-data' method="POST" action="{{url('admin?controller=Configuration&task=store')}}">
                    {{ csrf_field() }}
                    <div class="col-sm-12">

                        <div class="form-group">
                            <label>Tiêu đề <span>*</span></label>
                            <input type="text" value="{{$params->title}}" class="form-control" name="data[params][title]" required />
                        </div>

                        <div class="form-group">
                            <label>Mô tả <span>*</span></label>
                            <textarea class="form-control" name="data[params][description]" required>{{$params->description}}</textarea>
                        </div>

                    </div>

                    <div class="col-sm-12">
                        <button type="submit" class="btn btn-primary">Submit</button>
                        <button type="reset" class="btn btn-dark">Reset</button>
                    </div>


                    <input type="hidden" name="data[name]" value="general">

                </form>
            </div>
        </div>
    </div>
@endsection
