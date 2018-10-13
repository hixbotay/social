@extends('layouts.admin')

@section('content')

    <div class="row">
        <div class="col-sm-12">
            <div class="card-box">
                <h4 class="m-t-0">Quản lý giá hẹn hò</h4>


                @include('layouts.admin.notice')


                <div class="table-responsive">

                    <div class="row">
                        <div class="col-sm-6">
                        </div>
                        <div class="col-sm-6">
                            <div id="datatable-responsive_filter" class="dataTables_filter">
                                <a href="<?= url('/admin?controller=DatingPrice&task=create') ?>" type="button" class="btn btn-primary">
                                    Thêm
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
                            <th>Type</th>
                            <th>Nhóm tỉnh</th>
                            <th>Giá hẹn đôi (VND)</th>
                            <th>Giá hẹn nhóm Nam (VND)</th>
                            <th>Giá hẹn nhóm Nữ (VND)</th>
                            <th>#</th>
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
                                <td>{{$item->province_group_id}}</td>
                                <td>{{$item->double_dating_price}}</td>
                                <td>{{$item->group_dating_m_price}}</td>
                                <td>{{$item->group_dating_f_price}}</td>
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
