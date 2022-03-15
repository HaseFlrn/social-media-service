import schedule from 'node-schedule'
import {getVideoQuantity} from './myStats.ts';
import {getSubscriberQuantity} from './myStats.ts';
import {getAllTimeViews} from './myStats.ts';

schedule.scheduleJob('0 0 * * *', () => { 
    const videoQuantity = getVideoQuantity(token);
    const subscriberQuantity = getSubscriberQuantity(token)
    const allTimeViews = getAllTimeViews(token)

    //Get current Date
    //Create or extend JSON
})