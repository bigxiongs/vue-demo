import axios from '@/utils/http.js'

export const getTopCategoryAPI = id => axios.get('/category', { params: { id } })
export const getCategoryFilterAPI = id => axios.get('/category/sub/filter', { params: { id } })
/**
 * @description: 获取导航数据
 * @data { 
     categoryId: 1005000 ,
     page: 1,
     pageSize: 20,
     sortField: 'publishTime' | 'orderNum' | 'evaluateNum'
   } 
 * @return {*}
 */
export const getSubCategoryAPI = data => axios.post('/category/goods/temporary', data)

