import axios from '@/utils/http.js'

export const getCheckInfoAPI = () => axios.get('/member/order/pre')
