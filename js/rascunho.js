  '<div class="card-image center container">'
    +'<br>'
    +'<p class="black-text center">Umidade do ar: </p>'
    
    +'<h4 class="black-text center">' + this.umidade + '%' + '</h4>'
    +'<canvas id="myChart" width="40" height="40"></canvas>'
    +'</div>'

    +'<div class="card-content activator">'
    +'<span class="card-title grey-text text-darken-4">'
  
    +'<i class="material-icons right">more_vert</i>'
    +'</span>'
    +'<p class="black-text">Clique para ver histórico</p>'
    +'</div>'
    +'<div class="card-reveal">'
    +'<span class="card-title grey-text text-darken-4">'
    +'Histórico'
    +'<i class="material-icons right">close</i>'
    +'</span>'
    +'<canvas id="umidLineChart"></canvas>'
    +'</div>'

    function criaGrafico (teste) {
        var ctx = document.getElementById("myChart").getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: [],
                datasets: [{
                    label: '# of Votes',
                    data: teste,
                    backgroundColor: [
                        '#10E9B6',
                        '#A389D4',
                     
                    ],
                    borderColor: [
                        '#10E9B6',
                        '#A389D4',
                     
                    ],
                    borderWidth: 1
                }]
            }
        });
    }