import axios from "axios";

const httpInstance = axios.create({
    baseURL: "http://pcapi-xiaotuxian-front-devtest.itheima.net",
    timeout: 500,
})
const id = x => x
const dot = prop => obj => Object.getOwnPropertyDescriptor(obj, prop)

httpInstance.interceptors.request.use(id, Promise.reject)

httpInstance.interceptors.response.use(dot("data"), Promise.reject)

export default httpInstance