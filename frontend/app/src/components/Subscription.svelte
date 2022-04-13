<script>
  import {onMount} from 'svelte';
  import {userToken} from './stores.js';

  let token;
  userToken.subscribe(value => {
		token = value;
	});

  
  let subscribedChannels = [];
  let subscribedChannelsData = [];
  let channelId;
  let myChannelId;
  let myViews;

  async function getSubscribers() {
    const res = await fetch(
      `https://youtol.de:3000/api/v1/mySubs/subs?token=${token}`
        );
    const data = await res.json();
    console.log(data);
    subscribedChannels = data.channels;
    
    for (let i = 0; i < subscribedChannels.length; i++) {
      const channel = subscribedChannels[i];
      channelId = channel.snippet.resourceId.channelId;

      const res2 = await fetch(`https://youtol.de:3000/api/v1/mySubs/stats/basic?token=${token}&channelId=${channelId}`);
      const data2 = await res2.json();
      subscribedChannelsData.push(data2);
      console.log(subscribedChannelsData);
    }
    

  }


  async function getViews() {
    const channel = subscribedChannels[1];
    myChannelId = channel.snippet.channelId;
    console.log(myChannelId);
    const res = await fetch(`https://youtol.de:3000/api/v1/mySubs/stats/basic?token=${token}&channelId=${myChannelId}`);
    const data = await res.json();
    console.log(data);
    myViews = data.viewCnt;
  }


  let myTitle;

  async function getChannelInfo() {
    const res = await fetch(
      `https://youtol.de:3000/api/v1/general/channelInfos/${token}`
    );
    const data = await res.json();
    console.log(data);
    myTitle = data.channelTitle;

  }

  function openMyChannel(){
    if(document.getElementById("myChannel").style.display == "none"){
      document.getElementById("myChannel").style.display = "block";
    }else{
      document.getElementById("myChannel").style.display == "none";
    }
  }

  
    
  onMount(() => {
    getChannelInfo();
    getViews();
    getSubscribers();
  });

</script>

<main>
  <div>{token}</div>
  <div class="column side">
    <h1>My Channel</h1>
    <button class="button" on:click={openMyChannel()}>
      <h4>{myTitle}</h4>
    </button>
  </div>

  <div class="column middle">
    <h1>My Stats</h1>
    <div id="myChannel" class="container" style="display:none;">
      <h2>{myTitle}</h2>
      <div class="container-flex">
        <div class="grid-container">
          <div class="item"> {myViews}
            <div>Views</div>
          </div>
          <div class="item"> XXX
            <div>Likes</div>
          </div>
          <div class="item"> XXX
            <div>Subscribers</div>
          </div>  
          <div class="item"> XXX
            <div>Videos</div>
          </div>
        </div>
      </div>
    </div>
  </div>


  
  <div class="column side">
    <h1>Subscribed Channels</h1>
    {#each subscribedChannels as channel}
    <button class="button">
      <h4>{channel.snippet.title}</h4>
    </button>
    {/each}
  </div>

  <div class="column middle">
    <h1>My Subscriptions</h1>
    {#each subscribedChannels as channel}
    <div class="container">
        <h2>{channel.snippet.title}</h2>
        <div class="container-flex">
          <div class="grid-container">
            <div class="item"> XXX
              <div>Views</div>
            </div>
            <div class="item"> XXX
              <div>Likes</div>
            </div>
            <div class="item"> XXX
              <div>Subscribers</div>
            </div>  
            <div class="item"> XXX
              <div>Videos</div>
            </div>
          </div>
        </div>
      </div>
      {/each}
  </div>

</main>

<style>
  h1 {
    font-size: 35px;
    color:#eb7d00;
  }

  h2 {
    color:#eb7d00;
  }

  .column {
  float: left;
  padding: 10px;
  }

  .column.side {
  width: 25%;
  }
  .column.middle {
  width: 50%;
  }

  .container {
    overflow-x: auto;
    white-space: nowrap;
  }

  .container-flex {
    display: flex;
  }

  .button {
    width: 70%;
    height: 100%;
    display: block;
    text-align: center;
    line-height: 1.1em;
    font-size: 1.1em;
    transition-duration: 0.4s;
    padding: 14px 40px;
    color:  #eb7d00;
    background-color: #fdf3e7;
    border: 2px solid #eb7d00;
  }

  .button:hover {
    background-color: #eb7d00;
    color: white;
  }

  .button:active {
    background-color: #eb7d00;
    color: white;
  }

  .grid-container {
    margin:20px;
    width: 65%;
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

  
</style>
