@extends('layouts.admin')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <h4 class="m-b-20 header-title">Tạo Đại Lý Cafe</h4>
                <form enctype='multipart/form-data' method="POST" action="{{url('admin?controller=Agency&task=store')}}">
                    {{ csrf_field() }}
                    <div class="col-sm-12">


                        <div class="form-group">
                            <label>Chủ sở hữu <span>*</span></label>
                            <select name="data[user_id]" class="form-control" required>
                                @foreach($users AS $value)
                                    <option value="{{$value->id}}">{{ $value->name . ' ' . $value->email }}</option>
                                @endforeach
                            </select>

                        </div>

                        <div class="form-group">
                            <label>Name <span>*</span></label>
                            <input type="text" class="form-control" name="data[name]" required />
                        </div>

                        <div class="form-group">
                            <label>Tỉnh/Thành phố<span></span></label>

                            <select name="data[province_id]" class="form-control" required>
                                @foreach(App\ProvinceGroup::all_province() AS $value)
                                    <option value="{{$value->matp}}">{{$value->name}}</option>
                                @endforeach
                            </select>
                        </div>


                        <div class="form-group">
                            <label>Quận/Huyện<span></span></label>

                            <select name="data[district_id]" class="form-control" required>
                                @foreach(App\ProvinceGroup::all_district() AS $value)
                                    <option value="{{$value->maqh}}">{{$value->name}}</option>
                                @endforeach
                            </select>
                        </div>



                        <div class="form-group">
                            <label>Địa chỉ<span></span></label>
                            <input type="text" name="data[address]" class="form-control" required>
                        </div>


                        <div class="form-group">
                            <div class="checkbox checkbox-primary">
                                <input id="authorized_dealer" type="checkbox" name="data[authorized_dealer]" value="1">
                                <label for="authorized_dealer">
                                    Đại lý ủy quyền
                                </label>
                            </div>
                        </div>


                        <div class="form-group">
                            <div class="checkbox checkbox-primary">
                                <input id="contract" type="checkbox" name="data[contract]" value="2">
                                <label for="contract">
                                    Đã ký hợp đồng
                                </label>
                            </div>
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
