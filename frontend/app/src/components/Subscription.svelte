<script>
  import Card from './Card.svelte';
  import {onMount} from 'svelte';
  import {userToken} from './stores.js';

  let token;
  userToken.subscribe(value => {
		token = value;
	});

  let subscribedChannels = [];
  let subscriber = 0;

  async function getSubscribers() {
    const res = await fetch(
      `https://youtol.de:3000/api/v1/mySubs/subs?token=${token}`
        );
    const info = await res.json();
    console.log(info);
    subscriber = info.count;
    subscribedChannels = info.channels;
  }

  onMount(() => {
    getSubscribers();
  });

</script>

<main>
  <h1>My Subscriptions</h1>
  <div class="column side">
    {#each subscribedChannels as item}
    <button class="button">
      {item.snippet.title}
    </button>
    {/each}
  </div>

  <div class="column middle">
    <div id="C1" class="container">
      <h2>Channel 1</h2>
      <div class="container-flex">
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
        <div>
            <Card>
              Hello
            </Card>
        </div>
      </div>
    </div>
  </div>

</main>

<style>
  h1 {
    font-size: 50px;
    color:#eb7d00;
    text-align: center;
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
    width: 30em;
    overflow-x: auto;
    white-space: nowrap;
  }

  .container-flex {
    display: flex;
  }

  .button {
    width: 50%;
    display: block;
    transition-duration: 0.4s;
    padding: 14px 40px;
    color:  #eb7d00;
    border: 2px solid #eb7d00;
  }

  .button:hover {
    background-color: #eb7d00;
    color: white;
  }

  .grid-container {
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 20px;
  background-color: #eb7d00;
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
