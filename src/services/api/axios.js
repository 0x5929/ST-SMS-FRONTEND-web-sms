/**
 *  this file imports axios
 *  and helps resolve import issues in djREST
 *  
 *  this is also encapsulates axios, 
 *  so that we can easily edit its configuration settings that the whole project uses
 * 
 */

import axios from 'axios'

console.log('process.env.NODE_ENV: ', process.env.NODE_ENV)
console.log('process.env.REACT_APP_BACKEND_SERVER_URL: ', process.env.REACT_APP_BACKEND_SERVER_URL)


let BASE_URL

if (process.env.NODE_ENV !== 'production') {
    BASE_URL = process.env.REACT_APP_BACKEND_SERVER_URL
}

else {
    BASE_URL = 'http://localhost:8000/'
}


export default axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type' :  'application/json; charset=UTF-8' },
    withCredentials: true
})

