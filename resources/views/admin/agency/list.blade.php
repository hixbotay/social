@extends('layouts.admin')

@section('content')

    <h4 class="m-t-0 header-title">{{$title}}</h4>

    @include('layouts.admin.notice')

    <div class="row">

        <div class="col-sm-12">

            <div class="card-box">

                <div class="table-responsive">


                    <form name="filterUser" action="{{url('admin?view=Agency')}}" method="GET">

                        <div class="row">

                            @if($currentUser->group->key == config('auth.usergroup.administrator'))

                                <div class="col-sm-4">
                                    <div class="form-group">
                                        <label>Đại lý</label>

                                        <div>
                                            <select name="filter[user_id]" id="user_id" class="form-control">
                                                <option value="">@lang('admin.SELECT_USER')</option>
                                                @foreach($users AS $user)
                                                    <option
                                                            @if(isset($filter['user_id']) && $user->id == $filter['user_id'])
                                                            selected
                                                            @endif
                                                            value="{{$user->id}}">{{$user->name}}</option>
                                                @endforeach
                                            </select>
                                        </div>
                                    </div>
                                </div>

                            @endif

                            <div class="col-sm-4">
                                <div class="form-group">
                                    <label>Tên Quán</label>
                                    <div>
                                        <input type="text" name="filter[name]" class="form-control"
                                               value="{{isset($filter['name'])?$filter['name']:null}}"/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm-4">
                                <button type="submit" class="btn btn-primary"><i class="mdi mdi-filter-outline"></i> Lọc
                                </button>
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
                                <a href="<?= url('/admin?controller=Agency&task=create&type=') . $type ?>" type="button"
                                   class="btn btn-primary">
                                    Thêm
                                </a>
                                <button type="button" onclick="javascrip:alert('Đang nâng cấp ...')"
                                        class="btn btn-primary">Xóa
                                </button>
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
                            <th>Tên quán</th>
                            <th>Địa chỉ</th>
                            <th>Ảnh đại diện</th>
                            <th>Status</th>
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
                                    <a href="{{url('admin?view=User&layout=edit&id='.$item->user_id)}}" target="_blank">
                                        {{$item->username}}
                                    </a>
                                </td>
                                <td>
                                    <a href="{{url('admin?view=Agency&layout=edit&id='.$item->id)}}">
                                        {{$item->name}}
                                    </a>
                                </td>
                                <td>{{$item->address}}</td>
                                <td>
                                    @if($item->image)
                                        <img style="width: 100px;height: 100px;" src="{{ $item->image }}" alt="Profile agency image">
                                    @endif
                                </td>
                                <td>
                                @php
                                $status = BookproHelper::getRegisterStatusAgency($item->register_status);
                                echo "<span class=".$status->class.">";
                                echo isset($status->name)?$status->name:null;
                                echo '</span>';

                                if ($item->register_status == 0 && $currentUser->is_admin == 1){
                                echo '<br><br><a onclick="return confirm(\'Are you sure?\')" class="btn btn-primary" href="admin?controller=Agency&task=approve&id=' . $item->id . '">Duyệt</a>';
                                }

                                @endphp
                                </td>
                            </tr>
                        @endforeach
                        </tbody>
                    </table>

                    {{ $items->links() }}

                </div>
            </div>
        </div>
    </div>
@endsection
