import axios from '@/utils/http.js'

export const getCategoryAPI = () => axios({
    url: '/home/category/head',
})