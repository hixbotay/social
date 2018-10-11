@extends('layouts.admin')



@section('content')

    <script src="{{ asset('public/ckfinder/ckfinder.js') }}"></script>

    <script>

        function selectFileWithCKFinder(elementId) {
            CKFinder.popup({
                chooseFiles: true,
                width: 800,
                height: 600,
                onInit: function (finder) {
                    finder.on('files:choose', function (evt) {
                        var file = evt.data.files.first();
                        console.log(file.get( 'folder' ).attributes.name);
                        var output = document.getElementById(elementId);
                        var path = 'public/images/'+ file.get( 'folder' ).attributes.name + '/' +file.get( 'name' );
                        output.value = path;
                    });

                    finder.on('file:choose:resizedImage', function (evt) {
                        var output = document.getElementById(elementId);
                        output.value = evt.data.resizedUrl;
                    });
                }
            });
        }
    </script>

    <script>

        $("#province").change(function () {
            alert();
            // loadDistrict();
        })

        function loadDistrict(){
            jQuery.ajax({
                type:'POST',
                url:'?controller=Agency&task=ajaxLoadDistrict',
                data:'_token = <?php echo csrf_token() ?>',
                success:function(data){
                    alert();
                }
            });
        }
    </script>


    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <h4 class="m-b-20 header-title">Tạo Đại Lý Cafe</h4>
                <form enctype='multipart/form-data' method="POST"
                      action="{{url('admin?controller=Agency&task=store')}}">
                    {{ csrf_field() }}
                    <div class="col-sm-12">


                        <div class="form-group">
                            <label>Chủ sở hữu <span>*</span></label>
                            <select name="data[user_id]" class="form-control" required>
                                @foreach($users AS $value)
                                    <option value="{{$value->id}}">{{ $value->name . ' ' . $value->email }}</option>
                                @endforeach
                            </select>

                        </div>

                        <div class="form-group">
                            <label>Name <span>*</span></label>
                            <input type="text" class="form-control" name="data[name]" required/>
                        </div>

                        <div class="form-group">
                            <label>Tỉnh/Thành phố<span></span></label>

                            <select name="data[province_id]" class="form-control" id="province" required>
                                @foreach(App\ProvinceGroup::all_province() AS $value)
                                    <option value="{{$value->matp}}">{{$value->name}}</option>
                                @endforeach
                            </select>
                        </div>


                        <div class="form-group">
                            <label>Quận/Huyện<span></span></label>

                            <select name="data[district_id]" class="form-control" required>
                                {{--@foreach(App\ProvinceGroup::all_district() AS $value)--}}
                                    {{--<option value="{{$value->maqh}}">{{$value->name}}</option>--}}
                                {{--@endforeach--}}
                            </select>
                        </div>


                        <div class="form-group">
                            <label>Địa chỉ<span></span></label>
                            <input type="text" name="data[address]" class="form-control" required>
                        </div>


                        <div class="form-group">
                            <label>Ảnh đại diện<span></span></label>
                            <div class="bootstrap-filestyle input-group">
                                <input type="text" class="form-control" name="data[image]" id="ckfinder-popup-1">
                                <span class="group-span-filestyle input-group-btn" tabindex="0" onclick="selectFileWithCKFinder('ckfinder-popup-1')">
                                    <label for="filestyle-5" class="btn btn-primary">
                                        <span class="icon-span-filestyle glyphicon glyphicon-folder-open"></span>
                                        <span class="buttonText">Choose file</span>
                                    </label>
                                </span>
                            </div>
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
