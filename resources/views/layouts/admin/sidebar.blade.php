<div class="scrollbar-wrapper">
    <div>
        <button type="button" class="button-menu-mobile btn-mobile-view visible-xs visible-sm">
            <i class="mdi mdi-close"></i>
        </button>
        <!-- User Detail box -->
        <div class="user-details">
            <div class="pull-left">
                <img src="assets/images/users/avatar-1.jpg" alt="" class="thumb-md img-circle">
            </div>
            <div class="user-info">
                <a href="{{URL::to('/admin?view=Profile')}}">{{$currentUser->name}}</a>
                <p class="text-muted m-0">{{$currentUser->group->name}}</p>
            </div>
        </div>
        <!--- End User Detail box -->

        <!-- Left Menu Start -->

        <ul class="metisMenu nav" id="side-menu">
            <li>
                <a href="{{url('/admin')}}"><i class="ti-home"></i> @lang('Dashboard') </a>
            </li>

            <li>
                <a href="javascript: void(0);" aria-expanded="true">
                    <i class="mdi mdi-account-multiple-plus"></i> @lang('admin.ACCOUNT')
                    <span class="fa arrow"></span>
                </a>
                <ul class="nav-second-level nav" aria-expanded="true">
                    <li><a href="{{url('/admin?view=User')}}">
                            <i class="ti-person"></i>@lang('admin.LIST')</a>
                    </li>
                    @can(config('auth.action.LIST_USER_GROUP'))
                    <li>
                        <a href="{{url('/admin?view=UserGroup')}}"><i class="ti-person"></i>@lang('admin.ACCOUNT_GROUP')</a>
                    </li>
                    @endcan
                    @can(config('auth.action.LIST_JOBS'))
                    <li><a href="{{url('/admin?view=Job')}}"><i class="ti-person"></i>@lang('admin.JOB')</a></li>
                    @endcan
                    @can(config('auth.action.LIST_PROVINCE_GROUP'))
                    <li>
                        <a href="{{url('/admin?view=ProvinceGroup')}}"><i
                                    class="ti-person"></i>@lang('admin.PROVINCE_GROUP')</a>
                    </li>
                    @endcan
                    @can(config('auth.action.LIST_HOBBY'))
                    <li><a href="{{url('/admin?view=Hobby')}}"><i class="ti-person"></i>@lang('admin.HOBBY')</a></li>
                    @endcan
                    @can(config('auth.action.LIST_EDUCATION'))
                    <li><a href="{{url('/admin?view=Education')}}"><i class="ti-person"></i>@lang('admin.EDUCATION')</a></li>
                    @endcan
                </ul>
            </li>

            @can([config('auth.action.LIST_POST')])

            <li>
                <a href="javascript: void(0);" aria-expanded="true"><i
                            class=" mdi mdi-border-color"></i> @lang('admin.POST') <span class="fa arrow"></span></a>
                <ul class="nav-second-level nav" aria-expanded="true">
                    <li><a href="{{url('/admin?view=Post')}}"><i class="ti-person"></i>@lang('admin.POST')</a></li>
                </ul>
            </li>

            @endcan

            <li>
                <a href="javascript: void(0);" aria-expanded="true"><i
                            class="mdi mdi-calendar-clock"></i> @lang('admin.DATING_MANAGER') <span class="fa arrow"></span></a>
                <ul class="nav-second-level nav" aria-expanded="true">
                    <li>
                        <a href="{{url('/admin?view=Event&layout=listEvent')}}"><i class="ti-person"></i>@lang('admin.DATING_MANAGER')</a>
                    </li>
                </ul>
            </li>

            <li>
                <a href="javascript: void(0);" aria-expanded="true"><i
                            class="mdi mdi-diamond"></i> @lang('admin.MODULE_FINANCE') <span
                            class="fa arrow"></span></a>
                <ul class="nav-second-level nav" aria-expanded="true">
                    <li><a href="{{url('/admin?view=Transaction')}}"><i class="ti-person"></i>@lang('admin.TRANSACTION')
                        </a></li>
                    <li><a href="{{url('/admin?view=DatingPrice')}}"><i class="ti-person"></i>@lang('Giá hẹn hò')</a>
                    </li>
                    <li><a href="{{url('/admin?controller=Configuration&option=price')}}"><i
                                    class="ti-person"></i>@lang('Cấu hình giá chung')</a></li>
                    <li><a href="{{url('/admin?view=Finance')}}"><i class="ti-person"></i>@lang('admin.FINACNE_SHARE')
                        </a></li>
                </ul>
            </li>

            <li>
                <a href="javascript: void(0);"><i class="mdi mdi-cube-send"></i> @lang('admin.MODULE_DAI_LY')<span
                            class="fa arrow"></span></a>
                <ul class="nav-second-level nav" aria-expanded="true">
                    <li><a href="{{url('/admin?view=Agency&type=1')}}"><i
                                    class="ti-person"></i>@lang('admin.CAFE_STORE')</a></li>
                    <li><a href="{{url('/admin?view=Agency&type=2')}}"><i
                                    class="ti-person"></i>@lang('admin.restaurant')</a></li>
                    <li><a href="{{url('/admin?view=Agency&type=3')}}"><i class="ti-person"></i>@lang('admin.GIF')</a>
                    </li>
                    <li><a href="{{url('/admin?view=Product&type=1')}}"><i
                                    class="ti-person"></i>@lang('admin.product_type_1')</a></li>
                    <li><a href="{{url('/admin?view=Product&type=2')}}"><i
                                    class="ti-person"></i>@lang('admin.product_type_2')</a></li>
                    <li><a href="{{url('/admin?view=Product&type=3')}}"><i
                                    class="ti-person"></i>@lang('admin.product_type_3')</a></li>
                    <li><a href="{{url('/admin?view=ProductCategory&type=1')}}"><i
                                    class="ti-person"></i>@lang('admin.product_category_1')</a></li>
                    <li><a href="{{url('/admin?view=ProductCategory&type=2')}}"><i
                                    class="ti-person"></i>@lang('admin.product_category_2')</a></li>
                    <li><a href="{{url('/admin?view=ProductCategory&type=3')}}"><i
                                    class="ti-person"></i>@lang('admin.product_category_3')</a></li>
                </ul>
            </li>

            <li>
                <a href="javascript: void(0);"><i class="mdi mdi-cube-send"></i> @lang('Mã giảm giá')<span
                            class="fa arrow"></span></a>
                <ul class="nav-second-level nav" aria-expanded="true">
                    <li>
                        <a href="{{url('/admin?view=AgencyCoupons')}}"><i
                                    class="ti-person"></i>@lang('Danh sách')</a>
                    </li>
                    <li>
                        <a href="{{url('/admin?controller=AgencyCoupons&task=create')}}"><i
                                    class="ti-person"></i>@lang('Thêm mới')</a>
                    </li>
                </ul>
            </li>

            @can([config('auth.action.ADS_ORDERS'), config('auth.action.ADS_LOCATIONS')])
            <li>
                <a href="javascript: void(0);" aria-expanded="true"><i
                            class="mdi mdi-star"></i> @lang('admin.MODULE_ADVERTISEMENT') <span class="fa arrow"></span></a>
                <ul class="nav-second-level nav" aria-expanded="true">
                    <li><a href="{{url('/admin?view=Ads')}}"><i class="ti-person"></i>@lang('admin.ADS_ORDERS')</a></li>
                    <li><a href="{{url('/admin?view=AdsLocations')}}"><i
                                    class="ti-person"></i>@lang('admin.ADS_LOCATION')</a></li>
                </ul>
            </li>
            @endcan


            @can([config('auth.action.CONFIG_GENERAL')])
            <li>
                <a href="{{url('/admin?view=Configuration')}}"><i class="mdi mdi-settings"></i> @lang('admin.SETTING')
                    <span class="fa arrow"></span></a>
                <ul class="nav-second-level nav" aria-expanded="true">
                    <li><a href="{{url('/admin?view=Configuration&option=general')}}"><i
                                    class="ti-person"></i>@lang('admin.GENERAL_CONFIG')</a></li>
                </ul>
            </li>
            @endcan

        </ul>

        {{--@switch($currentUser->group->key)--}}
            {{--@case(config('auth.usergroup.administrator'))--}}
                {{--@include('layouts.admin.menu.admin')--}}
                {{--@break--}}
            {{--@case(config('auth.usergroup.agency'))--}}
                {{--@include('layouts.admin.menu.agency')--}}
                {{--@break--}}
        {{--@endswitch--}}
        {{--@if($currentUser->group->key == 'administrator')--}}
        {{--@endif--}}


    </div>
</div><!--Scrollbar wrapper-->