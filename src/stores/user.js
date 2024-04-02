import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { loginAPI } from '@/apis/user.js'
import { useCartStore } from '@/stores/cartStore.js'


export const useUserStore = defineStore('user', () => {
    const cartStore = useCartStore()
    // store
    const userInfo = ref({})
    // actions
    const login = async ({ account, password }) => userInfo.value = (await loginAPI({ account, password })).value.result
    const getUserInfo = async arg => {await login(arg); await cartStore.mergeCart();}
    
    const clearUserInfo = () => { userInfo.value = {}; cartStore.clear() }
    const isLogin = computed(() => userInfo.value.token ? true : false)
    return { getUserInfo, userInfo, clearUserInfo, isLogin }
}, { persist: true })