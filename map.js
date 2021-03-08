// // (function() {
// $(document).ready(function() {

//     var placesAutocomplete = places({
//         appId: algolia_key.ID,
//         apiKey: algolia_key.SEARCH_KEY,
//         container: document.querySelector('#city'),
//         templates: {
//             value: function(suggestion) {
//                 return suggestion.name;
//             }
//         }
//     }).configure({
//         type: 'city',
//         aroundLatLngViaIP: false,
//     });
//     // placesAutocomplete(); 
//     //   })();
// })

// var lat; 
// var lng; 


$(document).ready(function(){
    
    console.log("loading map.js");
    
    
    
    // TO MAKE THE MAP APPEAR YOU MUST
    // ADD YOUR ACCESS TOKEN FROM
    // https://account.mapbox.com
    mapboxgl.accessToken = mapbox_key.TOKEN;
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        // default Marseille: 43.2965° N, 5.3698° E 
        center: [5.3698, 43.2965],
        zoom: 12, 
    });
    
    map.addControl(
        new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl
        })
        );

        // return a LngLat object such as {lng: 0, lat: 0}
        // var {lng,lat} = map.getCenter(); 
        coord = map.getCenter(); 
        // [lng, lat] = [coord.lng, coord.lat]; 
        // console.log('longitude: ', lng, 'latitude: ', lat); 
        
        $('#map').find('.mapboxgl-ctrl-geocoder--input').attr('placeholder','Search a city...  ex. Marseille');
        
    })

    export default map;
