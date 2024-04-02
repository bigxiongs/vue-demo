<script setup>
import { getCategoryFilterAPI, getSubCategoryAPI } from '@/apis/category.js'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import GoodsItem from '../home/components/GoodsItem.vue'
const categoryData = ref([])
const route = useRoute()
const getCategory = async () => categoryData.value = (await getCategoryFilterAPI(route.params.id)).value.result
onMounted(getCategory)

const goodList = ref([])
const data = ref({
    categoryId: route.params.id,
    page: 1,
    pageSize: 20,
    sortField: 'publishTime',
})
const getGoodList = async () => goodList.value = (await getSubCategoryAPI(data.value)).value.result.items
onMounted(getGoodList)

const tabChange = () => {
    data.value.page = 1
    getGoodList()
}
const disabled = ref(false)
const load = async () => {
    data.value.page++
    const res = await getSubCategoryAPI(data.value)
    goodList.value = [...goodList.value, ...res.value.result.items]
    if (res.value.result.items.length === 0) disabled.value = true
}
</script>

<template>
    <div class="container ">
        <div class="bread-container">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: `/category/${categoryData.parentId}` }">{{ categoryData.parentName }}</el-breadcrumb-item>
                <el-breadcrumb-item>{{categoryData.name}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="sub-container">
            <el-tabs v-model="data.sortField" @tab-change="tabChange">
                <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
                <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
                <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
            </el-tabs>
            <div class="body" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
                <GoodsItem v-for="goods in goodList" :goods="goods" :key="goods.id"/>
            </div>
        </div>
    </div>

</template>

<style lang="scss" scoped>
.bread-container {
    padding: 25px 0;
    color: #666;
}

.sub-container {
    padding: 20px 10px;
    background-color: #fff;

    .body {
        display: flex;
        flex-wrap: wrap;
        padding: 0 10px;
    }

    .goods-item {
        display: block;
        width: 220px;
        margin-right: 20px;
        padding: 20px 30px;
        text-align: center;

        img {
            width: 160px;
            height: 160px;
        }

        p {
            padding-top: 10px;
        }

        .name {
            font-size: 16px;
        }

        .desc {
            color: #999;
            height: 29px;
        }

        .price {
            color: $priceColor;
            font-size: 20px;
        }
    }

    .pagination-container {
        margin-top: 20px;
        display: flex;
        justify-content: center;
    }


}
</style>