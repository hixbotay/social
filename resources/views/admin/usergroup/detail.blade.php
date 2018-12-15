@extends('layouts.admin')

@section('content')
<div class="container">
	<div class="row">
		<div class="col-md-12">
			<h4 class="m-b-20 header-title">Group Detail</h4>

			@include('layouts.admin.notice')

			<form method="post" action="{{url('admin?controller=UserGroup&task=update&id='.$item->id)}}" class="form-horizontal">

				{{ csrf_field() }}

				<div class="form-group">
					<label class="col-md-2 control-label" for="name">Tên nhóm</label>
					<div class="col-md-10">
						<input class="form-control" name="data[name]" readonly="readonly" value="{{ isset($item->name)?$item->name:null }}" type="text" id="name" required maxlength="30">
					</div>
				</div>

				<div class="form-group">
					<label class="col-md-2 control-label" for="params">Quyền hạn</label>
					<div class="col-md-10">
						@foreach($roles AS $value)

							<div class="checkbox checkbox-info">
								<input
										@if($item->key == config('auth.usergroup.administrator'))
												disabled
										@endif
										@if(!empty($groupROLE))
											@foreach($groupROLE AS $val)
												@if($value == $val)
												checked
												@endif
											@endforeach
										@endif
										id="checkbox{{$value}}"
										value="{{$value}}"
										type="checkbox"
										name="data[role][]">
								<label for="checkbox{{$value}}">{{$value}}</label>
							</div>

						@endforeach
					</div>
				</div>

				<div class="form-group">
					<label class="col-md-2 control-label"></label>
					<div class="col-md-10">
						<button
								@if($item->key == config('auth.usergroup.administrator'))
									disabled
								@endif
								type="submit" class="btn btn-primary">Submit</button>
					</div>
				</div>
			</form>

			<div class="alert alert-warning alert-dismissible fade in" role="alert">
				<button type="button" class="close" data-dismiss="alert" aria-label="Close">
					<span aria-hidden="true">×</span>
				</button>
				<strong>Chú ý!</strong> Hãy chắc chắn bạn không phân quyền cho nhầm người
			</div>

		</div>

	</div>
</div>
@endsection
