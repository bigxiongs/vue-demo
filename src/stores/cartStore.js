import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useUserStore } from './user.js'
import {insertCartAPI, findNewCartListAPI, delCartAPI} from '@/apis/cart.js'

const isSelected = item => item.selected
const acc = (a, c) => a + c.count
const accPrice = (a, c) => a + c.count * c.price

export const useCartStore = defineStore('cart', () => {
    const userStore = useUserStore()

    const cartList = ref([])

    const refresh = async () => cartList.value = (await findNewCartListAPI()).value.result

    const addItem = (item, goods) => item ? item.count++ : cartList.value.push(goods)
    const addNewItem = async goods => {await insertCartAPI(goods); await refresh()}

    const addCart = async goods => userStore.isLogin ? await addNewItem(goods) : addItem(cartList.value.find(item => goods.skuId === item.skuId), goods)
    
    const delItem = skuId => cartList.value.splice(cartList.value.findIndex(item => skuId === item.skuId), 1)
    const delMyItem = async skuId => {await delCartAPI([skuId]); await refresh()}

    const delCart = async skuId => userStore.isLogin ? await delMyItem(skuId) : delItem(skuId)

    const count = computed(() => cartList.value.reduce(acc, 0))
    const price = computed(() => cartList.value.reduce(accPrice, 0))
    const singleClick = (skuId, selected) => cartList.value.find(item => skuId === item.skuId).selected = selected

    const allSelected = computed(() => cartList.value.every(isSelected))
    const selectAll = selected => cartList.value.forEach(item => item.selected = selected)

    const selected = computed(() => cartList.value.filter(isSelected).reduce(acc, 0))
    const pay = computed(() => cartList.value.filter(isSelected).reduce(accPrice, 0))

    return { cartList, addCart, delCart, count, price, singleClick, allSelected, selectAll, selected, pay }
}, { persist: true, })