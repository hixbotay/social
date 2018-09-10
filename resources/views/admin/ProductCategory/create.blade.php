@extends('layouts.admin')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <h4 class="m-b-20 header-title">Tạo danh mục sản phẩm</h4>
                <form enctype='multipart/form-data' method="POST" action="{{url('admin?controller=ProductCategory&task=store')}}">
                    {{ csrf_field() }}
                    <div class="col-sm-12">

                        <div class="form-group">
                            <label>Tên danh mục <span>*</span></label>
                            <input type="text" class="form-control" name="data[name]" required />
                        </div>

                        <div class="form-group">
                            <label>Mô tả ngắn <span>*</span></label>
                            <textarea type="text" class="form-control" name="data[description]" required></textarea>
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
