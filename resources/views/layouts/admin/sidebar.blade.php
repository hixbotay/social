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
                                    <a href="#">Stanley Jones</a>
                                    <p class="text-muted m-0">Administrator</p>
                                </div>
                            </div>
                            <!--- End User Detail box -->

                            <!-- Left Menu Start -->
                            <ul class="metisMenu nav" id="side-menu">
                                <li><a href="{{url('/admin')}}"><i class="ti-home"></i> @lang('Dashboard') </a></li>
                               
                                <li>
                                    <a href="javascript: void(0);" aria-expanded="true"><i class="mdi mdi-account-multiple-plus"></i> @lang('admin.ACCOUNT') <span class="fa arrow"></span></a>
                                    <ul class="nav-second-level nav" aria-expanded="true">
                                        <li><a href="{{url('/admin?view=User')}}"><i class="ti-person"></i>@lang('admin.LIST')</a></li>
                                        <li><a href="{{url('/admin?view=UserGroup')}}"><i class="ti-person"></i>@lang('admin.ACCOUNT_GROUP')</a></li>
                                    </ul>
                                </li>

                                <li>
                                    <a href="javascript: void(0);" aria-expanded="true"><i class=" mdi mdi-border-color"></i> @lang('admin.POST') <span class="fa arrow"></span></a>
                                    <ul class="nav-second-level nav" aria-expanded="true">
                                        <li><a href="{{url('/admin?view=Post')}}"><i class="ti-person"></i>@lang('admin.POST')</a></li>
                                    </ul>
                                </li>

                                <li>
                                    <a href="javascript: void(0);" aria-expanded="true"><i class="mdi mdi-calendar-clock"></i> @lang('Events') <span class="fa arrow"></span></a>
                                    <ul class="nav-second-level nav" aria-expanded="true">
                                        <li><a href="{{url('/admin?view=Event&layout=listEvent')}}"><i class="ti-person"></i>@lang('Events')</a></li>
                                        <li><a href="{{url('/admin?view=Event&layout=listEventSchedules')}}"><i class="ti-person"></i>@lang('Event Schedules')</a></li>
                                        <li><a href="{{url('/admin?controller=Event&task=create')}}"><i class="ti-person"></i>@lang('Create new event')</a></li>
                                    </ul>
                                </li>

                                <li>
                                    <a href="javascript: void(0);" aria-expanded="true"><i class="mdi mdi-diamond"></i> @lang('admin.MODULE_FINANCE') <span class="fa arrow"></span></a>
                                    <ul class="nav-second-level nav" aria-expanded="true">
                                        <li><a href="{{url('/admin?view=Transaction')}}"><i class="ti-person"></i>@lang('admin.TRANSACTION')</a></li>
                                        <li><a href="{{url('/admin?view=DatingPrice')}}"><i class="ti-person"></i>@lang('Giá hẹn hò')</a></li>
                                        <li><a href="{{url('/admin?controller=Configuration&option=price')}}"><i class="ti-person"></i>@lang('Cấu hình giá chung')</a></li>
                                        <li><a href="{{url('/admin?view=Finance')}}"><i class="ti-person"></i>@lang('admin.FINACNE_SHARE')</a></li>
                                    </ul>
                                </li>

                                <li>
                                    <a href="javascript: void(0);"><i class="mdi mdi-cube-send"></i> @lang('admin.MODULE_DAI_LY')<span class="fa arrow"></span></a>
                                    <ul class="nav-second-level nav" aria-expanded="true">
                                        <li><a href="{{url('/admin?view=Agency')}}"><i class="ti-person"></i>@lang('admin.LIST_CAFE')</a></li>
                                        <li><a href="{{url('/admin?view=Product')}}"><i class="ti-person"></i>@lang('admin.CAFE_PRODUCT')</a></li>
                                        <li><a href="{{url('/admin?view=ProductCategory')}}"><i class="ti-person"></i>@lang('admin.CAFE_PRODUCT_CATEGORY')</a></li>
                                    </ul>
                                </li>

                                <li>
                                    <a href="javascript: void(0);" aria-expanded="true"><i class="mdi mdi-settings"></i> @lang('admin.OTHER_CONFIG') <span class="fa arrow"></span></a>
                                    <ul class="nav-second-level nav" aria-expanded="true">

                                        <li><a href="{{url('/admin?view=Job')}}"><i class="ti-person"></i>@lang('admin.JOB')</a></li>

                                        <li><a href="{{url('/admin?view=ProvinceGroup')}}"><i class="ti-person"></i>@lang('admin.PROVINCE_GROUP')</a></li>

                                        <li><a href="{{url('/admin?view=Hobby')}}"><i class="ti-person"></i>@lang('admin.HOBBY')</a></li>

                                        <li><a href="{{url('/admin?view=Education')}}"><i class="ti-person"></i>@lang('admin.EDUCATION')</a></li>

                                    </ul>
                                </li>

                                <li>
                                    <a href="javascript: void(0);" aria-expanded="true"><i class="mdi mdi-gift"></i> @lang('Module quà tặng') <span class="fa arrow"></span></a>
                                    <ul class="nav-second-level nav" aria-expanded="true">
                                        <li><a href="{{url('/admin?view=Gif')}}"><i class="ti-person"></i>@lang('Quà tặng')</a></li>
                                        <li><a href="{{url('/admin?view=GifCategories')}}"><i class="ti-person"></i>@lang('Danh mục quà tặng')</a></li>
                                    </ul>
                                </li>


                                <li>
                                    <a href="{{url('/admin?view=Configuration')}}"><i class="mdi mdi-settings"></i> @lang('admin.SETTING') <span class="fa arrow"></span></a>
                                    <ul class="nav-second-level nav" aria-expanded="true">
                                        <li><a href="{{url('/admin?view=Configuration&option=general')}}"><i class="ti-person"></i>@lang('admin.GENERAL_CONFIG')</a></li>
                                    </ul>
                                </li>

                            </ul>
                        </div>
                    </div><!--Scrollbar wrapper-->