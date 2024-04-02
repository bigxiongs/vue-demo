import axios from '@/utils/http.js'

export const loginAPI = ({account, password}) => axios.post('/login', {account, password}, )
export const getLikeListAPI = ({ limit = 4 }) => axios.get('/goods/relevant', {params: {limit}})
