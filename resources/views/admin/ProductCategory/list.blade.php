@extends('layouts.admin')

@section('content')

    <div class="row">
        <div class="col-sm-12">
            <div class="card-box">
                <h4 class="m-t-0">{{$title}}</h4>

                @include('layouts.admin.notice')

                <div class="table-responsive">

                    <div class="row">
                        <div class="col-sm-6">
                        </div>
                        <div class="col-sm-6">
                            <div id="datatable-responsive_filter" class="dataTables_filter">
                                <a href="<?= url('/admin?controller=ProductCategory&task=create&type=') . $type ?>" type="button" class="btn btn-primary">
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
                            <th>
                                <div class="checkbox checkbox-primary checkbox-single m-r-15">
                                    <input id="action-checkbox" type="checkbox">
                                    <label for="action-checkbox"></label>
                                </div>
                            </th>
                            <th>@lang('admin.NAME')</th>
                            <th>@lang('admin.DESCRIPTION')</th>
                            @if($currentUser->is_admin != 1)
                                <th>@lang('admin.OWNER')</th>
                            @endif
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
                                <td><a href="{{url('admin?view=ProductCategory&layout=edit&id='.$item->id.'&type='.$item->type)}}"> {{$item->name}} </a> </td>
                                <td>{{$item->description}}</td>
                                @if($currentUser->is_admin != 1)
                                    <td>
                                    @if(!$item->user_id)
                                        <span style="background: gold;font-style: italic;">@lang('admin.SYSTEM')</span>
                                    @endif
                                    </td>
                                @endif
                            </tr>
                        @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
@endsection
