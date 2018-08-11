@extends('layouts.admin')

@section('content')
<div class="container">
	<div class="row">
		<div class="col-md-6">
			<form class="form-horizontal" role="form">
				<div class="form-group">
					<label class="col-md-2 control-label">Text</label>
					<div class="col-md-10">
						<input class="form-control" value="Some text value..." type="text">
					</div>
				</div>
				<div class="form-group">
					<label class="col-md-2 control-label" for="example-email">Email</label>
					<div class="col-md-10">
						<input id="example-email" name="example-email"
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



			</form>
		</div>

		<div class="col-md-6">
			<form class="form-horizontal" role="form">

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

				<div class="form-group">
					<label class="col-sm-2 control-label">Input Select</label>
					<div class="col-sm-10">
						<select class="form-control">
							<option>1</option>
							<option>2</option>
							<option>3</option>
							<option>4</option>
							<option>5</option>
						</select>
						<h6>Multiple select</h6>
						<select multiple="" class="form-control">
							<option>1</option>
							<option>2</option>
							<option>3</option>
							<option>4</option>
							<option>5</option>
						</select>
					</div>
				</div>

			</form>
		</div>

	</div>
</div>
@endsection
