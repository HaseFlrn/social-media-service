<script>
  let user = { loggedIn: false};

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
  <section class="container-center">
  <div id="C1">
  </div>
  </section>

  <section class="container-left">
  <button class="button" on:click|once={handleClick}>
    Channel 1
  </button>
  <button class="button" on:click|once={handleClick}>
    Channel 2
  </button>
  </section>

</main>

<style>
  h1 {
    font-size: 50px;
    color:#eb7d00;
    text-align: center;
  }
  .container-left{
    float: left;
    width: 20%;
    height: 200px;
    margin: 20px;
    padding: 10px;
  }

  .container-center{
    float: right;
    width: 50%;
    height: 200px;
    margin: 20px;
    padding: 10px;
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

  
</style>
