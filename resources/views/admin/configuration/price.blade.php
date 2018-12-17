@extends('layouts.admin')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <h4 class="m-b-20 header-title">@lang('admin.SYSTEM_PRICE_CONFIGURATION')</h4>

                @include('layouts.admin.notice')

                <form enctype='multipart/form-data' method="POST" action="{{url('admin?controller=Configuration&task=store')}}">
                    {{ csrf_field() }}
                    <div class="col-sm-12">

                        <div class="form-group">
                            <label>@lang('admin.WITHDRAW_FEE') <span>*</span></label>
                            <input class="form-control" type="number" step="0.01" name="data[params][withdraw_fee]" value="{{isset($params->withdraw_fee)?$params->withdraw_fee:null}}" required>
                        </div>

                        <div class="form-group">
                            <label>@lang('admin.FEATURED_24H') <span>*</span></label>
                            <input class="form-control" type="number" step="0.01" name="data[params][featured_24h]" value="{{isset($params->featured_24h)?$params->featured_24h:null}}" required>
                        </div>

                        <div class="form-group">
                            <label>@lang('admin.MESSAGE_100FEE') <span>*</span></label>
                            <input class="form-control" type="number" step="0.01" name="data[params][message_100]" value="{{isset($params->message_100)?$params->message_100:null}}" required>
                        </div>

                        <div class="form-group">
                            <label>@lang('admin.GIF_COMMISSION') (%) <span>*</span></label>
                            <input class="form-control" type="number" step="0.01" name="data[params][gift_commission]" value="{{isset($params->gift_commission)?$params->gift_commission:null}}" required>
                        </div>


                        @for($i = 1; $i <= 6; $i++)

                        <?php $vip = 'vip_'.$i ?>

                        <div class="form-group">
                            <label>@lang('admin.VIP_FEE') {{$i}} @lang('admin.MONTH')<span>*</span></label>
                            <input class="form-control" type="number" step="0.01" name="data[params][vip_{{$i}}]" value="{{isset($params->{$vip})?$params->{$vip}:null}}" required>
                        </div>

                        @endfor

                        <div class="form-group">
                            <label>@lang('admin.VIP_FEE') @lang('admin.FOREVER')<span>*</span></label>
                            <input class="form-control" type="number" step="0.01" name="data[params][vip_forever]" value="{{isset($params->vip_forever)?$params->vip_forever:null}}" required>
                        </div>


                        <input type="hidden" name="data[name]" value="price">

                    </div>

                    <div class="col-sm-12">
                        <button type="submit" class="btn btn-primary">@lang('admin.SUBMIT')</button>
                    </div>


                </form>
            </div>
        </div>
    </div>
@endsection
