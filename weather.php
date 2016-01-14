<?php

$myLat = $_GET['lat'];
$myLng = $_GET['lng'];

const API_ENDPOINT = 'https://api.forecast.io/forecast/';
$api = '734be9ea5c90b6664be5e366fdbab8ab';
$request_url = API_ENDPOINT . $api . '/' . $myLat . ',' . $myLng;

$curl_handle=curl_init();
curl_setopt($curl_handle, CURLOPT_URL,$request_url);
curl_setopt($curl_handle, CURLOPT_CONNECTTIMEOUT, 2);
curl_setopt($curl_handle, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($curl_handle, CURLOPT_USERAGENT, 'Yo');
$query = curl_exec($curl_handle);
curl_close($curl_handle);

header('Content-Type: application/json');

echo json_encode($query);

return;