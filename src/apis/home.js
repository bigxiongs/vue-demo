import axios from '@/utils/http.js'

export const getBannerAPI = (params = {distributionSite: '1'}) => axios.get('/home/banner', {params})
export const findNewAPI = () => axios.get('/home/new')
export const getHotAPI = () => axios.get('/home/hot')
export const getGoodsAPI = () => axios.get('/home/goods')

