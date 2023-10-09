const api = 'https://disease.sh/v3/covid-19/historical/all?lastdays=90';

const getData = async () => {
  const response = await fetch(`${api}`);
  if (response.ok) {
    return await response.json();
  } else {
    return Promise.reject(response.status);
  }
};

const result = getData();
result
  .then((data) => {
    let date = Object.keys(data.cases);
    let total = Object.values(data.cases);
    let deaths = Object.values(data.deaths);
    let recovered = Object.values(data.recovered);
    var ctx = document.getElementById('myChart').getContext('2d');
    let myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: date,
        datasets: [
          {
            label: 'Casos Totales',
            data: total,
            borderColor: 'rgba(255, 99, 132)',
            fill: false,
          },
          {
            label: 'Recuperados',
            data: recovered,
            borderColor: 'rgba(153, 102, 255, 1)',
            fill: false,
          },
          {
            label: 'Muertes',
            data: deaths,
            borderColor: 'rgba(75, 192, 192, 1)',
            fill: false,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'Número de Casos',
              },
            },
          ],
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'Fecha(DD/MM/AAAA)',
              },
            },
          ],
        },
        title: {
          display: true,
          text: `Casos de Covid en el mundo los últimos 3 meses`,
        },
      },
    });
  })
  .catch((error) => {
    console.log('Error: ', error);
  });