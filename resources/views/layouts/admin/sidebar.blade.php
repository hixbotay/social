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

        @switch($currentUser->group->key)

            @case(config('auth.usergroup.administrator'))
                @include('layouts.admin.menu.admin')
                @break

            @case(config('auth.usergroup.agency'))
                @include('layouts.admin.menu.agency')
                @break

        @endswitch

        @if($currentUser->group->key == 'administrator')


        @endif


    </div>
</div><!--Scrollbar wrapper-->