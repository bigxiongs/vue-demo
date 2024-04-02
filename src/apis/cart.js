import axios from '@/utils/http.js'

export const insertCartAPI = ({ skuId, count }) => axios.post('/member/cart', { skuId, count })
export const findNewCartListAPI = () => axios.get('/member/cart')
export const delCartAPI = (ids) => axios.delete('/member/cart', { data: {ids} })
