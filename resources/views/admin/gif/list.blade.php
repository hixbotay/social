@extends('layouts.admin')

@section('content')

    <div class="row">
        <div class="col-sm-12">
            <div class="card-box">
                <h4 class="m-t-0">@lang('admin.GIF')</h4>

                @include('layouts.admin.notice')

                <div class="table-responsive">

                    <div class="row">
                        <div class="col-sm-6">
                        </div>
                        <div class="col-sm-6">
                            <div id="datatable-responsive_filter" class="dataTables_filter">
                                <a href="<?= url('/admin?controller=Gif&task=create') ?>" type="button" class="btn btn-primary">
                                    Thêm
                                </a>
                            </div>

                        </div>
                    </div>

                    <table class="table table-hover mails m-0 table table-actions-bar">
                        <thead>
                        <tr>
                            <th style="width: 5%">
                                <div class="checkbox checkbox-primary checkbox-single m-r-15">
                                    <input id="action-checkbox" type="checkbox">
                                    <label for="action-checkbox"></label>
                                </div>
                            </th>
                            <th>Tên</th>
                            <th>Giá</th>
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
                                    <a href="{{url('admin?view=Gif&layout=edit&id='.$item->id)}}">
                                    {{$item->name}}
                                    </a>
                                </td>
                                <td>{{$item->price}}</td>
                                <td>
                                    <a onclick="return confirm('Want to delete?')" href="{{url('admin?controller=Gif&task=destroy&id='.$item->id)}}">
                                        <button class="btn btn-icon btn-danger"> <i class="fa fa-remove"></i> </button>
                                    </a>
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
