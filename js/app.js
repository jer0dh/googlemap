/**
 * Created by jerod on 1/14/2016.
 */
$('document').ready(function() {
    /* These markers would be created by Grails*/
    var markerData = [
        {
            position: {lat: 30.907, lng: -86.726 },
            title: 'Great Golf'
        },
        {
            position: {lat: 30.7843, lng: -89.780 },
            title: 'Ka\'ako Golf'
        },
        {
            position: {lat: 31.259, lng: -85.803 },
            title: 'Westview Golf'
        }
    ];
    /* Map center coordinates - added by Grails */
    var mapCenter = {lat: 30.619, lng: -87.297};

    // data-bind forecast object to DOM
    var data = {};
    rivets.bind(jQuery('#forecast'), {data: data});
    rivets.formatters.percent = function(value){
        return String((value * 100))+"%";
    };

    var map;
    window.initMap = function (){
        map = new google.maps.Map(document.getElementById('map'), {
            center: mapCenter,
            zoom: 8
        });

        map.addListener('click', function(e) {
            var lat = e.latLng.lat();
            var lng = e.latLng.lng();


            $.ajax('http://jhtechservices.com/googlemap/weather.php?lat=' + lat +'&lng='+lng, {
                dataType: 'json',
                beforeSend: function() {
                    $('.loading').show();
                },
                complete: function() {
                    $('.loading').hide();
                },
                error: function(e,status, error) {
                    console.log('Ajax to forecast api failed with status: '+status + ' Error: ' + error);
                },
                success: function(result){
                    data.forecast = JSON.parse(result);
                    // Had to do this b/c rivets having issue with array
                    data.today = data.forecast.daily.data[0];
                    data.tomorrow = data.forecast.daily.data[1];
                    data.third = data.forecast.daily.data[2];
                }

            });
        });

        var infoWindow = new google.maps.InfoWindow();

        var markers = [];
        for(var i=0; i < markerData.length; i++ ){
            markers[i] = new google.maps.Marker({
                position : markerData[i].position,
                map: map,
                title: markerData[i].title
            });
            markers[i].glfInfoData = $('.marker'+i)[0].outerHTML;

            google.maps.event.addListener(markers[i],'mousedown', function() {
                infoWindow.close();
                infoWindow.open(map, this);
                infoWindow.setContent(this.glfInfoData);
                /* Init magnificPopup */
                $('.marker').magnificPopup({
                    delegate: 'a',
                    type: 'image'
                });
            });

        }
        window.markers = markers;


    };  // end initMap




});


