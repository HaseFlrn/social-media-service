<script>
</script>

<div class="box">
  <slot>
    <img  src="/images/YouToolBlank.png" alt="Youtool Logo" width="600px">
  </slot>
  <br />
  <slot>
    <p>Logge dich mit deinem Google-Konto ein, um die Funktionen von YouTool nutzen zu können.</p>
  </slot>
  <br />
  <slot>
    <a style="color:black" href="https://localhost:3000/api/v1/login">Login</a>
  </slot>
</div>
<link
  href="https://fonts.googleapis.com/css?family=Overpass:100,400"
  rel="stylesheet"
/>
<style>
  :global(body) {
    margin: 10px;
    width: auto;
    background-color: white;
  }
  
  .box {
    margin: auto;
    margin-top: 200px;
    width: 30%;
    border: 1px solid grey;
    border-radius: 10px;
    padding: 30px;
    text-align: center;
    background-color: white;
  }


  .box > p {
    margin-top: 50px;
    font-size: 150%;
    font-weight: 400;
  }

  .box > a {
    font-size: 3em;
    font-weight: 300;

  }
</style>
