import axios from "axios";
import { useUserStore } from '@/stores/user.js'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import router from "@/router";

const httpInstance = axios.create({
    baseURL: "http://pcapi-xiaotuxian-front-devtest.itheima.net",
    timeout: 1000,
})


const withToken = x => {
    const token = useUserStore().userInfo.token
    if (token) x.headers.Authorization = `Bearer ${token}`
    return x
}
// const withToken = x => x.headers.Authorization = useUserStore().userInfo.token ? `Bearer ${useUserStore().userInfo.token}`: null
httpInstance.interceptors.request.use(withToken, Promise.reject)

const reject = e => {
    if (e.response && e.response.statue === 401) { useUserStore().clearUserInfo(); router.push('/login') }
    if (e.response && e.response.data) ElMessage({ type: 'warning', message: e.response.data.message })
    return Promise.reject(e)
}
const dot = prop => obj => Object.getOwnPropertyDescriptor(obj, prop)
httpInstance.interceptors.response.use(dot("data"), reject)

export default httpInstance