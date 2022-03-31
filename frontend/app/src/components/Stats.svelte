<script lang="ts">
  import {onMount} from 'svelte';
  import {userToken} from './stores.js';

  let token;
  userToken.subscribe(value => {
		token = value;
	});

  function createChart() {
    const barChart = document.getElementById('likesChart');
    const likesChart = new Chart(barChart, {
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
  const lineChart = document.getElementById('viewChart');
    const viewChart = new Chart(lineChart, {
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
let subscriber = "";
let views = "";
let videos = "";
let likes = "";

  async function getChannelStats() {
    const res = await fetch(
      `https://170.187.186.86:3000/api/v1/myStats/channelStats/${token}`
          );
    const info = await res.json();
    console.log(info);
    subscriber = info.data.subscriberCount;
    views = info.data.videoCount;
    videos = info.data.viewCount;

  }

  async function getVideoStats() {
    const res = await fetch(
      `https://170.187.186.86:3000/api/v1/myStats/videoIds/${token}`
    );
    const info = await res.json();
    console.log(info);

    for(var i=0; i < info.data.allVideos.length; i++){
      let videoId = info.data.allVideos[i];
      const res2 = await fetch(
      `https://170.187.186.86:3000/api/v1/myStats/videoStats/${token}/${videoId}`
    );
    const info2 = await res2.json();
    console.log(info2);

    likes += info2.data.likeCount;

    }
  }

  var monthlyViews: String[];

  async function getMonthlyStats() {
    const res = await fetch(
      `https://170.187.186.86:3000/api/v1/myStats/channelStatsPerMonth/${token}`
    );
    const info = await res.json();
    console.log(info);
    console.log(info.data.length);

  }

  onMount(() => {
  createChart();
  getChannelStats();
  getVideoStats();
  getMonthlyStats();
  });

</script>

<main>
  <h1> Overview </h1>
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
  <div class="test">
  <canvas id="viewChart" />
  </div>
  <h1>Likes</h1>
  <h1>Uploads</h1>
  <div class="test">
  <canvas id="likesChart" />
  </div>
  <h1>Comments</h1>
  <h1>Demography</h1>
  <div class="test">
  <canvas id="demographyChart" />
  </div>

</main>

<style>


.test {
    position: relative;
    height: 70%;
    width: 70%;
    padding-left: 230px;
  }
  h1 {
    font-size: 50px;
    color:#f0ab00;
    text-align: center;
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
}

</style>
