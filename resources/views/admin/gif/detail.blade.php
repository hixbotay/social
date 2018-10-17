@extends('layouts.admin')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <h4 class="m-b-20 header-title">Thêm quà tặng</h4>
                <form enctype='multipart/form-data' method="POST" action="{{url('admin?controller=Gif&task=update&id='.$item->id)}}">
                    {{ csrf_field() }}
                    <div class="col-sm-12">

                        <div class="form-group">
                            <label>Danh mục <span>*</span></label>
                            <select name="data[category_id]" required class="form-control">
                                <option value="">Chọn danh mục</option>
                                @foreach($listCat AS $value)
                                    <option @if($value->id == $item->category_id) selected @endif
                                            value="{{$value->id}}">{{$value->name}}</option>
                                @endforeach
                            </select>
                        </div>

                        <div class="form-group">
                            <label>@lang('Tên quà tặng')<span></span></label>
                            <input type="text" value="{{$item->name}}" class="form-control" name="data[name]" required>
                        </div>


                        <div class="form-group">
                            <label>@lang('Giá')<span></span></label>
                            <input type="number" value="{{$item->price}}" step="0.01" class="form-control" name="data[price]" required>
                        </div>


                        <div class="form-group">
                            <label>@lang('Ảnh')<span></span></label>
                            <input type="file" class="filestyle" name="data[image]" data-buttonname="btn-default" id="filestyle-0" tabindex="-1" style="position: absolute; clip: rect(0px, 0px, 0px, 0px);"><div class="bootstrap-filestyle input-group"><input type="text" class="form-control " placeholder="" disabled=""> <span class="group-span-filestyle input-group-btn" tabindex="0"><label for="filestyle-0" class="btn btn-default "><span class="icon-span-filestyle glyphicon glyphicon-folder-open"></span> <span class="buttonText">Choose file</span></label></span></div>
                        </div>


                        <div class="form-group">
                            <label>@lang('Mô tả')<span></span></label>
                            <textarea class="form-control" name="data[description]">{{$item->description}}</textarea>
                        </div>

                    </div>
                    <div class="col-sm-12">
                        <button type="submit" class="btn btn-primary">Submit</button>
                        <a href="{{ url()->previous() }}">
                            <button type="button" class="btn btn-primary">Back</button>
                        </a>
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection
