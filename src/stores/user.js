import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginAPI } from '@/apis/user'

export const useUserStore = defineStore('user', () => {
    const userInfo = ref({})
    const getUserInfo = async ({ account, password }) => userInfo.value = (await loginAPI({ account, password })).value.result
    const clearUserInfo = () => userInfo.value = {}
    return { getUserInfo, userInfo, clearUserInfo }
}, { persist: true})