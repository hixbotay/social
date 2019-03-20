@extends('layouts.admin')

@section('content')

    <div class="row">
        <div class="col-sm-12">
            <div class="card-box">
                <h4 class="m-t-0">@lang('admin.EVENT')</h4>
                <hr>

                <form name="filterUser" action="{{url('/admin?view=AgencyCoupons')}}" method="GET">

                    <div class="row">
                        <div class="col-md-4">
                            <input type="text" class="form-control" placeholder="Keywork">
                        </div>
                        <div class="col-md-4">
                            <select id="inputState" class="form-control">
                                <option value="">@lang('admin.AGENCY') ...</option>
                                @foreach($agencies AS $value)
                                    <option value="{{ $value->id }}">{{ $value->name }}</option>
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

                    <input type="hidden" name="view" value="AgencyCoupons">

                </form>

                <hr>

                <div class="table-responsive">
                    <table class="table table-hover mails m-0 table table-actions-bar">
                        <thead>
                        <tr>
                            <th>Code</th>
                            <th>Giá trị</th>
                            <th>Ngày hiệu lực</th>
                            <th>Đại lý</th>
                        </tr>
                        </thead>

                        <tbody>

                        @foreach($items AS $item)
                            <tr>
                                <td>{{ $item->code }}</td>
                                <td>
                                    {{ $item->value }}
                                    @if($item->unit == 1)
                                        {{ 'VND' }}
                                    @else
                                        {{ '%' }}
                                    @endif
                                </td>
                                <td>{{ date('d-m-Y', strtotime($item->from_time)) . " ~ " . date('d-m-Y', strtotime($item->to_time)) }}</td>
                                <td>{{ \App\Agency::find($item->agency_id)->name }}</td>
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
