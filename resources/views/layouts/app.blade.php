<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <base href="{{url_root()}}/">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Styles -->
    <link rel="stylesheet" href="{{url('')}}/public/css/app.css" type="text/css">
    <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
</head>
<body>
    <div id="app"></div>
    
    
    <!-- Scripts -->
    <script>
        const APP_URL = "{{ env("APP_URL") }}"
    </script>
    <script src="{{url('')}}/public/js/app.js"></script>
    {{-- <script async defer
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBc-l_-IyaKNzygWGRnOXMPBLEvTAVIv4E&callback=initMap">
    </script> --}}
    <script src='https://maps.googleapis.com/maps/api/js?key=AIzaSyBc-l_-IyaKNzygWGRnOXMPBLEvTAVIv4E&libraries=places'></script>
    
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
