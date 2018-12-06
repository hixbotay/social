@extends('layouts.admin')

@section('content')

    <div class="row">
        <div class="col-sm-12">
            <div class="card-box">
                <h4 class="m-t-0">@lang('admin.ACCOUNT_GROUP')</h4>

                @include('layouts.admin.notice')

                <div class="table-responsive">

                    <div class="row">
                        <div class="col-sm-6">
                        </div>
                        <div class="col-sm-6">
                            <div id="datatable-responsive_filter" class="dataTables_filter">
                                <a href="<?= url('/admin?controller=UserGroup&task=create') ?>" type="button" class="btn btn-primary">
                                    Thêm
                                </a>
                            </div>

                        </div>
                    </div>

                    <table class="table table-hover mails m-0 table table-actions-bar">
                        <thead>
                            <tr>
                                <th>@lang('admin.ACCOUNT_GROUP')</th>
                            </tr>
                        </thead>

                        <tbody>
                        @foreach($items AS $item)
                            <tr>

                                <td>
                                    <a href="{{url('admin?view=UserGroup&layout=edit&id='.$item->id)}}">
                                        {{$item->name}}
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
