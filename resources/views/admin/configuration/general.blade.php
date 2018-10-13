@extends('layouts.admin')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-sm-6">
                <h4 class="m-b-20 header-title">Cấu hình chung</h4>


                @if(!empty(Session::get('success')))
                    <div class="alert alert-success alert-dismissible fade in" role="alert">
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                        <strong>Thành công!</strong> {!! Session::get('success')[0] !!}
                    </div>
                @endif

                @if($errors->any())
                    <div class="alert alert-danger alert-dismissible fade in" role="alert">
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                        <strong>Lỗi!</strong> {{$errors->first()}}
                    </div>
                @endif


                <form enctype='multipart/form-data' method="POST" action="{{url('admin?controller=Configuration&task=store')}}">
                    {{ csrf_field() }}
                    <div class="col-sm-12">

                        <div class="form-group">
                            <label>Tiêu đề <span>*</span></label>
                            <input type="text" value="{{isset($params->title)?$params->title:null}}" class="form-control" name="data[params][title]" required />
                        </div>

                        <div class="form-group">
                            <label>Mô tả <span>*</span></label>
                            <textarea class="form-control" name="data[params][description]" required>{{isset($params->description)?$params->description:null}}</textarea>
                        </div>

                    </div>

                    <div class="col-sm-12">
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </div>


                    <input type="hidden" name="data[name]" value="general">

                </form>
            </div>
        </div>
    </div>
@endsection
