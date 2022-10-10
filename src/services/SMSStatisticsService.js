import { SMSStats } from './data/studentData'
//import { studentStatisticsGET } from './api/djREST' 

export function getStats() {
    // normally we this would call an back end API, instead of just returning data from the data folder

    //studentStatisticsGET()
    return SMSStats[0]
}