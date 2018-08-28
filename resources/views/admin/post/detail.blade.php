@extends('layouts.admin')

@section('content')
<div class="container">
	<div class="row">
		<div class="col-md-12">
			<h4 class="m-b-20 header-title">Post Detail</h4>
			<form method="post" action="{{url('admin?controller=Post&task=update&id='.$item->id)}}" class="form-horizontal">

				{{ csrf_field() }}

				<div class="form-group">
					<label class="col-md-2 control-label" for="name">Content</label>
					<div class="col-md-10">
						<textarea class="form-control" name="data[content]" required>
							{{trim($item->content)}}
						</textarea>
					</div>
				</div>

				<div class="form-group">
					<div class="col-md-2 control-label">Like</div>
					<div class="col-md-10">
						{{$item->like}}
					</div>
				</div>

				<div class="form-group">
					<div class="col-md-2 control-label">Dislike</div>
					<div class="col-md-10">
						{{$item->dislike}}
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
@endsection
