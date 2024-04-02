import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useUserStore } from './user.js'

const isSelected = item => item.selected
const acc = (a, c) => a + c.count
const accPrice = (a, c) => a + c.count * c.price

const userStore = useUserStore()

export const useCartStore = defineStore('cart', () => {
    const cartList = ref([])
    const addCart = goods => {
        const item = cartList.value.find(item => goods.skuId === item.skuId)
        item ? item.count++ : cartList.value.push(goods)
        // (item = cartList.value.find((item) => goods.skuId === item.skuId)) ? item.count++ : cartList.value.push(goods)
    }
    const delCart = skuId => {
        const idx = cartList.value.findIndex(item => skuId === item.skuId)
        cartList.value.splice(idx, 1)
    }
    const count = computed(() => cartList.value.reduce(acc, 0))
    const price = computed(() => cartList.value.reduce(accPrice, 0))
    const singleClick = (skuId, selected) => cartList.value.find(item => skuId === item.skuId).selected = selected

    const allSelected = computed(() => cartList.value.every(isSelected))
    const selectAll = selected => cartList.value.forEach(item => item.selected = selected)

    const selected = computed(() => cartList.value.filter(isSelected).reduce(acc, 0))
    const pay = computed(() => cartList.value.filter(isSelected).reduce(accPrice, 0))

    return { cartList, addCart, delCart, count, price, singleClick, allSelected, selectAll, selected, pay }
}, { persist: true, })