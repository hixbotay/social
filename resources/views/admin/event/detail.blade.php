@extends('layouts.admin')

@section('content')
<div class="container">
	<div class="row">
		<div class="col-md-12">
			<h4 class="m-b-20 header-title">Post Detail</h4>
			<form method="post" action="{{url('admin?controller=Event&task=update&id='.$item->id)}}" class="form-horizontal">

				{{ csrf_field() }}

				<div class="form-group">
					<label class="col-md-2 control-label" for="name">Name</label>
					<div class="col-md-10">
						<input type="text" name="data[name]" class="form-control" value="{{$item->name}}" required>
					</div>
				</div>

				<div class="form-group">
					<label class="col-md-2 control-label" for="name">Description</label>
					<div class="col-md-10">
						<textarea name="data[desciption]" class="form-control">
							{{$item->desciption}}
						</textarea>
					</div>
				</div>

				<div class="form-group">
					<label class="col-md-2 control-label" for="name">Address ID</label>
					<div class="col-md-10">
						<input type="number" name="data[address_id]" class="form-control" value="{{$item->address_id}}" required> 
					</div>
				</div>

				<div class="form-group">
					<label class="col-md-2 control-label" for="name">Schedule Type</label>
					<div class="col-md-10">
						<input type="number" name="data[schedule_type]" class="form-control" value="{{$item->schedule_type}}" required> 
					</div>
				</div>

				<div class="form-group">
					<label class="col-md-2 control-label" for="name">Start date</label>
					<div class="col-md-10">
						<input type="text" name="data[start_date]" class="form-control" value="{{$item->start_date}}" required maxlength="5"> 
					</div>
				</div>

				<div class="form-group">
					<label class="col-md-2 control-label" for="name">Start time</label>
					<div class="col-md-10">
						<input type="time" name="data[start_time]" class="form-control" value="{{$item->start_time}}" required> 
					</div>
				</div>

				<div class="form-group">
					<label class="col-md-2 control-label" for="name">Limit Number</label>
					<div class="col-md-10">
						<input type="number" name="data[limit_number]" class="form-control" value="{{$item->limit_number}}" required> 
					</div>
				</div>

				<div class="form-group">
					<label class="col-md-2 control-label" for="name">Min number</label>
					<div class="col-md-10">
						<input type="number" name="data[min_number]" class="form-control" value="{{$item->min_number}}" required> 
					</div>
				</div>

				<div class="form-group">
					<label class="col-md-2 control-label" for="name">Min Male</label>
					<div class="col-md-10">
						<input type="number" name="data[min_m]" class="form-control" value="{{$item->min_m}}" required> 
					</div>
				</div>

				<div class="form-group">
					<label class="col-md-2 control-label" for="name">Min Female</label>
					<div class="col-md-10">
						<input type="number" name="data[min_f]" class="form-control" value="{{$item->min_f}}" required> 
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