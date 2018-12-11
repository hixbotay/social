@extends('layouts.admin')


@section('content')

    <div class="row">
        <div class="col-sm-12">
            <div class="card-box">
                <h4 class="m-t-0">@lang('admin.ADS_ORDERS')</h4>

                @include('layouts.admin.notice')

                <div class="table-responsive">

                    <div class="row">
                        <div class="col-lg-3 col-sm-6">
                            <div class="widget-inline-box text-center">
                                <h3 class="m-t-10"><i class="text-primary mdi mdi-access-point-network"></i> <b data-plugin="counterup">100</b></h3>
                                <p class="text-muted">Tổng đơn hàng</p>
                            </div>
                        </div>

                        <div class="col-lg-3 col-sm-6">
                            <div class="widget-inline-box text-center">
                                <h3 class="m-t-10"><i class="text-custom mdi mdi-airplay"></i> <b data-plugin="counterup">5,000,000</b></h3>
                                <p class="text-muted">Tổng tiền</p>
                            </div>
                        </div>

                        <div class="col-lg-3 col-sm-6">
                            <div class="widget-inline-box text-center">
                                <h3 class="m-t-10"><i class="text-info mdi mdi-black-mesa"></i> <b data-plugin="counterup">80</b></h3>
                                <p class="text-muted">Đã thanh toán</p>
                            </div>
                        </div>

                        <div class="col-lg-3 col-sm-6">
                            <div class="widget-inline-box text-center b-0">
                                <h3 class="m-t-10"><i class="text-danger mdi mdi-cellphone-link"></i> <b data-plugin="counterup">20</b></h3>
                                <p class="text-muted">Chưa thanh toán</p>
                            </div>
                        </div>

                    </div>

                    <div style="margin-top: 40px;"></div>


                    <div class="row">
                        <div class="col-sm-6">
                        </div>
                        <div class="col-sm-6">

                            <div id="datatable-responsive_filter" class="dataTables_filter">
                                <a href="<?= url('/admin?controller=Ads&task=create') ?>" type="button" class="btn btn-primary">
                                    @lang('admin.ADD')
                                </a>
                            </div>

                        </div>
                    </div>

                    <table class="table table-hover mails m-0 table table-actions-bar">
                        <thead>
                        <tr>
                            <th>@lang('admin.USER')</th>
                            <th>@lang('admin.FROM_TIME')</th>
                            <th>@lang('admin.TO_TIME')</th>
                            <th>@lang('admin.PRICE')</th>
                            <th>@lang('admin.ADS_LOCATION')</th>
                            <th>@lang('Banner')</th>
                            <th>@lang('URL')</th>
                        </tr>
                        </thead>

                        <tbody>
                        @foreach($items AS $item)
                            <tr>
                                <td>
                                    {{$item->user_id}}
                                </td>
                                <td>
                                    {{$item->from_time}}
                                </td>
                                <td>
                                    {{$item->to_time}}
                                </td>
                                <td>
                                    {{number_format($item->total)}}
                                </td>
                                <td>
                                    {{$item->ads_location_id}}
                                </td>
                                <td>
                                    <img style="width: 100px; height: 100px;" src="{{$item->image}}" />
                                </td>
                                <td>
                                    {{$item->url}}
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