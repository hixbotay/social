@extends('layouts.admin')

@section('content')

    <div class="row">
        <div class="col-sm-12">
            <div class="card-box">
                <h4 class="m-t-0">@lang('admin.EVENT_SCHEDULE')</h4>
                <div class="table-responsive">
                    <table class="table table-hover mails m-0 table table-actions-bar">
                        <thead>
                            <tr>
                                <th style="min-width: 95px;">
                                    <div class="checkbox checkbox-primary checkbox-single m-r-15">
                                        <input id="action-checkbox" type="checkbox">
                                        <label for="action-checkbox"></label>
                                    </div>
                                </th>
                                <th>Name</th>
                                <th>Address ID</th>
                                <th>Limit Number</th>
                                <th>Start Date</th>
                                <th>Start time</th>
                                <th>Option</th>
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
                                    <a href="{{url('admin?view=Event&layout=edit&id='.$item->id)}}"">
                                        {{$item->name}}
                                    </a>
                                </td>

                                <td>
                                    {{$item->address_id}}
                                </td>

                                <td>
                                    {{$item->limit_number}}
                                </td>

                                <td>
                                    {{$item->start_date}}
                                </td>

                                <td>
                                    {{$item->start_time}}
                                </td>
                                
                                <td>
                                    <a href="{{url('admin?controller=Event&task=destroy&id='.$item->id)}}">
                                        <button class="btn btn-sm btn-danger">Delete</button>
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
