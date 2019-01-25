var lat;
var lng;

var lista = document.querySelectorAll('.lista');
for (var i = 0; i < lista.length; i++) {
    listar(lista[i]);
}

function listar(lista) {
    console.log(lista);
  firebase.database().ref('GPS').on('value', function (snapshot) {
    //lista.innerHTML = '';
    
    snapshot.forEach(function (item) {
        lat = parseFloat(item.val().lat);
        lng = parseFloat(item.val().long);
    });

    console.log(lat);
    console.log(lng);
    

    var teste = {lat: lat, lng: lng};
    initMap(teste);

    });
}

  // Initialize and add the map
  function initMap(teste) {
    // The location of Uluru
    var uluru = teste;
    // The map, centered at Uluru
    var map = new google.maps.Map(
        document.getElementById('map'), {zoom: 10, center: uluru});
    // The marker, positioned at Uluru
    var marker = new google.maps.Marker({position: uluru, map: map});
  }

