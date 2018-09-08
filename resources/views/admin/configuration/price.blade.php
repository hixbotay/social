@extends('layouts.admin')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-sm-6">
                <h4 class="m-b-20 header-title">Cấu hình giá chung hệ thống</h4>
                <form enctype='multipart/form-data' method="POST" action="{{url('admin?controller=Configuration&task=store')}}">
                    {{ csrf_field() }}
                    <div class="col-sm-12">

                        <div class="form-group">
                            <label>Phí rút tiền <span>*</span></label>
                            <input class="form-control" type="number" step="0.01" name="data[params][withdraw_fee]" value="{{isset($params->withdraw_fee)?$params->withdraw_fee:null}}" required>
                        </div>

                        <div class="form-group">
                            <label>Thành viên nổi bật 24h <span>*</span></label>
                            <input class="form-control" type="number" step="0.01" name="data[params][featured_24h]" value="{{isset($params->featured_24h)?$params->featured_24h:null}}" required>
                        </div>

                        <div class="form-group">
                            <label>Phí nhắn tin 100 người <span>*</span></label>
                            <input class="form-control" type="number" step="0.01" name="data[params][message_100]" value="{{isset($params->message_100)?$params->message_100:null}}" required>
                        </div>

                        <div class="form-group">
                            <label>Hoa hồng gửi quà (%) <span>*</span></label>
                            <input class="form-control" type="number" step="0.01" name="data[params][gift_commission]" value="{{isset($params->gift_commission)?$params->gift_commission:null}}" required>
                        </div>


                        @for($i = 1; $i <= 6; $i++)

                        <?php $vip = 'vip_'.$i ?>

                        <div class="form-group">
                            <label>Phí nâng cấp vip {{$i}} tháng<span>*</span></label>
                            <input class="form-control" type="number" step="0.01" name="data[params][vip_{{$i}}]" value="{{isset($params->{$vip})?$params->{$vip}:null}}" required>
                        </div>

                        @endfor


                        <input type="hidden" name="data[name]" value="price">

                    </div>

                    <div class="col-sm-12">
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </div>


                </form>
            </div>
        </div>
    </div>
@endsection
