@extends('layouts.admin')

@section('content')
<div class="container">
	<div class="row">
		<div class="col-md-12">
			<h4 class="m-b-20 header-title">@lang('admin.POST')</h4>
			<form method="post" action="{{url('admin?controller=Post&task=update&id='.$item->id)}}" class="form-horizontal">

				{{ csrf_field() }}

				<div class="form-group">
					<label class="col-md-2 control-label" for="name">Content</label>
					<div class="col-md-10">
						<textarea class="form-control" name="data[content]" id="summary-ckeditor" required>
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
					<div class="col-md-10">{{$item->dislike}}</div>
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



