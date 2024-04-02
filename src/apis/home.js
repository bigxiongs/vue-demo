import axios from '@/utils/http.js'

export const getBannerAPI = () => axios.get('/home/banner')
export const findNewAPI = () => axios.get('/home/new')
export const getHotAPI = () => axios.get('/home/hot')
