<script>
  import { navigate } from "svelte-routing";
  import { count } from "./stores.js";
  let countValue;

  count.subscribe((value) => {
    countValue = value;
  });
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");
  count.update((n) => (n = token));
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

<h1>Text</h1>
<br />
<button on:click={getChannelInfo}>Get my channel information</button>
<br />
{value}
<br />
<div>The Token is {countValue}</div>

<style>
</style>
