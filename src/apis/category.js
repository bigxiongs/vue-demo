import axios from '@/utils/http.js'

export const getTopCategoryAPI = id => axios.get('/category', {params: {id}})
export const getCategoryFilterAPI = id => axios.get('/category/sub/filter', {params: {id}})
