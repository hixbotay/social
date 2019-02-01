<?php
//echo "<pre>";
//print_r($item->image);
//die;
?>

@extends('layouts.admin')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <h4 class="m-b-20 header-title">Danh mục sản phẩm</h4>
                <form enctype='multipart/form-data' method="POST" action="{{url('admin?controller=ProductCategory&task=update&id='.$item->id.'&type='.$item->type)}}">
                    {{ csrf_field() }}
                    <div class="col-sm-12">

                        <div class="form-group">
                            <label>Tên danh mục <span>*</span></label>
                            <input type="text" class="form-control" name="data[name]" value="{{$item->name}}" required />
                        </div>

                        <div class="form-group">
                            <label>Mô tả ngắn <span>*</span></label>
                            <textarea type="text" class="form-control" name="data[description]" required>{{$item->description}}</textarea>
                        </div>

                        <div class="form-group">
                            <img style="width: 200px;" id="image" src="<?= $item->image ?>" />
                        </div>

                        <div class="form-group">
                            <label class="control-label">Ảnh đại diện</label>
                            <input type="file" name="image" class="filestyle" data-buttonname="btn-primary">
                        </div>

                    </div>

                    <input type="hidden" name="data[type]" value="{{$item->type}}">

                    <div class="col-sm-12">
                        @if($currentUser->id == $item->user_id)
                        <button type="submit" class="btn btn-primary">@lang('admin.SUBMIT')</button>
                        @endif
                        <a href="{{'admin?view=ProductCategory&type='.$type}}">
                            <button type="button" class="btn btn-primary">@lang('admin.BACK')</button>
                        </a>
                    </div>
                </form>
            </div>
        </div>
    </div>



@endsection


@section('javascript')
    <script type="text/javascript">


        jQuery('.filestyle').hover(function () {
            alert();
        })

        function readURL(input) {

            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function(e) {
                    $('#blah').attr('src', e.target.result);
                }

                reader.readAsDataURL(input.files[0]);
            }
        }

        $("#imgInp").change(function() {
            readURL(this);
        });

    </script>
@stop
