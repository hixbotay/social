@extends('layouts.admin')

@section('content')

    <div class="row">
        <div class="col-sm-12">
            <div class="card-box">
                <h4 class="m-t-0">@lang('admin.DATING_PRICE_CONFIGURATION')</h4>

                @include('layouts.admin.notice')

                <div class="table-responsive">

                    <div class="row">
                        <div class="col-sm-6">
                        </div>
                        <div class="col-sm-6">
                            <div id="datatable-responsive_filter" class="dataTables_filter">
                                <a href="<?= url('/admin?controller=DatingPrice&task=create') ?>" type="button" class="btn btn-primary">
                                    @lang('admin.ADD')
                                </a>
                            </div>

                        </div>
                    </div>

                    <table class="table table-hover mails m-0 table table-actions-bar">
                        <thead>
                        <tr>
                            <th>
                                <div class="checkbox checkbox-primary checkbox-single m-r-15">
                                    <input id="action-checkbox" type="checkbox">
                                    <label for="action-checkbox"></label>
                                </div>
                            </th>
                            <th>@lang('admin.TYPE')</th>
                            <th>@lang('admin.PROVINCE_GROUP')</th>
                            <th>@lang('admin.COUPON_PRICE') (VND)</th>
                            <th>@lang('admin.GROUP_PRICE')  (@lang('admin.MAN')) ({{config('payment.currency.code')}})</th>
                            <th>@lang('admin.GROUP_PRICE') (@lang('admin.WOMAN')) ({{config('payment.currency.code')}})</th>
                            <th>@lang('admin.OPTION')</th>
                        </tr>
                        </thead>

                        <tbody>
                        @foreach($items AS $item)
                            <tr>
                                <td>
                                    <div class="checkbox checkbox-primary m-r-15">
                                        <input id="checkbox1" type="checkbox">
                                        <label for="checkbox1"></label>
                                    </div>

                                </td>
                                <td>
                                    {{$item->type}}
                                </td>
                                <td>
                                    <a href="{{url('admin?view=ProvinceGroup&layout=edit&id='.$item->province_group_id)}}" target="_blank">
                                        {{$item->province_group_name}}
                                    </a>
                                </td>
                                <td>{{($item->couple_dating_price)?number_format($item->couple_dating_price):null}}</td>
                                <td>{{($item->group_dating_m_price)?number_format($item->group_dating_m_price):null}}</td>
                                <td>{{($item->group_dating_f_price)?number_format($item->group_dating_f_price):null}}</td>
                                <td>
                                    <a href="{{url('admin?view=DatingPrice&layout=edit&id='.$item->id)}}">
                                        <button class="btn btn-icon btn-warning"> <i class="fa fa-wrench"></i> </button>
                                    </a>
                                    <button class="btn btn-icon btn-danger"> <i class="fa fa-remove"></i> </button>
                                </td>
                            </tr>
                        @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>


@endsection
