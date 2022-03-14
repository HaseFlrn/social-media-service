<script>
  import {onMount} from 'svelte';

  function createChart() {
    const barChart = document.getElementById('myChart');
    const myChart = new Chart(barChart, {
      type: 'bar',
      data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [{
              label: 'Filler Chart',
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: [
                  'rgba(235, 125, 0, 0.2)',
                  'rgba(255, 197, 71, 0.2)',
                  'rgba(235, 125, 0, 0.2)',
                  'rgba(255, 197, 71, 0.2)',
                  'rgba(235, 125, 0, 0.2)',
                  'rgba(255, 197, 71, 0.2)'
              ],
              borderColor: [
                  'rgba(235, 125, 0, 1)',
                  'rgba(255, 197, 71, 1)',
                  'rgba(235, 125, 0, 1)',
                  'rgba(255, 197, 71, 1)',
                  'rgba(235, 125, 0, 1)',
                  'rgba(255, 197, 71, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
  const lineChart = document.getElementById('myLineChart');
    const myLineChart = new Chart(lineChart, {
      type: 'line',
      data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [{
              label: 'Filler Chart',
              data: [12, 19, 21, 30, 28, 35],
              fill: false,
              borderColor: 'rgba(235, 125, 0, 1)',
              tension: 0.1,
              borderWidth: 5
              
          }]
      },
  })
}
  onMount(createChart);
</script>

<main>
  <h1> Overview </h1>

  <div class="grid-container">
    <div class="item">XXX
      <div>Views</div>
    </div>
    <div class="item">XXX
      <div>Likes</div>
    </div>
    <div class="item">XXX
      <div>Gained Subscribers</div>
    </div>  
    <div class="item">XXX
      <div>Comments</div>
    </div>
  </div>

  <h1>Views</h1>
  <canvas id="myLineChart" />
  <h1>Likes</h1>
  <h1>Uploads</h1>
  <canvas id="myChart" />
  <h1>Comments</h1>

</main>

<style>

  h1 {
    font-size: 50px;
    color:#eb7d00;
    text-align: center;
  }
 .grid-container {
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 20px;
  background-color: #eb7d00;
  padding: 20px;
}

.grid-container > div {
  display: grid;
  grid-template-rows: auto auto;
  background-color: #fdf3e7;
  text-align: center;
  padding: 20px 0;
  font-size: 30px;
}

.myChart {
  width: 50px;
  height: 50px;
}

</style>
