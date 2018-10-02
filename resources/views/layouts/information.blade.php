<html>

<head>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" >
    <title>Additional Information</title>
    <link rel="stylesheet" type="text/css" href={{ asset('assets/css/additional-info.css') }} />
</head>
<body>
    <div class="row additional-info-screen">
        <div class="col-md-4">
            <img id="additional-image1" src={{env('APP_URL').'/storage/app/public/additional-info/image1.png'}}/>
        </div>
        <div class="col-md-4">
            <div class="additional-info-logo text-center ">
                <img src="http://125.212.227.39/social/public/images/main/logo.png"/>
                <br/>
                @yield('text')
            </div>
            
            <div class="card additional-info-card">
                @yield('card')
            </div>
        </div>
        <div class="col-md-4">
            <img id="additional-image2" src={{env('APP_URL').'/storage/app/public/additional-info/image2.png'}}/>
        </div>
    </div>
</body>
</html>