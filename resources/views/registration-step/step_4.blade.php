@extends('layouts.information')

@section('card')
    <div class="container">
        <div class="mt-2">
            <div class="text-center">
                <a href="{{url('')}}">
                    <button class="btn btn-sm btn-light">Bỏ qua</button>
                </a>
                <hr/>
            </div>
        </div>

        <div>
            <h5 class="text-danger">Chúng ta còn 2 mục:</h5>
            <ul>
                <li>
                    Cho chúng tôi biết bạn muốn kiếm mẫu người nào
                </li>
                <li>
                    Bổ sung thêm một số thông tin của bạn để người ấy hiểu bạn hơn
                </li>
            </ul>
            <h5 class="text-danger">Bạn muốn tiếp tục hay tạm thời bỏ qua?</h5>
        </div>
        <div class="text-center mb-4">
            <a href="{{url('').'/registration?step=5'}}">
                <button class="btn btn-primary" type="button">Tiếp tục</button>
            </a>
        </div>
    </div>

@endsection