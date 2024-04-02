import axios from '@/utils/http.js'

export const getBannerAPI = () => axios({
    url: '/home/banner',
})