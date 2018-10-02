@extends('layouts.information')

@section('card')
    <div class="container">
        <h4>Người ấy chỉ muốn hẹn hò khi nhìn thấy ảnh của bạn!</h4>

        <form enctype="multipart/form-data" method="POST" action={{url('/upload-avatar')}}>
            {{csrf_field()}}
            <div class="form-group">
                <input class="form-control" name="avatar" type="file"/>
            </div>
            <div class="form-group">
                <button class="btn btn-primary" type="submit">Upload</button>
            </div>
        </form>
    </div>

@endsection