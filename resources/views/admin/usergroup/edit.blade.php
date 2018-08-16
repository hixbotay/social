<?php

//echo "<pre>";
//print_r($item);
//die;

?>

@extends('layouts.admin')

@section('content')
<div class="container">
	<div class="row">
		<div class="col-md-12">

			<form method="post" action="{{route('admin')}}" class="form-horizontal">

				{{ csrf_field() }}

				<div class="form-group">
					<label class="col-md-2 control-label" for="name">Name</label>
					<div class="col-md-10">
						<input class="form-control" name="name" value="{{ isset($item->name)?$item->name:null }}" type="text" id="name">
					</div>
				</div>

				<div class="form-group">
					<label class="col-md-2 control-label"></label>
					<div class="col-md-10">
						<button type="submit" class="btn btn-primary">Submit</button>
					</div>
				</div>

				<input type="hidden" name="controller" value="UserGroup" />
				<input type="hidden" name="task" value="{{isset($item->id)?'update':'store'}}" />
				<input type="hidden" name="id" value="{{ isset($item->id)?$item->id:null }}" />

			</form>
		</div>

	</div>
</div>
@endsection
