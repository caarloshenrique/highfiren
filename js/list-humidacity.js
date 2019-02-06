var umidade;
var resto;

var lista = document.querySelectorAll('.lista');
for (var i = 0; i < lista.length; i++) {
    listar(lista[i]);
}

function listar(lista) {
    console.log(lista);
  firebase.database().ref(lista.title).on('value', function (snapshot) {
    //lista.innerHTML = '';
    
    snapshot.forEach(function (item) {
        umidade = parseFloat(item.val());
    });

    resto = parseFloat(100 - umidade);
    console.log(umidade);
    console.log(resto);
    
    var teste = [umidade, resto];
    //criaGrafico(teste);

    //lista.innerHTML +=
  

    });
}



(function(){

    var db = firebase.database();

   // Cria os listeners dos dados no firebase
   var temperaturaRef = db.ref('DHT-Temperature');
   var umidRef = db.ref('DHT-Humidacity');
   var umidSoilRef = db.ref('YL-69');
   var tempSoilRef = db.ref('DS18B20');
   var rainRef = db.ref('MH-RD');
   var windRef = db.ref('Anemometro');
   var dirWindRef = db.ref('Biruta');
 
   // Registra as funções que atualizam os gráficos e dados atuais da telemetria
   temperaturaRef.on('value', onNewData('currentTemp', 'tempLineChart' , 'Temperatura °C', '°C'));
   umidRef.on('value', onNewData('currentUmid', 'umidLineChart' , 'Umidade %', '%'));
   umidSoilRef.on('value', onNewData('currentUmidSoil', 'umidSoilLineChart', 'Umidade Solo %', '%'));
   tempSoilRef.on('value', onNewData('currentTempSoil', 'tempSoilLineChart' , 'Temperatura Solo °C', '°C'));
   rainRef.on('value', onNewData('currentRain', 'rainLineChart' , 'Intensidade', ''));
   windRef.on('value', onNewData('currentWind', 'windLineChart' , 'Velocidade km/h', 'km/h'));
   dirWindRef.on('value', onNewData('currentDirWind', 'windDirLineChart' , 'Direção', ''));
 
 })();
 
 
 // Retorna uma função que de acordo com as mudanças dos dados
 // Atualiza o valor atual do elemento, com a metrica passada (currentValueEl e metric)
 // e monta o gráfico com os dados e descrição do tipo de dados (chartEl, label)
 function onNewData(currentValueEl, chartEl, label, metric){
   return function(snapshot){
     var readings = snapshot.val();
     if(readings){
         var currentValue;
         var data = [];
         for(var key in readings){
           currentValue = readings[key]
           data.push(currentValue);
         }
         
         var umidade = currentValue;

         document.getElementById(currentValueEl).innerText = umidade + ' ' + metric;
         
    
         buildLineChart(chartEl, label, data);
     }
   }
 }
 
 // Constroi um gráfico de linha no elemento (el) com a descrição (label) e os
 // dados passados (data)
 function buildLineChart(el, label, data){
   var elNode = document.getElementById(el);
   new Chart(elNode, {
     type: 'line',
     data: {
         labels: new Array(data.length).fill(""),
         datasets: [{
             label: label,
             data: data,
             borderWidth: 1,
             fill: false,
             spanGaps: false,
             lineTension: 0.1,
             backgroundColor: "#F9A825",
             borderColor: "#F9A825"
         }]
     }
   });
 }

// ,
//options: {
//    scales: {
//        yAxes: [{
//            ticks: {
//                beginAtZero:true
//            }
//        }]
//    }
//}