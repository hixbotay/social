@extends('layouts.admin')

@section('content')
<div class="container">
	<div class="row">
		<div class="col-md-12">
			<h4 class="m-b-20 header-title">@lang('admin.TRANSACTION_DETAIL')</h4>



			<div class="form-group">
				<label for="pwd">Thành viên:</label>
				<input type="text" class="form-control" value="<?= $item->user_name ?>" readonly>
			</div>

			<div class="form-group">
				<label for="pwd">Loại giao dịch:</label>
				<input type="text" class="form-control" value="<?= $item->pay_type ?>" readonly>
			</div>


			<div class="form-group">
				<label for="pwd">Trạng thái giao dịch:</label>
				<input type="text" class="form-control" value="<?= ($item->pay_status == 1)?__('admin.SUCCESS'):__('admin.FAIL') ?>" readonly>
			</div>


			<div class="form-group">
				<label for="pwd">Số tiền:</label>
				<input type="text" class="form-control" value="<?= number_format($item->total) ?>" readonly>
			</div>


			<div class="form-group">
				<label for="pwd">Thời gian</label>
				<input type="text" class="form-control" value="<?= $item->created_at ?>" readonly>
			</div>


			<div class="form-group">
				<a href="{{url('admin?view=Transaction')}}">
					<button type="button" class="btn btn-primary">@lang('admin.BACK')</button>
				</a>
			</div>


		</div>
	</div>
</div>

@endsection



