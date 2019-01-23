@extends('layouts.admin')


@section('content')


    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <h4 class="m-b-20 header-title">@lang('admin.PROFILE')</h4>

                @include('layouts.admin.notice')

                <form method="post" action="{{url('admin?controller=Profile&task=update&id=' . $item->id)}}" class="form-horizontal">

                    {{ csrf_field() }}

                    <div class="form-group">
                        <label>@lang('Tên') <span>*</span></label>
                        <input class="form-control" type="text" name="data[name]" value="<?= $item->name ?>" />
                    </div>

                    <div class="form-group">
                        <label>@lang('Email') <span>*</span></label>
                        <input class="form-control" type="text" name="data[email]" value="<?= $item->email ?>" disabled />
                    </div>

                    <div class="form-group">
                        <label>@lang('Mobile') <span>*</span></label>
                        <input class="form-control" type="text" name="data[email]" value="<?= $item->mobile ?>" disabled />
                    </div>

                    <div class="form-group">
                        <label>@lang('Địa chỉ')</label>
                        <input class="form-control" type="text" name="data[address]" value="<?= $item->address ?>" />
                    </div>

                    <div class="form-group">
                        <label>Tỉnh</label>

                        <select name="data[province_id]" class="form-control">
                            <option value="">Chọn tỉnh</option>
                            @foreach($province AS $value)
                                <option
                                        @if($value->matp == $item->province_id)
                                        selected
                                        @endif
                                        value="{{$value->matp}}">{{$value->name}}</option>
                            @endforeach
                        </select>

                    </div>

                    <div class="form-group">
                        <label>@lang('Chiều cao')</label>
                        <input class="form-control" type="text" name="data[height]" value="<?= $item->height ?>" />
                    </div>


                    <div class="form-group">
                        <label>@lang('Cân nặng')</label>
                        <input class="form-control" type="text" name="data[weight]" value="<?= $item->weight ?>" />
                    </div>


                    <div class="form-group">
                        <label>Học vấn</label>
                        <select name="data[education]" class="form-control">

                            <option value="">Chọn</option>
                            @foreach(App\Education::all() AS $value)

                                <option
                                        value="{{$value->id}}"
                                        @if($value->id == $item->education)
                                        selected
                                        @endif
                                >{{$value->name}}</option>

                            @endforeach

                        </select>
                    </div>

                    <div class="form-group">
                        <label>Nghề nghiệp</label>
                        {{\App\Job::select_job('data[job]', $item->job, null, null )}}
                    </div>
<!--
                    <div class="form-group">
                        <label>@lang('Tình trạng hôn nhân')</label>
                        <input class="form-control" type="text" name="data[marital_status]" value="<?= $item->weight ?>" />
                    </div>
-->

                    <div class="form-group">
                        <label>Sở thích</label>

                        @foreach(\App\Hobby::all() AS $value)

                            <div class="checkbox checkbox-info">
                                <input
                                        @foreach(\App\Hobby::get_hobby_by_user($item->id) AS $val)
                                        @if($val->hobby_id == $value->id)
                                        checked
                                        @endif
                                        @endforeach

                                        id="checkbox{{$value->id}}"
                                        value="{{$value->id}}"
                                        type="checkbox"
                                        name="favourite[]">
                                <label for="checkbox{{$value->id}}">{{$value->name}}</label>
                            </div>

                        @endforeach

                    </div>


                    <div class="form-group">
                        <button type="submit" class="btn btn-primary">@lang('admin.SUBMIT')</button>
                        <a href="{{url('admin')}}">
                            <button type="button" class="btn btn-dark">@lang('admin.BACK')</button>
                        </a>
                    </div>


                </form>
            </div>

        </div>
    </div>


@endsection