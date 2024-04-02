import axios from '@/utils/http.js'

export const getCheckInfoAPI = () => axios.get('/member/order/pre')

export const createOrderAPI = data => axios.post('/member/order', data)
export const getOrderAPI = id => axios.get(`/member/order/${id}`)
