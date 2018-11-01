<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <base href="{{url_root()}}/">
    <script>
        var baseUrl = "{{url('')}}";
    </script>

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Styles -->
    <link rel="stylesheet" href="{{url('')}}/public/css/app.css" type="text/css">
    <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.css" />
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick-theme.min.css" />

    {{-- jQuery --}}
    <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
</head>
<body>
    <div id="app"></div>
    
    
    <!-- Scripts -->
    <script src="{{url('')}}/public/js/app.js"></script>
    {{-- <script async defer
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBc-l_-IyaKNzygWGRnOXMPBLEvTAVIv4E&callback=initMap">
    </script> --}}
    <script src='https://maps.googleapis.com/maps/api/js?key=AIzaSyCfIb1qabz1cPUHX3Fq0ecohOGi_QaEiBY'></script>
    
    {{-- <script>
        function initMap() {

            //Nếu không có div id = map thì không chạy
            if (document.getElementById('map') !== null){
                var uluru = { lat: -25.344, lng: 131.036 };
                // The map, centered at Uluru
                var map = new google.maps.Map(
                    document.getElementById('map'), { zoom: 8, center: uluru });
                // The marker, positioned at Uluru
                var marker = new google.maps.Marker({ position: uluru, map: map });
            }

        }
    </script> --}}
</body>
</html>
