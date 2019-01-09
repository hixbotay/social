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
                        <button type="submit" class="btn btn-primary">@lang('admin.SUBMIT')</button>
                    </div>
                </form>
            </div>
        </div>
    </div>


    <div id="con-close-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h4 class="modal-title">Modal Content is Responsive</h4>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="field-1" class="control-label">Name</label>
                                <input type="text" class="form-control" id="field-1" placeholder="John">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="field-2" class="control-label">Surname</label>
                                <input type="text" class="form-control" id="field-2" placeholder="Doe">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label for="field-3" class="control-label">Address</label>
                                <input type="text" class="form-control" id="field-3" placeholder="Address">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="field-4" class="control-label">City</label>
                                <input type="text" class="form-control" id="field-4" placeholder="Boston">
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="field-5" class="control-label">Country</label>
                                <input type="text" class="form-control" id="field-5" placeholder="United States">
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="field-6" class="control-label">Zip</label>
                                <input type="text" class="form-control" id="field-6" placeholder="123456">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group no-margin">
                                <label for="field-7" class="control-label">Personal Info</label>
                                <textarea class="form-control autogrow" id="field-7" placeholder="Write something about yourself" style="overflow: hidden; word-wrap: break-word; resize: horizontal; height: 104px;"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-info waves-effect waves-light">Save changes</button>
                </div>
            </div>
        </div>
    </div><!-- /.modal -->



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
