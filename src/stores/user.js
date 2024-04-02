import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { loginAPI } from '@/apis/user'

export const useUserStore = defineStore('user', () => {
    const userInfo = ref({})
    const getUserInfo = async ({ account, password }) => userInfo.value = (await loginAPI({ account, password })).value.result
    const clearUserInfo = () => userInfo.value = {}
    const isLogin = computed(() => userInfo.value.token ? true : false)
    return { getUserInfo, userInfo, clearUserInfo, isLogin }
}, { persist: true})