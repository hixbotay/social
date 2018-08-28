@extends('layouts.admin')

@section('content')

<div class="container">
	<div class="row">
		<div class="col-sm-12">
			<h4 class="m-b-20 header-title">Create New Post</h4>
			<form enctype='multipart/form-data' method="POST" action="{{url('admin?controller=Post&task=store')}}">
				{{ csrf_field() }}
				<input type="hidden" name="data[user_id]" value={{Auth::id()}}>
				<div class="form-group">
					<label>Content</label>
					<textarea class="form-control" name="data[content]">Type text here...</textarea>
				</div>	
				<div class="form-group">
					<button type="submit" class="btn btn-primary">Submit</button>
				</div>
			</form>
		</div>
	</div>
</div>

@endsection