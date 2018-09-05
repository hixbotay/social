@extends('layouts.admin')

@section('content')
<div class="container">
	<div class="row">
		<div class="col-sm-12">
			<h4 class="m-b-20 header-title">Form Elements</h4>
			<form enctype='multipart/form-data' method="POST" action="{{url('admin?controller=User&task=update&id='.$item->id)}}">
				{{ csrf_field() }}
				<input name="_method" type="hidden" value="PATCH">
				<div class="col-sm-6">
					<div class="row">
						<div class="container">
							<div class="col-md-3 user-details">
								<button class="btn btn-default waves-effect waves-light avatar-button" id="custom-html-alert" type="button">
									<img src="{{$item->avatar}}" class="thumb-md img-circle">
								</button>
							</div>
							<div class="col-md-4">
								<div><b>{{$item->name}}</b></div>
							</div>
							<div class="col-md-5">
								<a href="{{url('admin?controller=User&task=resetUserPassword&id='.$item->id)}}">
									<button type="button" class="btn btn-danger">Reset User Password</button>
								</a>
							</div>
						</div>
					</div>
					<div class="form-group">
						<label>Name <span>*</span></label>
						<input type="text" class="form-control" name="data[name]" value="{{$item->name}}" required />
					</div>
					<div class="form-group">
						<label>Email <span>*</span></label>
						<input type="email" class="form-control" name="data[email]" value="{{$item->email}}" required />
					</div>
					<div class="form-group">
						<label>Mobile</label>
						<input type="text" class="form-control" name="data[mobile]" value="{{$item->mobile}}" required />
					</div>
					<div class="form-group">
						<label>Group ID</label>
						<input type="number" class="form-control" name="data[group_id]" value="{{$item->group_id}}"/>
					</div>
					<div class="form-group">
						<label>Enabled or Disabled</label>
						<select name="is_enabled" class="form-control">
							<option value="1">Enabled</option>
							<option value="0">Disabled</option>
						</select>
					</div>
					<div class="form-group">
						<label>Address</label>
						<input type="text" class="form-control" name="data[address]" value="{{$item->address}}"/>
					</div>
					<div class="form-group">
						<label>Longitude</label>
						<input type="text" class="form-control" name="data[longitude]" value="{{$item->longitude}}"/>
					</div>
					<div class="form-group">
						<label>Latitude</label>
						<input type="text" class="form-control" name="data[latitude]" value="{{$item->latitude}}"/>
					</div>
					<div class="form-group">
						<label>Chiều cao</label>
						<input type="number" step="0.01" value="{{$item->height}}" class="form-control" name="data[height]" />
					</div>
					<div class="form-group">
						<label>Cân nặng</label>
						<input type="number" step="0.01" value="{{$item->weight}}" class="form-control" name="data[weight]" />
					</div>
				</div>
				<div class="col-sm-6">
					<div class="form-group">
						<label>Credit</label>
						<input type="text" class="form-control" name="data[credit]" value="{{$item->credit}}"/>
					</div>
					<div class="form-group">
						<label>IP Address</label>
						<input type="text" class="form-control" name="data[ip_address]" value="{{$item->ip_address}}"/>
					</div>
					<div class="form-group">
						<label>ID Number</label>
						<input type="text" class="form-control" name="data[id_number]" value="{{$item->id_number}}"/>
					</div>
					<div class="form-group">
						<label>Provider</label>
						<input type="text" class="form-control" name="data[provider]" value="{{$item->provider}}"/>
					</div>
					<div class="form-group">
						<label>Provider ID</label>
						<input type="text" class="form-control" name="data[provider_id]" value="{{$item->provider_id}}"/>
					</div>
					<div class="form-group">
						<label>Admin Role</label>
						<select name="data[is_admin]" class="form-control" >  
							<option value="0" selected="{{$item->is_admin == 0}}">No</option>
							<option value="1" selected="{{$item->is_admin == 1}}">Yes</option>
						</select>
					</div>

					<div class="form-group">
						<label>Gender</label>
						<select name="data[gender]" class="form-control">  
							<option value='M' selected="{{$item->gender == 'M'}}">Male</option>
							<option value='F' selected="{{$item->gender == 'F'}}">Female</option>
						</select>
					</div>

					<div class="form-group">
						<label>Verify</label>
						<select name="is_verify" class="form-control">
							<option value="1" selected="{{$item->is_verify == 1}}">Yes</option>
							<option value="0" selected="{{$item->is_verify == 0}}">No</option>
						</select>
					</div>

					<div class="form-group">
						<label>Nghề nghiệp</label>
						{{\App\Job::select_job('data[job]', null, null, $item->job)}}
					</div>

					<div class="form-group">
						<label>Triết lý sống</label>
						<input type="text" name="data[philosophy]" value="{{$item->philosophy}}" class="form-control">
					</div>

					<div class="form-group">
						<label>Sở thích</label>

						@foreach(\App\Hobby::all() AS $value)

							<div class="checkbox checkbox-info">
								<input
										@foreach(\App\Hobby::get_hobby_by_user($item->id) AS $val)
											@if($val->hobby_id == $value->id)
												checked
											@endif
										@endforeach

										id="checkbox{{$value->id}}"
										value="{{$value->id}}"
										type="checkbox"
										name="favourite[]">
								<label for="checkbox{{$value->id}}">{{$value->name}}</label>
							</div>

						@endforeach

					</div>

					<div class="form-group">
						<label>Upload image in status or not</label>
						<select name="" class="form-control">  
							<option>Yes</option>
							<option>No</option>
						</select>
					</div>
					<div class="form-group">
						<label>Avatar</label>
						<input type="file" class="form-control" name="data[avatar]" />
					</div>
				</div>
				<div class="col-sm-12">
					<button type="submit" class="btn btn-primary">Submit</button>
					<button type="reset" class="btn btn-dark">Reset</button>
				</div>
			</form>
		</div>
	</div>
</div>
@endsection