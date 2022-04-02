<script lang="ts">
  import {onMount} from 'svelte';
  import { beforeUpdate, afterUpdate } from 'svelte';
  import {userToken} from './stores.js';

  let token;
  userToken.subscribe(value => {
		token = value;
	});

  
let subscriber = "";
let views = "";
let videos = "";
let likes = 0;

  async function getChannelStats() {
    const res = await fetch(
      `https://youtol.de:3000/api/v1/myStats/channelStats/${token}`
          );
    const info = await res.json();
    console.log(info);
    subscriber = info.data.subscriberCount;
    views = info.data.viewCount;
    videos = info.data.videoCount;

  }

  async function getVideoStats() {
    const res = await fetch(
      `https://youtol.de:3000/api/v1/myStats/videoIds/${token}`
    );
    const info = await res.json();
    console.log(info);

    for(var i=0; i < info.data.allVideos.length; i++){
      let videoId = info.data.allVideos[i];
      const res2 = await fetch(
      `https://youtol.de:3000/api/v1/myStats/videoStats/${token}/${videoId}`
    );
    const info2 = await res2.json();
    console.log(info2);

    likes += info2.data.likeCount;

    }
  }

  

  async function getMonthlyStats() {
    const res = await fetch(
      `https://youtol.de:3000/api/v1/myStats/channelStatsPerMonth/${token}`
    );
    const info = await res.json();
    console.log(info);
    var monthlyViews: number[];
    // monthlyViews[0] = info.data.january.views;
    // monthlyViews[1] = info.data.february.views;
    monthlyViews[2] = info.data.march.views;
    // monthlyViews[3] = 22;
    // monthlyViews[4] = info.data.may.views;
    // monthlyViews[5] = info.data.june.views;
    // monthlyViews[6] = info.data.july.views;
    // monthlyViews[7] = info.data.august.views;
    // monthlyViews[8] = info.data.september.views;
    // monthlyViews[9] = info.data.october.views;
    // monthlyViews[10] = info.data.november.views;
    // monthlyViews[11] = info.data.december.views;

    console.log(monthlyViews);
    

    return monthlyViews;
  }

  async function createChart() {
    const barChart = document.getElementById('likesChart');
    // const test = await getMonthlyStats();
    const likesChart = new Chart(barChart, {
      type: 'bar',
      data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          datasets: [{
              label: 'Filler Chart',
              data: [1,1,1,1,1,1,1,1,1,1,1],
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
  const lineChart = document.getElementById('viewChart');
    const viewChart = new Chart(lineChart, {
      type: 'line',
      data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          datasets: [{
              label: 'Filler Chart',
              data: [0,1,2,3,4,5,6,7,8,9,10,11],
              fill: false,
              borderColor: 'rgba(235, 125, 0, 1)',
              tension: 0.1,
              borderWidth: 5   
          }]
      },
  });
  const polarChart = document.getElementById('demographyChart');
    const demographyChart = new Chart(polarChart, {
      type: 'polarArea',
      data: {
        labels: ['Germany', 'Austria', 'Swiss', 'UK', 'USA', 'Denmark'],
        datasets: [{
          label: 'Filler Chart',
          data: [11, 16, 7, 3, 14],
          backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(75, 192, 192)',
      'rgb(255, 205, 86)',
      'rgb(201, 203, 207)',
      'rgb(54, 162, 235)'
      ]
      }]
    },
  })
}

  onMount(() => {
  getChannelStats();
  getVideoStats();
  createChart();
  getMonthlyStats();
  });
  

</script>

<main>
  <h1> Overview </h1>
  <div>{token}</div>
  <br />
  <div> {likes} </div>
  <div class="grid-container">
    <div class="item"> {views}
      <div>Views</div>
    </div>
    <div class="item"> {likes}
      <div>Likes</div>
    </div>
    <div class="item"> {subscriber}
      <div>Subscribers</div>
    </div>  
    <div class="item"> {videos}
      <div>Videos</div>
    </div>
  </div>

  <h1>Views</h1>
  <div class="chart">
  <canvas id="viewChart" />
  </div>
  <h1>Likes</h1>
  <h1>Uploads</h1>
  <div class="chart">
  <canvas id="likesChart" />
  </div>
  <h1>Comments</h1>
  <h1>Demography</h1>
  <div class="chart">
  <canvas id="demographyChart" />
  </div>

</main>

<style>


.chart {
    margin: auto;
    width: 65%;
  }
  h1 {
    font-size: 50px;
    color:#f0ab00;
    text-align: center;
    font-weight: 350;
  }
 .grid-container {
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 20px;
  background-color: #f0ab00;
  padding: 20px;
  border-radius: 10px;
}

.grid-container > div {
  display: grid;
  grid-template-rows: auto auto;
  background-color: #fdf3e7;
  text-align: center;
  padding: 20px;
  border-radius: 10px;
  font-size: 30px;
  font-weight: 350;
}

</style>
