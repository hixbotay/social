@extends('layouts.admin')


@section('content')

    <div class="row">
        <div class="col-sm-12">
            <div class="card-box">
                <h4 class="m-t-0">@lang('admin.ADS_LOCATION')</h4>

                @include('layouts.admin.notice')

                <div class="table-responsive">

                    <div class="row">
                        <div class="col-sm-6">
                        </div>
                        <div class="col-sm-6">
                            <div id="datatable-responsive_filter" class="dataTables_filter">
                                <a href="<?= url('/admin?controller=AdsLocations&task=create') ?>" type="button" class="btn btn-primary">
                                    @lang('admin.ADD')
                                </a>
                                <button type="button" onclick="javascrip:alert('Đang nâng cấp ...')" class="btn btn-primary">
                                    @lang('admin.DELETE')
                                </button>
                            </div>

                        </div>
                    </div>

                    <table class="table table-hover mails m-0 table table-actions-bar">
                        <thead>
                        <tr>
                            <th>@lang('admin.PARENT')</th>
                            <th>@lang('admin.NAME')</th>
                            <th>@lang('admin.PRICE')</th>
                            <th>@lang('admin.CODE')</th>
                        </tr>
                        </thead>

                        <tbody>
                        @foreach($items AS $item)
                            <tr>
                                <td>
                                    @if($item->parent_id == 0)
                                        Vị trí gốc
                                    @else
                                        Vị trí XXX
                                    @endif
                                </td>
                                <td>
                                    <a href="{{url('admin?view=AdsLocations&layout=edit&id='.$item->id)}}">
                                        {{$item->name}}
                                    </a>
                                </td>
                                <td>
                                    {{number_format($item->price)}}
                                </td>
                                <td>
                                    {{$item->code}}
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