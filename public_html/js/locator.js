var map = {};
var markers = [];
var boxes = [];
var mapBuilt = false;
var markersReady = false;
var mapCenter = {
  lat: 53.0064846,
  lng: -2.2704541
};


function initMap() {
  map = new google.maps.Map(document.getElementById('map-stockists'), {
    center: {lat: mapCenter.lat, lng: mapCenter.lng },
    zoom: 11
  });

  mapBuilt = true;

  addMarkers();

}


$(document).ready(function(){

  var mapDiv = $("#stockists-map");
  var reCentre = false;

  //get the center of the map from the HTML data attributes
  mapCenter.lat = parseFloat($("#map-stockists").data("mapCenterLat"));
  mapCenter.lng = parseFloat($("#map-stockists").data("mapCenterLng"));

  
  //if we have a map - recenter it to these new coords - otherwise we can rely on initMap
  
  if ( mapBuilt ) {
    console.log("Recentre Map");
    map.setCenter( mapCenter );
  }

  //only add the markers if we have a map
  if ( mapBuilt ) {
    addMarkers();
  }

});

function addMarkers() {


  //this gets all the markers and adds them to the map
  $(".location-place").each(function(loopIndex){

    var loc = $(this);

    var boxContent = "";

    var thisLatLng = {
      lat: parseFloat(loc.data("mapLat")),
      lng: parseFloat(loc.data("mapLng"))
    };

    //use a nice circle for a marker looks pretty but isn't!
    var lineSymbol = {
    path: google.maps.SymbolPath.CIRCLE,
    scale: 5,
    strokeColor: "#5aa0d2"
    };


 
    //add a new marker to the global array

    markers.push(
      new google.maps.Marker({
        map: map,
        position: thisLatLng,
        icon: {
          url: "../img/map-markers/m" + loc.data("locIndex") + ".png",
          scaledSize: new google.maps.Size(30, 30)
        },
        //label: "" + loc.data("locIndex"),
        title: "Hello World!"
      })
    );

    //add a new infoWindow to the array
    boxContent = "<p><b>" + loc.find(".place-name").html() + "</b><br>" + loc.find(".address").html() + "</p>"

    boxes.push(
      new google.maps.InfoWindow({
        content: boxContent
      })
    );

    //add the new infoWindow to the click on the marker


    markers[ loopIndex ].addListener( "click", function() {
      boxes[ loopIndex ].open(map, markers[ loopIndex ] );
    });

    //add the click event on the location index to zoom and center the map
    loc.find(".range-order").click(function(){

      map.panTo( thisLatLng );
      map.setZoom( 14 );

    });

  });

  markersReady = true;

}