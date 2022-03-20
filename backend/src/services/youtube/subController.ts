import { OpineResponse, OpineRequest } from "https://deno.land/x/opine@2.1.1/mod.ts";


export default class subController {
  //---------------------------------------------------
  //------------general for Subscribers----------------
  //---------------------------------------------------

  static async getAllSubscriptions(req: OpineRequest, res: OpineResponse) {
    //returns all channels, that the current Channels subscribes
    try{
      const url = `https://www.googleapis.com/youtube/v3/subscriptions?part=snippet&mine=true&access_token=${req.params.token}`;
      let finalResult = { 
        channelCount: 0,
        channels: [] 
      };
      let pageToken = '';
      do {
        const response = await fetch((pageToken == '') ? url : (url + '&page_token=' + pageToken));
        const data = await response.json();

        finalResult = {
          channelCount: finalResult.channelCount + data.items.length,
          channels: finalResult.channels.concat(data.items),
        }
        
        pageToken = data.nextPageToken;
      } while(pageToken) 

      res.json(finalResult);
    } catch (err) {
      console.log("an error occurreddd\n" + err );
      res.setStatus(500).json(err);
    }
  }

  static async getChannelStats(req: OpineRequest, res: OpineResponse) {
    try{
      //Total Videos, Wie lange Kanal existiert, 
      const url = ``;
      const response = await fetch(url);
      const data = response.json();

      res.send(data);
    } catch( err ) {
      console.log("an error occurreddd\n" + err );
      res.setStatus(500).json(err);
    }
  }
  
  //---------------------------------------------------
  //--------Subscriped Channel Information-------------
  //---------------------------------------------------



}







