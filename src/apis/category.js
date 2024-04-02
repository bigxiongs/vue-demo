import axios from '@/utils/http.js'

export const getTopCategoryAPI = id => axios.get('/category', {params: {id}})
