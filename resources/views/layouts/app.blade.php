<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <base href="{{url('')}}/">
    <script>
        var baseUrl = "{{url('')}}";
    </script>

    <title>{{ config('app.name', 'NOI DUYEN') }}</title>

    <!-- Styles -->
    <link rel="stylesheet" href="{{url('')}}/public/css/app.css" type="text/css">
    <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.css" />
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick-theme.min.css" />
    <link rel="stylesheet" type="text/css" href="https://rawgit.com/buildo/react-semantic-datepicker/master/examples/build/style.bc98d18d0bafb17a4b51.min.css"/>
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
    
</body>
</html>
