@extends('layouts.admin')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <h4 class="m-b-20 header-title">Tạo Job</h4>
                <form enctype='multipart/form-data' method="POST" action="{{url('admin?controller=Hobby&task=store')}}">
                    {{ csrf_field() }}
                    <div class="col-sm-12">
                        <div class="form-group">
                            <label>Name <span>*</span></label>
                            <input type="text" class="form-control" name="data[name]" required />
                        </div>
                        <div class="form-group">
                            <label>Description <span></span></label>
                            <textarea class="form-control" name="data[description]"></textarea>
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <button type="submit" class="btn btn-primary">Submit</button>
                        <button type="reset" class="btn btn-dark">Reset</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection
