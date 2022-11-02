import axios from 'axios'

const BASE_URL = 'http://localhost:8000/'

export default axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type' :  'application/json; charset=UTF-8' },
    withCredentials: true
})

// export const axiosWithIntercept = axios.create({
//     baseURL: BASE_URL,
//     headers: { 'Content-Type' :  'application/json' },
//     withCredentials: true

// })
