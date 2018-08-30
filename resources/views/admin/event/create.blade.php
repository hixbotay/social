@extends('layouts.admin')

@section('content')

<div class="container">
	<div class="row">
		<div class="col-sm-12">
			<h4 class="m-b-20 header-title">Create New Event</h4>
			<form enctype='multipart/form-data' method="POST" action="{{url('admin?controller=Event&task=store')}}" id="create-event">
				{{ csrf_field() }}
				<div class="form-group">
					<label>Name</label>
					<input type="text" name="data[name]" class="form-control" required>
				</div>
				<div class="form-group">
					<label>Description</label>
					<textarea class="form-control" name="data[desciption]" form="create-event"></textarea>
				</div>
				<div class="form-group">
					<label>Address ID</label>
					<input type="number" name="data[address_id]" class="form-control">
				</div>	
				<div class="form-group">
					<label>Schedule type</label>
					<input type="text" name="data[schedule_type]" class="form-control">
				</div>
				<div class="form-group">
					<label>Start date</label>
					<input type="date" name="data[start_date]" class="form-control">
				</div>
				<div class="form-group">
					<label>Start time</label>
					<input type="time" name="data[start_time]" class="form-control">
				</div>
				<div class="form-group">
					<label>Limit number</label>
					<input type="number" name="data[limit_number]" class="form-control">
				</div>
				<div class="form-group">
					<label>Min number</label>
					<input type="number" name="data[min_number]" class="form-control">
				</div>
				<div class="form-group">
					<label>Min male</label>
					<input type="number" name="data[min_m]" class="form-control">
				</div>
				<div class="form-group">
					<label>Min female</label>
					<input type="number" name="data[min_f]" class="form-control">
				</div>
				<div class="form-group">
					<button type="submit" class="btn btn-primary">Submit</button>
				</div>
			</form>
		</div>
	</div>
</div>

@endsection