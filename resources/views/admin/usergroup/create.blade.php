@extends('layouts.admin')

@section('content')

	<div class="alert alert-info alert-white alert-dismissible fade in" role="alert">
		<button type="button" class="close" data-dismiss="alert" aria-label="Close">
			<span aria-hidden="true">×</span>
		</button>
		<strong>Chức năng bị chặn!</strong> Vui lòng liên hệ nhà phát triển web! Xin cảm ơn!
	</div>
	<!--
<div class="container">
	<div class="row">
		<div class="col-md-12">
			<h4 class="m-b-20 header-title">Create New Group</h4>

			@include('layouts.admin.notice')

			<form method="post" action="{{url('admin?controller=UserGroup&&task=store')}}" class="form-horizontal">

				{{ csrf_field() }}

				<div class="form-group">
					<label class="col-md-2 control-label" for="name">Name</label>
					<div class="col-md-10">
						<input class="form-control" name="data[name]" value="{{ isset($item->name)?$item->name:null }}" type="text" id="name" required maxlength="30">
					</div>
				</div>

				<div class="form-group">
					<label class="col-md-2 control-label" for="params">Params</label>
					<div class="col-md-10">
						<input class="form-control" name="data[params]" type="text" id="params">
					</div>
				</div>

				<div class="form-group">
					<label class="col-md-2 control-label"></label>
					<div class="col-md-10">
						<button type="submit" class="btn btn-primary">Submit</button>
					</div>
				</div>
			</form>
		</div>

	</div>
</div>

-->
@endsection
