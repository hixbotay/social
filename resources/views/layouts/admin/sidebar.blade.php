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
                                    <a href="javascript: void(0);" aria-expanded="true"><i class="ti-light-bulb"></i> @lang('Users') <span class="fa arrow"></span></a>
                                    <ul class="nav-second-level nav" aria-expanded="true">
                                        <li><a href="{{url('/admin?view=user')}}"><i class="ti-person"></i>@lang('Users')</a></li>
                                        <li><a href="{{url('/admin?view=user&layout=edit')}}"><i class="ti-person"></i>@lang('Create user')</a></li>
										<li><a href="{{url('/admin?view=usergroup')}}"><i class="ti-person"></i>@lang('User groups')</a></li>
                                    </ul>
                                </li>
                                
                                <li><a href="{{url('/admin?controller=user&task=test')}}"><i class="ti-home"></i> Test controller admin </a></li>

                            </ul>
                        </div>
                    </div><!--Scrollbar wrapper-->