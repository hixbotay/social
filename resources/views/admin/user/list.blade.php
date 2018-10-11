@extends('layouts.admin')

@section('content')

    <div class="row">
        <div class="col-sm-12">
            <div class="card-box">
                <h4 class="m-t-0">Danh sách user</h4>
                <div class="table-responsive">

                    <div class="row">
                        <div class="col-sm-6">
                        </div>
                        <div class="col-sm-6">
                            <div id="datatable-responsive_filter" class="dataTables_filter">
                                <a href="<?= url('/admin?controller=User&task=create') ?>" type="button" class="btn btn-primary">
                                    Thêm
                                </a>
                                <button type="button" onclick="javascrip:alert('Đang nâng cấp ...')" class="btn btn-primary">Xóa</button>
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
                                <th>Name</th>
                                <th>Email</th>
                                <th>Mobile</th>
                                <th>Address</th>
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

                                    <img src="{{$item->avatar}}" alt="avatar" title="avatar" class="img-circle thumb-sm" />
                                </td>

                                <td>
                                    <a href="{{url('admin?view=User&layout=edit&id='.$item->id)}}">{{$item->name}}</a>
                                </td>

                                <td>
                                    <a href="#" class="text-muted">{{$item->email}}</a>
                                </td>

                                <td>
                                    <b><a href="" class="text-dark"><b>{{$item->mobile}}</b></a> </b>
                                </td>

                                <td>{{$item->address}}</td>

                                <td>
                                    <a href="{{url('admin?controller=User&task=destroy&id='.$item->id)}}">
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
