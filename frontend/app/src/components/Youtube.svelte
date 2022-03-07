<script>
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");
  let value = "";
  let videoIdList = "";
  let viewCount = "";
  let likeCount = "";
  let dislikeCount = "";
  let commentCount = "";
  async function getChannelInfo() {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&mine=true&access_token=${token}`
    );
    const info = await res.json();
    console.log(info);
    value = JSON.stringify(info.items[0]);
  }

  async function getVideos() {
    //get all video Id's
    const res = await fetch(
      `https://youtube.googleapis.com/youtube/v3/activities?part=snippet%2CcontentDetails&maxResults=25&mine=true&access_token=${token}`
    );
    const info = await res.json();
    console.log(info);

    var itemList = info.items

    for (var i = 0; i < itemList.length; i++){
      videoIdList = [...videoIdList, JSON.stringify(itemList[i].contentDetails.upload.videoId)]
    }
  }
  async function getVideoStatistics(videoId) {
    //get all video Id's
    var idWithoutQuotes = videoId.replaceAll('"','')
    const res = await fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${idWithoutQuotes}&access_token=${token}`
    );
    const info = await res.json();
    console.log(info);
    viewCount = info.items[0].statistics.viewCount;
    likeCount = info.items[0].statistics.likeCount;
    dislikeCount = info.items[0].statistics.dislikeCount;
    commentCount = info.items[0].statistics.commentCount;
  }
</script>

<h1>Text</h1>
<br />
<button on:click={getChannelInfo}>Get my channel information</button>
<br />
<button on:click={getVideos}>Send request</button>
<br />
{value}
<br />
{#each videoIdList as id}
  <button on:click={getVideoStatistics(id)}>{id}</button>
{/each}
<br />
viewCount: {viewCount}
<br />
likeCount: {likeCount}
<br />
dislikeCount: {dislikeCount}
<br />
commentCount: {commentCount}
