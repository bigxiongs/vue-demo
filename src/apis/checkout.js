import axios from '@/utils/http.js'

export const getCheckInfoAPI = () => axios.get('/member/order/pre')

export const createOrderAPI = data => axios.post('/member/order', data)
export const getOrderAPI = id => axios.get(`/member/order/${id}`)
/*
params: {
  orderState:0,
  page:1,
  pageSize:2
}
*/
export const getUserOrder = params => axios.get('/member/order', { params })

