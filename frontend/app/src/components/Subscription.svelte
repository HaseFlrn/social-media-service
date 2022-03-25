<script>
  import Card from './Card.svelte';
  
  let topVideos = [
    {
      id: 1,
      rating: 1,
      text: 'Top 1 Video',
    },
    {
      id: 2,
      rating: 2,
      text: 'Top 2 Video',
    },
    {
      id: 3,
      rating: 3,
      text: 'Top 3 Video',
    }
  ]

  console.log(topVideos)

  function handleClick() {
    x = document.getElementById("C1");
    if (x.style.display === "none"){
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

</script>

<main>
  <h1>My Subscriptions</h1>

  <div class="column side">
  <h2>Subscribed Channels</h2>
  <button class="button" on:click|once={handleClick}>
    Channel 1
  </button>
  <button class="button" on:click|once={handleClick}>
    Channel 2
  </button>
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
