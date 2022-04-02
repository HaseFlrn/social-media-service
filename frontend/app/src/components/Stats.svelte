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
let names = new Array(10);
let selected;
let videoLikes;
let videoDislikes;
let videoViews;
let videoComments;

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

  async function getLikes() {
    const res = await fetch(
      `https://youtol.de:3000/api/v1/myStats/videoIds/${token}`
    );
    const info = await res.json();
    console.log(info);

    for(var i=0; i < info.data.allVideos.length; i++){
      let videoId = info.data.allVideos[i];
      names[i] = videoId;
      const res2 = await fetch(
      `https://youtol.de:3000/api/v1/myStats/videoStats/${token}/${videoId}`
    );
    const info2 = await res2.json();
    console.log(info2);

    likes += info2.data.likeCount;
    }
    console.log("Namen");
    console.log(names);
  }


  async function getMonthlyViews() {
    const res = await fetch(
      `https://youtol.de:3000/api/v1/myStats/channelStatsPerMonth/${token}`
    );
    const info = await res.json();
    console.log(info);
    var monthlyViews: number[] = new Array(12);
    monthlyViews[0] = info.data.january.views;
    monthlyViews[1] = info.data.february.views;
    monthlyViews[2] = info.data.march.views;
    monthlyViews[3] = info.data.april.views;
    monthlyViews[4] = info.data.may.views;
    monthlyViews[5] = info.data.june.views;
    monthlyViews[6] = info.data.july.views;
    monthlyViews[7] = info.data.august.views;
    monthlyViews[8] = info.data.september.views;
    monthlyViews[9] = info.data.october.views;
    monthlyViews[10] = info.data.november.views;
    monthlyViews[11] = info.data.december.views;

    console.log(monthlyViews);
    return monthlyViews;
  }

  async function getMonthlyLikes() {
    const res = await fetch(
      `https://youtol.de:3000/api/v1/myStats/channelStatsPerMonth/${token}`
    );
    const info = await res.json();
    console.log(info);
    
var monthlyLikes: number[] = new Array(12);
    // monthlyLikes[0] = info.data.january.likes;
    // monthlyLikes[1] = info.data.february.likes;
    monthlyLikes[0] = 22;
    monthlyLikes[1] = 55;
    monthlyLikes[2] = info.data.march.likes;
    monthlyLikes[3] = info.data.april.likes;
    monthlyLikes[4] = info.data.may.likes;
    monthlyLikes[5] = info.data.june.likes;
    monthlyLikes[6] = info.data.july.likes;
    monthlyLikes[7] = info.data.august.likes;
    monthlyLikes[8] = info.data.september.likes;
    monthlyLikes[9] = info.data.october.likes;
    monthlyLikes[10] = info.data.november.likes;
    monthlyLikes[11] = info.data.december.likes;

    console.log(monthlyLikes);
    return monthlyLikes;
  }

  async function getVideoStats(videoId: number) {
    const res = await fetch(
      `https://youtol.de:3000/api/v1/myStats/videoStats/${token}/${videoId}`
    );
    const info = await res.json();
    console.log("INFOS")
    console.log(info);

    videoViews = info.data.viewCount;
    videoLikes = info.data.likeCount;
    videoDislikes = info.data.dislikeCount;
    videoComments = info.data.commentCount;
  }

  async function createChart() {
    const barChart = document.getElementById('likesChart');
    const monthlyViews = await getMonthlyViews();
    const monthlyLikes = await getMonthlyLikes();
    const likesChart = new Chart(barChart, {
      type: 'bar',
      data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          datasets: [{
              label: 'Filler Chart',
              data: monthlyLikes,
              backgroundColor: [
                  'rgba(255, 150, 0, 0.3)',
                  'rgba(240, 171, 0, 0.3)',
                  'rgba(255, 150, 0, 0.3)',
                  'rgba(240, 171, 0, 0.3)',
                  'rgba(255, 150, 0, 0.3)',
                  'rgba(240, 171, 0, 0.3)',
                  'rgba(255, 150, 0, 0.3)',
                  'rgba(240, 171, 0, 0.3)',
                  'rgba(255, 150, 0, 0.3)',
                  'rgba(240, 171, 0, 0.3)',
                  'rgba(255, 150, 0, 0.3)',
                  'rgba(240, 171, 0, 0.3)'
              ],
              borderColor: [
                  'rgba(255, 150, 0, 1)',
                  'rgba(240, 171, 0, 1)',
                  'rgba(255, 150, 0, 1)',
                  'rgba(240, 171, 0, 1)',
                  'rgba(255, 150, 0, 1)',
                  'rgba(240, 171, 0, 1)',
                  'rgba(255, 150, 0, 1)',
                  'rgba(240, 171, 0, 1)',
                  'rgba(255, 150, 0, 1)',
                  'rgba(240, 171, 0, 1)',
                  'rgba(255, 150, 0, 1)',
                  'rgba(240, 171, 0, 1)'
              ],
              borderWidth: 2
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
              data: monthlyViews,
              fill: false,
              borderColor: 'rgba(240, 171, 0, 1)',
              tension: 0.1,
              borderWidth: 4  
          }]
      },
  });
  // const polarChart = document.getElementById('demographyChart');
  //   const demographyChart = new Chart(polarChart, {
  //     type: 'polarArea',
  //     data: {
  //       labels: ['Germany', 'Austria', 'Swiss', 'UK', 'USA', 'Denmark'],
  //       datasets: [{
  //         label: 'Filler Chart',
  //         data: [11, 16, 7, 3, 14],
  //         backgroundColor: [
  //     'rgb(255, 99, 132)',
  //     'rgb(75, 192, 192)',
  //     'rgb(255, 205, 86)',
  //     'rgb(201, 203, 207)',
  //     'rgb(54, 162, 235)'
  //     ]
  //     }]
  //   },
  // })
}

  // const hello = document.getElementById('"test"');
  // const btn = document.getElementById("huhu");
  // btn.onclick = function () {
  //   hello.style.display = "none";
  // }
	function handleSubmit() {
    document.getElementById('videoStats').style.display = 'block';
    getVideoStats(selected);
	}

  onMount(() => {
  getChannelStats();
  getLikes();
  getMonthlyViews();
  getMonthlyLikes();
  createChart();
  });
  

