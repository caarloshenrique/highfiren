var lat;
var lng;

var lista = document.querySelectorAll(".lista");
for (var i = 0; i < lista.length; i++) {
  listar(lista[i]);
}

function listar(lista) {
  console.log(lista);

  firebase
    .database()
    .ref("GPS")
    .on("value", function(snapshot) {
      //lista.innerHTML = '';

      snapshot.forEach(function(item) {
        lat = parseFloat(item.val().lat);
        lng = parseFloat(item.val().long);
      });

      console.log(lat);
      console.log(lng);

      var teste = { lat: lat, lng: lng };
      initMap(teste);
    });
}

function initMap(teste) {
  var uluru = teste;
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: uluru
  });

  var saida;
  var umidade;
  var temperatura;
  firebase
    .database()
    .ref("/")
    .on("value", function(snapshot) {
      let dados = []
      snapshot.forEach(function(item) {
        item.forEach((i)=>{
            saida = i.val()
        })
        dados.push(saida)
      });

      //   saida = umidade;
      //   console.log("Saida:");
        console.log(dados);

      var contentString =
        "<center>" +
        '<div id="content">' +
        '<p id="firstHeading" class="firstHeading black-text tamanho"><b>Plataforma 1</b></p>' +
        "</center>" +
        '<div id="bodyContent">' +
        '<center><p class="black-text"><b>Umidade do ar:' +
        ' ' +
        dados[2] +
        "%</b></p>" +
        '<p class="black-text"><b>Temperatura do ar: ' +
        " " +
        dados[3] +
        "°C </b></p>" +
        '<p class="black-text"><b>Intensidade Chuva:  ' +
        " " +
        dados[6] +
        "</b></p>" +
        '<p class="black-text"><b>Umidade do solo:  ' +
        " " +
        dados[7] +
        "%</b></p>" +
        '<p class="black-text"><b>Temperatura do solo: ' +
        " " +
        dados[4] +
        "°C</b></p>" +
        '<p class="black-text"><b>Velocidade do Vento:  ' +
        " " +
        dados[0] +
        " km/h</b></p>" +
        '<p class="black-text"><b>Direção do Vento:  ' +
        " " +
        dados[1] +
        "</b></p></center>" +
        '<center><a href="monitoramento.html" class="btn-small">Detalhes</a></center>' +
        "<br>" +
        "</div>" +
        "</div>";

      var infowindow = new google.maps.InfoWindow({
        content: contentString
      });

      var marker = new google.maps.Marker({
        position: uluru,
        map: map,
        title: "Uluru (Ayers Rock)"
      });

      infowindow.open(map, marker);
      marker.addListener("click", function() {
        infowindow.open(map, marker);
      });
    });
}
