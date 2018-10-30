@extends('layouts.information')

@section('card')
    <div class="container">
        <div class="mb-4">
            <div class="text-center">
                <h4>Người ấy chỉ muốn hẹn hò khi nhìn thấy ảnh của bạn!</h4>
            </div>
            <img id="temp-avatar" src="#" width="50%" class="d-none"/>
        </div>

        <form enctype="multipart/form-data" method="POST" action={{url('/upload-avatar')}}>
            {{csrf_field()}}
            <input type="hidden" name="step" value="3"/>
            <div class="form-group">
                <input class="form-control" name="avatar" type="file" onchange="readURL(this);"/>
            </div>
            <div class="form-group text-center">
                <button class="btn btn-primary" type="submit">Upload</button>
            </div>
        </form>
    </div>

    <script>
        function readURL(input) {
            var element = document.getElementById('temp-avatar');
            element.classList.remove("d-none");
            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    element.setAttribute('src', e.target.result);
                };

                reader.readAsDataURL(input.files[0]);
            }
        }
    </script>

@endsection