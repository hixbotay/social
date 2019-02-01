@extends('layouts.admin')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <h4 class="m-b-20 header-title">@lang('admin.PRODUCT_CATEGORY')</h4>
                <form enctype='multipart/form-data' method="POST" action="{{url('admin?controller=ProductCategory&task=store&type='.$type)}}">
                    {{ csrf_field() }}
                    <div class="col-sm-12">

                        <div class="form-group">
                            <label>@lang('admin.TYPE') <span>*</span></label>
                            <select name="data[type]" id="type" class="form-control">
                                <option value="1" @if($type == 1) selected @endif >@lang('admin.CAFE_STORE')</option>
                                <option value="2" @if($type == 2) selected @endif >@lang('admin.restaurant')</option>
                                <option value="3" @if($type == 3) selected @endif >@lang('admin.GIF')</option>
                            </select>
                        </div>


                        <div class="form-group">
                            <label>Tên danh mục <span>*</span></label>
                            <input type="text" class="form-control" name="data[name]" required />
                        </div>

                        <div class="form-group">
                            <label>Mô tả ngắn <span>*</span></label>
                            <textarea type="text" class="form-control" name="data[description]" required></textarea>
                        </div>

                        <div class="form-group">
                            <label class="control-label">Ảnh đại diện</label>
                            <input type="file" name="image" class="filestyle" data-buttonname="btn-primary">
                        </div>


                    </div>

                    <div class="col-sm-12">
                        <button type="submit" class="btn btn-primary">@lang('admin.SUBMIT')</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection

@section('javascript')
    <script type="text/javascript">
    </script>
@stop