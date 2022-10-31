<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <link rel="stylesheet" href="{{ mix('/css/app.css') }}">
    <title>Bookworm</title>
</head>

<body>
    <div id="root"></div>
    <script src="{{mix('/js/app.js')}}"></script>
</body>

</html>