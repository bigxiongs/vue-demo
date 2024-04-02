import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// const eq = a => b => a === b
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
    const count = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))
    const price = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0))
    return { cartList, addCart, delCart, count, price }
}, { persist: true, })