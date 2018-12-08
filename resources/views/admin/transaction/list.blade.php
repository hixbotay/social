@extends('layouts.admin')

@section('content')

    <div class="row">
        <div class="col-sm-12">
            <div class="card-box">
                <h4 class="m-t-0">@lang('admin.TRANSACTION')</h4>

                <hr />

                @include('layouts.admin.notice')

                <form name="filterUser" action="{{url('admin?view=Transaction')}}" method="GET">

                    <div class="row">

                        <div class="col-sm-4">
                            <div class="form-group">
                                <label>Users</label>
                                <div>
                                    <select class="form-control" name="filter[user_id]">
                                        <option value="">@lang('admin.SELECT_USER')</option>
                                        @foreach($users AS $user)
                                            <option
                                                @if(isset($filter['user_id']) && $filter['user_id'] == $user->id)
                                                    selected
                                                @endif
                                                value="{{$user->id}}">{{$user->name}}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-4">
                            <div class="form-group">
                                <label>@lang('admin.TIME')</label>
                                <div>
                                    <div class="input-daterange input-group" id="date-range">
                                        <input type="text" class="form-control" name="filter[time_from]" value="<?= isset($filter['time_from'])?$filter['time_from']:null ?>">
                                        <span class="input-group-addon b-0">Tới</span>
                                        <input type="text" class="form-control" name="filter[time_to]" value="<?= isset($filter['time_to'])?$filter['time_to']:null ?>">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-sm-4">
                            <button type="submit" class="btn btn-primary"><i class="mdi mdi-filter-outline"></i> @lang('admin.FILTER')</button>
                            <a href="{{url('/admin?view=Transaction')}}">
                                <button type="button" class="btn btn-primary">
                                    <i class="mdi mdi-notification-clear-all"></i> @lang('admin.RESET')
                                </button>
                            </a>
                        </div>
                    </div>

                    <input type="hidden" name="view" value="Transaction">

                </form>


                <div class="table-responsive">

                    <div class="row">
                        <div class="col-sm-6">
                        </div>
                        <div class="col-sm-6">
                            <div id="datatable-responsive_filter" class="dataTables_filter">
                                <a href="<?= url('/admin?controller=Transaction&task=create') ?>" type="button" class="btn btn-primary">
                                    @lang('admin.ADD')
                                </a>
                                {{--<button type="button" onclick="javascrip:alert('Đang nâng cấp ...')" class="btn btn-primary">--}}
                                    {{--@lang('admin.DELETE')--}}
                                {{--</button>--}}
                            </div>

                        </div>
                    </div>

                    <table class="table table-hover mails m-0 table table-actions-bar">
                        <thead>
                            <tr>
                                <th style="min-width: 95px;">
                                    <div class="checkbox checkbox-primary checkbox-single m-r-15">
                                        <input id="action-checkbox" type="checkbox">
                                        <label for="action-checkbox"></label>
                                    </div>
                                </th>
                                <th>@lang('admin.USER')</th>
                                <th>@lang('admin.PAYMENT_TYPE')</th>
                                <th>@lang('admin.PAYMENT_STATUS')</th>
                                <th>@lang('admin.DATE')</th>
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
                                    <a href="{{url('/admin?view=User&layout=edit&id=' . $item->user_id)}}" target="_blank">
                                        {{$item->name}}
                                    </a>
                                </td>

                                <td>
                                    {{ $item->pay_type }}
                                </td>
                                {{--<h3 class="panel-title">Panel Success</h3>--}}
                                <td>{{ ($item->pay_status == 1)?@__('admin.SUCCESS'):__('admin.FAIL') }}</td>

                                <td>{{$item->updated_at}}</td>

                                <td>
                                    <a href="{{url('admin?view=Transaction&layout=edit&id='.$item->id)}}">
                                        <button class="btn btn-sm btn-info">@lang('admin.DETAIL')</button>
                                    </a>
                                </td>
                            </tr>


                            @endforeach


                        </tbody>
                    </table>
                </div>
                {{ $items->links() }}
            </div>
        </div>
    </div>
@endsection


@section('javascript')
    <script type="text/javascript">
        $('.input-daterange').datepicker();
    </script>
@stop

