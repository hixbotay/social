@extends('layouts.admin')

@section('content')
<div class="container">
	<div class="row">
		<div class="col-sm-12">
			<h4 class="m-b-20 header-title">Create New User</h4>
			<form enctype='multipart/form-data' method="POST" action="{{url('admin?controller=User&task=store')}}">
				{{ csrf_field() }}
				<div class="col-sm-6">
					<div class="form-group">
						<label>Name <span>*</span></label>
						<input type="text" class="form-control" name="data[name]" required />
					</div>
					<div class="form-group">
						<label>Email <span>*</span></label>
						<input type="email" class="form-control" name="data[email]" required />
					</div>
					<div class="form-group">
						<label>Password <span>*</span></label>
						<input type="password" class="form-control" name="data[password]" required/>
					</div>
					<div class="form-group">
						<label>Mobile</label>
						<input type="number" class="form-control" name="data[mobile]" required />
					</div>
					<div class="form-group">
						<label>Group ID</label>
						{{--<input type="number" class="form-control" name="data[group_id]" />--}}
						<?php BookproHelper::select_user_groups('data[group_id]') ?>
					</div>
					<div class="form-group">
						<label>Address</label>
						<input type="text" class="form-control" name="data[address]" />
					</div>
					<div class="form-group">
						<label>Longitude</label>
						<input type="text" class="form-control" name="data[longitude]" />
					</div>
					<div class="form-group">
						<label>Latitude</label>
						<input type="text" class="form-control" name="data[latitude]" />
					</div>
					<div class="form-group">
						<label>Credit</label>
						<input type="text" class="form-control" name="data[credit]" />
					</div>
					<div class="form-group">
						<label>Chiều cao</label>
						<input type="number" step="0.01" class="form-control" name="data[height]" />
					</div>
					<div class="form-group">
						<label>Cân nặng</label>
						<input type="number" step="0.01" class="form-control" name="data[weight]" />
					</div>
				</div>
				<div class="col-sm-6">
					<div class="form-group">
						<label>IP Address</label>
						<input type="text" class="form-control" name="data[ip_address]" />
					</div>
					<div class="form-group">
						<label>ID Number</label>
						<input type="text" class="form-control" name="data[ip_address]" />
					</div>
					<div class="form-group">
						<label>Provider</label>
						<input type="text" class="form-control" name="data[provider]" />
					</div>
					<div class="form-group">
						<label>Provider ID</label>
						<input type="text" class="form-control" name="data[provider_id]" />
					</div>
					<div class="form-group">
						<label>Admin Role</label>
						<select name="data[is_admin]" class="form-control">  
							<option value="0">No</option>
							<option value="1">Yes</option>
						</select>
					</div>

					<div class="form-group">
						<label>Gender</label>
						<select name="data[gender]" class="form-control">  
							<option value="M">Male</option>
							<option value="F">Female</option>
						</select>
					</div>

					<div class="form-group">
						<label>Verify</label>
						<select name="is_verify" class="form-control">
							<option value="1">Yes</option>
							<option value="0">No</option>
						</select>
					</div>

					<div class="form-group">
						<label>Nghề nghiệp</label>
						{{\App\Job::select_job('data[job]')}}
					</div>

					<div class="form-group">
						<label>Triết lý sống</label>
						<input type="text" name="data[philosophy]" class="form-control">
					</div>

					<div class="form-group">
						<label>Sở thích</label>

						@foreach(\App\Hobby::all() AS $value)

							<div class="checkbox checkbox-info">
								<input id="checkbox{{$value->id}}" value="{{$value->id}}" type="checkbox" name="favourite[]">
								<label for="checkbox{{$value->id}}">{{$value->name}}</label>
							</div>

						@endforeach

					</div>

					<div class="form-group">
						<label>Avatar</label>
						<input type="file" class="form-control" name="avatar" />
					</div>

				</div>

				<div class="col-sm-12">
					<button type="submit" class="btn btn-primary">Submit</button>
				</div>

			</form>
		</div>
	</div>
</div>
@endsection


