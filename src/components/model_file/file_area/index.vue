<template>
    <div class="file_area">

        <div class="file_view" v-for="file in fileinformation" :key="file.fileId" @mouseleave="bmenushowattribute = 0">
            <el-image class="file_image" @click="goModelEdit(file.societyPattern)" :src="img" fit="contain">
            </el-image>
            <div class="image_menu">
                <el-button size="mini" icon="el-icon-s-operation" circle
                    @click="changeMenuShowAttribute(bmenushowattribute)"></el-button>
                <bmenu :showattribute="bmenushowattribute" :fileNameOrigin="file.societyPattern" @file-delete="handleFileDelete"
                    @name-change="handleNameChange" :style="{ opacity: bmenushowattribute }"></bmenu>
            </div>
            <p class="filename"><i class="el-icon-folder"></i>{{ file.societyPattern }}</p>
        </div>
    </div>
</template>
<script>
import { reqMindMapInformation } from '@/api/index'
import bmenu from './menu.vue'
export default {
    name: "file_area",
    components: {
        bmenu,
    },
    data() {
        return {
            img: require('@/assets/display.jpg'),
            fileinformation: [
            ],
            createcommand: "createfile",
            bmenushowattribute: 0
        }

    },
    methods: {
        goModelEdit(fileId) {
            this.$router.push({
                path: "/mindMap",
                query: {
                    societyPattern: fileId, //文件ID
                },
            });
        },
        handleNameChange(oldName, newName) {
            reqMindMapInformation().then((ret) => {
                let returndata = ret.data
                this.fileinformation = returndata.data
            }).catch((err) => {
                console.log(err)
                this.$message({
                    type: "warning",
                    message: "文件获取失败!"
                })
            })
        },
        handleFileDelete(name){
            reqMindMapInformation().then((ret) => {
                let returndata = ret.data
                this.fileinformation = returndata.data
            }).catch((err) => {
                console.log(err)
                this.$message({
                    type: "warning",
                    message: "文件获取失败!"
                })
            })
        },
        handleCommand(command) {
            let commandstr = command.split(' ');
            if (commandstr[0] === "createfile") {
                this.goModelEdit(commandstr[1])
            }
        },
        changeMenuShowAttribute(showattribute) {
            if (showattribute == 0) {
                this.bmenushowattribute = 1;
            }
            else {
                this.bmenushowattribute = 0;
            }
        }
    },
    beforeCreate() {
        reqMindMapInformation().then((ret) => {
            let returndata = ret.data
            this.fileinformation = returndata.data
        }).catch((err) => {
            console.log(err)
            this.$message({
                type: "warning",
                message: "文件获取失败!"
            })
        })
    },
    mounted() {
    },
};
</script>
<style scoped>
.file_area {
    position: relative;
    top: -4vh;
    display: flex;
    flex-wrap: wrap;
}

.file_view {
    position: relative;
    top: 0px;
    width: 12vw;
    height: 18vh;
    margin: 20px;
    padding: 0;
    min-width: 150px;
    min-height: 120px;
    transition: top 0.3s;
}

.file_image {
    position: relative;
    width: 100%;
    border-radius: 12px;
}

.file_view:hover .image_menu {
    opacity: 1;
}



.image_menu {
    display: inline;
    position: absolute;
    top: -5%;
    left: 90%;
    opacity: 0;
}

.file_view:hover {
    top: -5px;

}

.filename {
    position: relative;
    text-align: center;
    font-size: small;
}
</style>