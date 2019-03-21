@extends('layouts.admin')

@section('content')

    <div class="row">
        <div class="col-sm-12">
            <div class="card-box">
                <h4 class="m-t-0">@lang('Nhân viên đại lý')</h4>
                <hr>

                <form name="filterUser" action="{{url('/admin?view=AgencyEmployee')}}" method="GET">

                    <div class="row">
                        <div class="col-md-4">
                            <input type="text" class="form-control" placeholder="Keywork">
                        </div>
                        <div class="col-md-4">
                            <select id="inputState" class="form-control" name="filter[agency_id]">
                                <option value="">@lang('admin.AGENCY') ...</option>
                                @foreach($agencies AS $value)
                                    <option
                                        @if(isset($filter['agency_id']) && $filter['agency_id'] == $value->id)
                                            selected
                                        @endif
                                        value="{{ $value->id }}">{{ $value->name }}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="col-md-4">
                            <button class="btn btn-primary btn-block">
                                @lang('admin.FILTER')
                            </button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4"></div>
                        <div class="col-md-4"></div>
                        <div class="col-md-4"></div>
                    </div>

                    <input type="hidden" name="view" value="AgencyEmployee">

                </form>

                <hr>

                <div class="table-responsive">
                    <table class="table table-hover mails m-0 table table-actions-bar">
                        <thead>
                        <tr>
                            <th>Đại lý</th>
                            <th>Nhân viên</th>
                            <th></th>
                        </tr>
                        </thead>

                        <tbody>

                        @foreach($items AS $item)
                            <tr>
                                <td>{{ $item->agency_name }}</td>
                                <td>
                                    {{ $item->employee_name }}
                                </td>
                                <td>
                                    <button class="btn btn-sm btn-danger">Sa thải</button>
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
