@extends('layouts.admin')

@section('content')


    <h4 class="m-t-0 header-title">Quản lý quán cafe</h4>

    @include('layouts.admin.notice')

    <div class="row">

        <div class="col-sm-12">

            <div class="card-box">

                <div class="table-responsive">


                    <form name="filterUser" action="{{url('admin?view=User')}}" method="GET">

                        <div class="row">

                            <div class="col-sm-4">
                                <div class="form-group">
                                    <label>Đại lý</label>
                                    <div>
                                        <select>

                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="col-sm-4">
                                <div class="form-group">
                                    <label>Thời gian</label>
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
                                <button type="submit" class="btn btn-primary"><i class="mdi mdi-filter-outline"></i> Lọc</button>
                                <a href="{{url('/admin?view=Agency')}}">
                                    <button type="button" class="btn btn-primary">
                                        <i class="mdi mdi-notification-clear-all"></i> Reset
                                    </button>
                                </a>
                            </div>
                        </div>

                        <input type="hidden" name="view" value="Agency">

                    </form>



                    <div class="row">
                        <div class="col-sm-6">
                        </div>
                        <div class="col-sm-6">
                            <div id="datatable-responsive_filter" class="dataTables_filter">
                                <a href="<?= url('/admin?controller=Agency&task=create') ?>" type="button" class="btn btn-primary">
                                    Thêm
                                </a>
                                <button type="button" onclick="javascrip:alert('Đang nâng cấp ...')" class="btn btn-primary">Xóa</button>
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
                            <th>Chủ sở hữu</th>
                            <th>Tên đại lý</th>
                            <th>Địa chỉ</th>
                            <th>Ảnh đại diện</th>
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
                                <td>{{$item->user_id}}</td>
                                <td>
                                    <a href="{{url('admin?view=Agency&layout=edit&id='.$item->id)}}">
                                    {{$item->name}}
                                    </a>
                                </td>
                                <td>{{$item->address}}</td>
                                <td>{{$item->image}}</td>
                            </tr>
                        @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
@endsection
