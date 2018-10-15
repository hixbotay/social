@extends('layouts.admin')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <h4 class="m-b-20 header-title">Nhóm tỉnh</h4>
                @include('layouts.admin.notice')
                <form method="post" action="{{url('admin?controller=ProvinceGroup&task=update&id='.$item->id)}}" class="form-horizontal">

                    {{ csrf_field() }}

                        <div class="form-group">
                            <label>Tên nhóm <span>*</span></label>
                            <input type="text" value="{{$item->name}}" class="form-control" name="data[name]" required />
                        </div>

                        @foreach($province AS $value)


                            <div class="checkbox checkbox-custom">
                                <input
                                        id="province_{{$value->matp}}"

                                        @foreach(json_decode($item->province_ids) AS $val)

                                            @if($val == $value->matp)
                                                checked
                                            @endif

                                        @endforeach

                                        type="checkbox" name="data[province_ids][]" value="{{$value->matp}}">
                                <label for="province_{{$value->matp}}">
                                    {{$value->name}}
                                </label>

                            </div>


                        @endforeach


                    <div class="form-group">
                        <button type="submit" class="btn btn-primary">Submit</button>

                        <a href="{{ url('admin?view=ProvinceGroup') }}">
                            <button type="button" class="btn btn-dark">Back</button>
                        </a>
                    </div>


                </form>
            </div>

        </div>
    </div>
@endsection
