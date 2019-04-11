@extends('layouts.admin')

@section('content')

@switch($currentUser->group->key)

    @case(config('auth.usergroup.administrator'))
        @include('admin.dashboard.admin')
        @break
    @case(config('auth.usergroup.agency'))
        @include('admin.dashboard.agency')
        @break

    @case(config('auth.usergroup.agency_employee'))
        @include('admin.dashboard.agency_employee')
        @break

@endswitch

@endsection
