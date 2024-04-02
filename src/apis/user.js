import axios from '@/utils/http.js'

export const loginAPI = ({account, password}) => axios.post('/login', {account, password}, )