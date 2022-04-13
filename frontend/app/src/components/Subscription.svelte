<script>
  import {onMount} from 'svelte';
  import {userToken} from './stores.js';

  let token;
  userToken.subscribe(value => {
		token = value;
	});

  let myChannelData = {};
  let subscribedChannelsData = [];

  async function getSubscribers() {
    // get all channels
    const res = await fetch(
      `https://youtol.de:3000/api/v1/mySubs/subs?token=${token}`
    );
    const data = await res.json();
    console.log("my subscribers data", data);
    const subscribedChannels = data.channels;
  
    for (let i = 0; i < subscribedChannels.length; i++) {
      const channel = subscribedChannels[i];
      const channelId = channel.snippet.resourceId.channelId;

      // get basics
      const res = await fetch(`https://youtol.de:3000/api/v1/mySubs/stats/basic?token=${token}&channelId=${channelId}`);
      const data = await res.json();
      
      const channelData = {
        _visible: false,
        title: channel.snippet.title,
        viewCnt: data.viewCnt,
        subscriberCnt: data.subscriberCnt,
        videoCnt: data.videoCnt,
      };
      
      subscribedChannelsData = [... subscribedChannelsData, channelData];
    }
    
  }


  async function getMyStats() {

    var data1, data2;

    await Promise.all([
      fetch(
        `https://youtol.de:3000/api/v1/general/channelInfos/${token}`
      ).then(async res => data1 = await res.json()),
      fetch(
        `https://youtol.de:3000/api/v1/myStats/channelStats/${token}`
      ).then(async res => data2 = await res.json())
    ]);
  
    myChannelData = {
      _visible: false,
      title: data1.channelTitle,
      subscriber: data2.subscriberCount,
      views: data2.viewCount,
      videos: data2.videoCount,
    };
  }  
    
  onMount(async () => {
    // all subscribed channels
    await getSubscribers();
    // my channel
    await getMyStats();
  });

</script>

<main>
  <div class="column side">
    <h1>My Channel</h1>
    <button class="button" on:click={() => myChannelData._visible = !myChannelData._visible}>
      <h4>{myChannelData.title}</h4>
    </button>

    <h1>Subscribed Channels</h1>
    {#each subscribedChannelsData as channelData}
    <button class="button {channelData._visible ? 'focusKlasse' : ''}" on:click={() => channelData._visible = !channelData._visible}>
      <h4>{channelData.title}</h4>
    </button>
    {/each}
  </div>

  <div class="column middle">
    <h1>My Stats</h1>
    <div class="container" style="display: {myChannelData._visible ? 'block' : 'none'}">
      <h2>{myChannelData.title}</h2>
      <div class="container-flex">
        <div class="grid-container">
          <div class="item"> {myChannelData.views}
            <div>Views</div>
          </div>
          <div class="item"> XXX
            <div>Likes</div>
          </div>
          <div class="item"> {myChannelData.subscriber}
            <div>Subscribers</div>
          </div>  
          <div class="item"> {myChannelData.videos}
            <div>Videos</div>
          </div>
        </div>
      </div>
    </div>
  </div>


  <div class="column middle">
    <h1>My Subscriptions</h1>
    {#each subscribedChannelsData as channelData}
      <div class="container" style="display: {channelData._visible ? 'block' : 'none'}">
        <h2>{channelData.title}</h2>
        <div class="container-flex">
          <div class="grid-container">
            <div class="item"> {channelData.viewCnt}
              <div>Views</div>
            </div>
            <div class="item"> XXX
              <div>Likes</div>
            </div>
            <div class="item"> {channelData.subscriberCnt}
              <div>Subscribers</div>
            </div>  
            <div class="item"> {channelData.videoCnt}
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

  .button:focus {
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
