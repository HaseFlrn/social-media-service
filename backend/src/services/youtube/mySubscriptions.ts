
//---------------------------------------------------
//------------general for Subscribers----------------
//---------------------------------------------------

//returns all channels, that the current Channels subscribes
export async function getAllSubscriptions(token: string) {
  const response = await fetch(`https://www.googleapis.com/youtube/v3/subscriptions?part=snippet&mine=true&access_token=${token}`);
  const res = await response.json();
  
  console.log(res);
  return res;
}


//---------------------------------------------------
//--------Subscriped Channel Information-------------
//---------------------------------------------------





