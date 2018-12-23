@extends('layouts.admin')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <h4 class="m-b-20 header-title">@lang('admin.PRODUCT')</h4>
                <form enctype='multipart/form-data' method="POST" action="{{url('admin?controller=Product&task=store')}}">
                    {{ csrf_field() }}
                    <div class="col-sm-12">

                        <div class="form-group">
                            <label>@lang('admin.STORE') <span>*</span></label>
                            <select name="data[agency_id]" class="form-control" required>
                                <option value="">@lang('admin.CHOOSE_AGENCY')</option>
                                @foreach($store AS $value)
                                <option value="{{$value->id}}">{{$value->name}}</option>
                                @endforeach
                            </select>
                        </div>

                        <div class="form-group">
                            <label>@lang('admin.PRODUCT_CATEGORY') <span>*</span></label>
                            <select name="data[category_id]" class="form-control" required>
                                <option value="">@lang('admin.PRODUCT_CATEGORY')</option>
                                @foreach($categories AS $value)
                                    <option value="{{$value->id}}">{{$value->name}}</option>
                                @endforeach
                            </select>
                        </div>

                        <div class="form-group">
                            <label>@lang('admin.PRODUCT_NAME') <span>*</span></label>
                            <input type="text" class="form-control" name="data[name]" required />
                        </div>

                        <div class="form-group">
                            <label>@lang('admin.CONTENT')<span></span></label>
                            <textarea class="form-control" name="data[content]" id="summary-ckeditor"></textarea>
                        </div>

                        <div class="form-group">
                            <label>@lang('admin.PRICE')<span></span></label>
                            <input type="number" step="0.01" name="data[price]" class="form-control" required>
                        </div>

                    </div>

                    <input type="hidden" name="data[type]" value="{{$type}}">
                    <div class="col-sm-12">
                        <button type="submit" class="btn btn-primary">@lang('admin.SUBMIT')</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

@section('javascript')
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
@stop


@endsection
