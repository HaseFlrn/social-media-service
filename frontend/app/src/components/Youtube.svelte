<script>
  import { navigate } from "svelte-routing";
  import { userToken } from './stores.js';
  import Box from './Box.svelte';


  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");
  userToken.set(token);
  let value = "";
  async function getChannelInfo() {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&mine=true&access_token=${token}`
    );
    const info = await res.json();
    console.log(info);
    value = JSON.stringify(info.items[0]);
  }
  async function getSubInfo() {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&mine=true&access_token=${token}`
    );
    const info = await res.json();
    console.log(info);
    value = JSON.stringify(info.items[0]);
  }
  $: navigate("/youtube", { replace: true });
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

    <Box>
      <h2><a style="color: #eb7d00" href="/trends">Trends</a></h2>
      <iframe width= 100% height= 400 src="/trends" title="trends" />
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
