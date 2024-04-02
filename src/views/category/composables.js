import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { onBeforeRouteUpdate } from 'vue-router'
import { getTopCategoryAPI } from '@/apis/category'
import { getBannerAPI } from '@/apis/home'

export const useCategory = () => {
    const categoryData = ref({})
    const route = useRoute()
    const getCategory = async (id = route.params.id) => categoryData.value = (await getTopCategoryAPI(id)).value.result
    onMounted(getCategory)

    const routeUpdate = to => { getCategory(to.params.id) }
    onBeforeRouteUpdate(routeUpdate)
    return {categoryData}
}

export const useBanner = () => {
    const bannerList = ref([])
    const getBanner = async () => bannerList.value = (await getBannerAPI({ distributionSite: '2' })).value.result
    onMounted(getBanner)
    return { bannerList }
}