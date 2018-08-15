@extends('layouts.admin')

@section('content')
<div class="container">
	<form class="form-horizontal" role="form">
		<div class="row">
			<div class="col-md-6">
				<div class="form-group">
					<label class="col-md-2 control-label">Name</label>
					<div class="col-md-10">
						<input name="name" class="form-control" value="{{isset($item->name)?$item->name:null}}" type="text">
					</div>
				</div>
				<div class="form-group">
					<label class="col-md-2 control-label" for="example-email">Email</label>
					<div class="col-md-10">
						<input id="example-email" name="email" value="{{isset($item->email)?$item->email:null}}"
							class="form-control" placeholder="Email" type="email">
					</div>
				</div>
				<div class="form-group">
					<label class="col-md-2 control-label">Password</label>
					<div class="col-md-10">
						<input class="form-control" value="password" type="password">
					</div>
				</div>

				<div class="form-group">
					<label class="col-md-2 control-label">Placeholder</label>
					<div class="col-md-10">
						<input class="form-control" placeholder="placeholder" type="text">
					</div>
				</div>
				<div class="form-group">
					<label class="col-md-2 control-label">Text area</label>
					<div class="col-md-10">
						<textarea class="form-control" rows="5"></textarea>
					</div>
				</div>

			</div>

			<div class="col-md-6">

				<div class="form-group">
					<label class="col-md-2 control-label">Readonly</label>
					<div class="col-md-10">
						<input class="form-control" readonly="" value="Readonly value"
							type="text">
					</div>
				</div>
				<div class="form-group">
					<label class="col-md-2 control-label">Disabled</label>
					<div class="col-md-10">
						<input class="form-control" disabled="" value="Disabled value"
							type="text">
					</div>
				</div>


				<div class="form-group">
					<label class="col-sm-2 control-label">Static control</label>
					<div class="col-sm-10">
						<p class="form-control-static">email@example.com</p>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-2 control-label">Helping text</label>
					<div class="col-sm-10">
						<input class="form-control" placeholder="Helping text" type="text">
						<span class="help-block"><small>A block of help text that breaks
								onto a new line and may extend beyond one line.</small></span>
					</div>
				</div>


			</div>

		</div>


		<div class="row text-center">
			<button type="button" class="btn btn-info">Submit</button>
			<button type="button" class="btn btn-info">Submit</button>
			<button type="button" class="btn btn-info">Submit</button>
		</div>


	</form>

</div>
@endsection
