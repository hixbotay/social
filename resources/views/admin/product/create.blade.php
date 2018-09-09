@extends('layouts.admin')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <h4 class="m-b-20 header-title">Tạo sản phẩm</h4>
                <form enctype='multipart/form-data' method="POST" action="{{url('admin?controller=Product&task=store')}}">
                    {{ csrf_field() }}
                    <div class="col-sm-12">

                        <div class="form-group">
                            <label>Tên sản phẩm <span>*</span></label>
                            <input type="text" class="form-control" name="data[name]" required />
                        </div>

                        <div class="form-group">
                            <label>Content<span></span></label>
                            <textarea class="form-control" name="data[content]"></textarea>
                        </div>

                        <div class="form-group">
                            <label>Giá<span></span></label>
                            <input type="number" step="0.01" name="data[price]" class="form-control">
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
