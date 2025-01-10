<template>
    <el-container id="background">
        <el-aside width="250px" height="100%" style="background-color: rgba(92, 136, 181, 0.112)">
            <el-menu>
                <el-submenu index="1">
                    <template slot="title"><i class="el-icon-menu"></i>社区特征建模</template>
                    <el-menu-item-group>
                        <el-menu-item index="1-1"><span @click="goModelEdit()">社区特征建模</span></el-menu-item>
                        <el-menu-item index="1-2"><span @click="goSocietyPattern()">社区特征模型展示</span></el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title"><i class="el-icon-menu"></i>社区服务模式挖掘</template>
                    <el-menu-item-group>
                        <el-menu-item index="2-1"><span @click="goSocietyPatternProcess()">服务模式挖掘</span></el-menu-item>
                        <el-menu-item index="2-2"><span
                                @click="goSocietyPatternManagementProcess()">服务模式管理</span></el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title"><i class="el-icon-menu"></i><span
                            @click="goSocietyCreateDisplay()">社区实例编辑区</span></template>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title"><i class="el-icon-menu"></i><span
                            @click="goSocietyRecommand()">社区服务模式推荐</span></template>
                </el-submenu>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header style="text-align: left; font-size: 13px; border-radius: 20px;">
                <span @click="goStartPage" id="logo">智慧社区服务模式挖掘与推荐工具</span>
            </el-header>
            <el-main id="routerBackground">
                <router-view :key="$route.path"></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<style scoped>
.el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
    margin-left: 2%;
    margin-right: 1%;
}

.el-main {
    margin-left: 1%;
}

.el-menu {
    height: 60px;
    /* 设置你想要的高度 */
    line-height: 60px;
    /* 确保文本垂直居中 */
}

/* 修改菜单栏项的字体大小 */
.el-menu .el-menu-item,
.el-menu .el-submenu__title {
    height: 60px;
    /* 设置你想要的高度 */
    line-height: 60px;
    /* 确保文本垂直居中 */
}

.el-aside {
    color: #333;
    height: 100%;
    width: 100%;
    text-align: left;
}

#logo {
    font-size: 15px;
}

#background {
    width: 100%;
    height: 100%;
}

#page {
    margin-top: 5px;
    width: 100%;
    height: 90%;
    background-color: #B3C0D1;
}

#routerBackground {
    background-color: #c8c6c683;
    margin-top: 30px;
    margin-left: 30px;
    border-radius: 10px;
}
</style>

<script>

export default {
    name: 'LayOut',
    components: {
    },
    methods: {
        goSocietyPattern() {
            console.log("1")
            if (this.$route.path !== '/societyMenu') {
                this.$router.push('/societyMenu');
            }

        },
        goStartPage() {
            console.log("2")
            if (this.$route.path !== '/') {
                this.$router.push('/');
            }

        },
        goSocietyPatternProcess() {
            if (this.$route.path !== '/societyPatternProcessPage') {
                this.$router.push('/societyPatternProcessPage');
            }

        },
        goSocietyPatternManagementProcess() {
            if (this.$route.path !== '/societyPatternManagementPage') {
                this.$router.push('/societyPatternManagementPage');
            }

        },
        goSocietyBpmnDisplay() {
            if (this.$route.path !== '/bppmDisplayPageEdit') {
                this.$router.push('/bppmDisplayPageEdit');
            }
        },
        goSocietyCreateDisplay() {
            if (this.$route.path !== '/societyCreatePage') {
                this.$router.push('/societyCreatePage');
            }
        },
        goSocietyRecommand() {
            if (this.$route.path !== '/societyRecommand') {
                this.$router.push('/societyRecommand');
            }
        },
        goModelEdit() {
            if (this.$route.path !== '/mindMapEdit') {
                this.$router.push({
                    path: "/mindMapEdit"
                });
            }
        },
    },
    // mounted() {
    //     if (this.$route.path == '/') {
    //             document.getElementById("routerBackground").style.overflow = 'hidden';
    //         }
    //     else{
    //         document.getElementById("routerBackground").style.overflow = '';
    //     }
    // },
};
</script>
