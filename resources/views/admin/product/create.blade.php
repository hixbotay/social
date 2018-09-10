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
                            <label>Chọn đại lý <span>*</span></label>
                            <input type="text" class="form-control" name="data[user_id]" required />
                        </div>

                        <div class="form-group">
                            <label>Chọn quán cafe <span>*</span></label>
                            <input type="text" class="form-control" name="data[agency_id]" required />
                        </div>

                        <div class="form-group">
                            <label>Danh mục sản phẩm <span>*</span></label>
                            <input type="text" class="form-control" name="data[category_id]" required />
                        </div>

                        <div class="form-group">
                            <label>Tên sản phẩm <span>*</span></label>
                            <input type="text" class="form-control" name="data[name]" required />
                        </div>

                        <div class="form-group">
                            <label>Content<span></span></label>
                            <textarea class="form-control" name="data[content]" id="summary-ckeditor"></textarea>
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

    <script src="{{ asset('vendor/unisharp/laravel-ckeditor/ckeditor.js') }}"></script>
    <script>
        CKEDITOR.replace( 'summary-ckeditor', {
            filebrowserBrowseUrl: '{{ asset('public/ckfinder/ckfinder.html') }}',
            filebrowserImageBrowseUrl: '{{ asset('public/ckfinder/ckfinder.html?type=Images') }}',
            filebrowserFlashBrowseUrl: '{{ asset('public/ckfinder/ckfinder.html?type=Flash') }}',
            filebrowserUploadUrl: '{{ asset('public/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files') }}',
            filebrowserImageUploadUrl: '{{ asset('public/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images') }}',
            filebrowserFlashUploadUrl: '{{ asset('public/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Flash') }}'
        } );
    </script>

@endsection
