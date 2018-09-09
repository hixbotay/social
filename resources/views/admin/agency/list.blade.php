@extends('layouts.admin')

@section('content')

    <div class="row">
        <div class="col-sm-12">
            <div class="card-box">
                <h4 class="m-t-0">Danh sách đại lý</h4>
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
                                <th>Chủ sở hữu</th>
                                <th>Tên đại lý</th>
                                <th>Địa chỉ</th>
                                <th>Đại lý ủy quyền</th>
                                <th>Hợp đồng</th>
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
                                <td>{{$item->name}}</td>
                                <td>{{$item->address}}</td>
                                <td>{{$item->authorized_dealer}}</td>
                                <td>{{$item->contract}}</td>
                            </tr>
                        @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
@endsection
