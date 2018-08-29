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
					<textarea class="form-control" name="data[content]"id="summary-ckeditor"></textarea>

				</div>
				<div class="form-group">
					<button type="submit" class="btn btn-primary">Submit</button>
				</div>
			</form>
		</div>
	</div>
</div>


<script src="{{ asset('vendor/unisharp/laravel-ckeditor/ckeditor.js') }}"></script>
<script>
    CKEDITOR.replace( 'summary-ckeditor', {
        filebrowserBrowseUrl: '{{ asset('public/ckfinder/ckfinder.html') }}',
        filebrowserImageBrowseUrl: '{{ asset('public/ckfinder/ckfinder.html?type=Images') }}',
        filebrowserFlashBrowseUrl: '{{ asset('public/ckfinder/ckfinder.html?type=Flash') }}',
        filebrowserUploadUrl: '{{ asset('public/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files') }}',
        filebrowserImageUploadUrl: '{{ asset('public/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images') }}',
        filebrowserFlashUploadUrl: '{{ asset('public/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Flash') }}'
    } );
</script>

@endsection