@extends('layouts.admin')

@section('content')

    <div class="row">
        <div class="col-sm-12">
            <div class="card-box">
                <h4 class="m-t-0">@lang('admin.EVENT')</h4>
                <hr>

                <div class="table-responsive">
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
                            <th>Min/Max</th>
                            <th>@lang('admin.START_TIME')</th>
                            <th>@lang('admin.CREATOR')</th>
                            <th>@lang('admin.TYPE')</th>
                            <th>@lang('admin.AGENCY')</th>
                            <th>@lang('admin.STATUS')</th>
                            <th>@lang('admin.OPTION')</th>
                        </tr>
                        </thead>

                        <tbody>

                        @foreach($items AS $item)

                            @php
                                $status = \App\Event::getStatusById($item->status);
                                $type = \App\Event::getDatingTypeById($item->type);
                            @endphp

                            <tr>
                                <td>
                                    <div class="checkbox checkbox-primary m-r-15">
                                        <input id="checkbox1" type="checkbox">
                                        <label for="checkbox1"></label>
                                    </div>
                                </td>

                                <td>
                                    <a href="admin?view=Event&layout=editEvent&id={{$item->id}}">
                                        {{$item->name}}
                                    </a>
                                </td>

                                <td>
                                    {{$item->min_number . "/" . $item->limit_number}}
                                </td>

                                <td>{{$item->start_time}}</td>

                                <td>{{$item->creator_name}}</td>
                                <td>@lang('admin.'.$type->label)</td>
                                <td>{{$item->agency_name}}</td>
                                <td><span style="color: {{$status->color}}">@lang('admin.'.$status->label)</span></td>

                                <td>
                                    @if($item->is_agency_approved != 1 && $currentUser->is_admin != 1)
                                        <a href="#">
                                            <button class="btn btn-sm btn-primary">Duyệt</button>
                                        </a>
                                    @endif

                                    <a href="{{url('admin?controller=Post&task=destroy&id='.$item->id)}}" onclick="return confirm('Want to delete?')">
                                        <button class="btn btn-sm btn-danger">@lang('admin.DELETE')</button>
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
