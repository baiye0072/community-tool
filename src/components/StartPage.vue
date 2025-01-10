<template>
    <div id="page">
        <div class="demo-image">
            <div class="block" v-for="fit in fits" :key="fit">
                <span class="demonstration">{{ fit }}</span>
                <el-image style="width: 100px; height: 100px" :src="url" :fit="fit"></el-image>
            </div>
        </div>
    </div>
</template>

<style scoped>
#page {
    margin-top: 5px;
    background-color: #c8c6c683;
}
</style>

<script>
export default {
    name: 'StartPage',
    components: {
    }
};
</script>
