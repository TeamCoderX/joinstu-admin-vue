import axios from 'axios'
let status = true
let hostname = (process.env.NODE_ENV === 'development') ? 'http://localhost:3000/api/' : '/api/'

async function axiosPOST(url,body,successCallback,failedCallback) {
    if(status){
        await axios.post(`${hostname}${url}`, body,{
            withCredentials: true
        })
        .then(successCallback)
        .catch(failedCallback)
    }
}

async function axiosGET(url,body,successCallback,failedCallback) {
    if(status){
        await axios.get(`${hostname}${url}`, body,{
            withCredentials: true
        })
        .then(successCallback)
        .catch(failedCallback)
    }
}

const ajax = {
    "get":axiosGET,
    "post":axiosPOST
}
export {ajax,hostname}