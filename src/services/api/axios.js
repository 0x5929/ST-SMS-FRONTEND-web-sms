import axios from 'axios'

const BASE_URL = 'http://localhost:8000/'

// withCredentials will send http only auth cookies to server to authenticate on APIs, NOT on page render/component mounts
// must also protect private routes/pages with refresh on every visit, also it will give us a fresh accessToken to be used for ... API calls
export default axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type' :  'application/json; charset=UTF-8' },
    withCredentials: true
})