</script>

<main>
  <h1> Overview </h1>
  <!-- <div>{token}</div> -->
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
  <div class="chart">
  <canvas id="likesChart" />
  </div>

  <h1>Videos</h1>
  <div class="selection">
    <slot>
      <p>Get statistics from your five latest videos.</p> 
    </slot>
    <slot>
      <form on:submit|preventDefault={handleSubmit}>
        <select bind:value={selected}>
            <option value={names[0]}>{names[0]}</option>
            <option value={names[1]}>{names[1]}</option>
            <option value={names[2]}>{names[2]}</option>
            <option value={names[3]}>{names[3]}</option>
            <option value={names[4]}>{names[4]}</option>
        </select>
      <button disabled={!selected} type=submit>
        Submit
      </button>
    </slot>
  </div>

  <div id='videoStats' style="display: none;" class='box'>
    <slot>
      <div>{videoViews} Views</div>
    </slot>
    <slot>
      <div>{videoLikes} Likes</div>
    </slot>
    <slot>
      <div>{videoDislikes} Dislikes</div>
    </slot>
    <slot>
      <div>{videoComments} Comments</div>
    </slot>
  </div>
  <br />

  <!-- <h1>Demography</h1>
  <div class="chart">
  <canvas id="demographyChart" />
  </div> -->
</main>

<style>

.chart {
    margin: auto;
    width: 65%;
  }
  h1 {
    font-size: 300%;
    color:black;
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
  font-size: 150%;
  font-weight: 400;
}
.selection {
  margin: auto;
  width: 100%;
  text-align: center;
}
.selection > p {
  font-size: 200%;
  font-weight: 350;
  color: #f0ab00;
}
.selection > form > button {
  font-size: 150%;
  font-weight: 400;
  cursor: pointer;
  border: 1px solid gray;
  border-radius: 10px;
  margin-left: 10px;
  padding: 10px;
}

.selection > form > button:hover {
  background-color: #f0ab00;
}

.selection > form > select {
  font-size: 150%;
  font-weight: 400;
  border: 1px solid gray;
  border-radius: 10px;
  cursor: pointer;
  margin-right: 10px;
}
.box {
    margin: auto;
    margin-top: 30px;
    margin-bottom: 40px;
    width: 30%;
    border: 1px solid grey;
    border-radius: 10px;
    padding: 15px;
    text-align: center;
    background-color: white;
  }

  .box > div {
    margin-top: 0px;
    font-size: 150%;
    font-weight: 400;
    padding: 5px
  }

</style>
