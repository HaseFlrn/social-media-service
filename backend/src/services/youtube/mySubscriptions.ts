
//---------------------------------------------------
//------------general for Subscribers----------------
//---------------------------------------------------

//returns all channels, that the current Channels subscribes
export async function getAllSubscriptions(token: string) {
  const url = `https://www.googleapis.com/youtube/v3/subscriptions?part=snippet&mine=true&access_token=${token}`;
  let finalResult;
  let totalResults: number;
  let readResults = 0;
  let pageToken = '';
  do {
    const response = await fetch((pageToken == '') ? url : (url + '&page_token=' + pageToken));
    const res = await response.json();

    finalResult = finalResult + res['items'];

    totalResults = res['pageInfo']['totalResults'];
    readResults = readResults + res['pageInfo']['resultsPerPage'];
    pageToken = res['nextPageToken'];
  } while(readResults < totalResults) 
  return finalResult;
}


//---------------------------------------------------
//--------Subscriped Channel Information-------------
//---------------------------------------------------





