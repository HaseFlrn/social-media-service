<script>
  import Box from './Box.svelte';
</script>

<main>
  <h1>Dashboard</h1>
  <div class="flex-container">
    <Box>
      <h2><a style="color: #eb7d00" href="/mystats">My Stats</a></h2>
      <iframe width= 100% height= 400 src="/mystats" title="my stats"/>
    </Box>

    <Box>
      <h2><a style="color: #eb7d00" href="/mysubs">My Subscriptions</a></h2>
      <iframe width= 100% height= 400 src="/mysubs" title="my subs" />
    </Box>
  </div>

</main>

<style>
  h1 {
    font-size: 50px;
    color:#eb7d00;
    text-align: center;
  }

  .flex-container {
    display: flex;
    justify-content: center;
  }


</style>