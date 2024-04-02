import { ref } from 'vue'
import { defineStore } from 'pinia'
import {getCategoryAPI} from '@/apis/layout.js'

export const useCategoryStore = defineStore('category', () => {
  const categroyList = ref([])
  const getCategory = async () => categroyList.value = (await getCategoryAPI()).value.result
  return { categroyList, getCategory }
})
