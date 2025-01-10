<template>
    <div style="margin-top: 2px;" class="total">
        <el-dialog title="新增文件" :visible.sync="dialogVisible" width="40%" append-to-body=true :before-close="handleClose">
            <div class="input-area" style="display: inline;">
                <div style="display: flex; margin-bottom: 20px;">
                    <span class="input-label">服务模式名:</span>
                    <el-input id="input1" type="text" placeholder="请输入服务模式名" v-model="patternName" maxlength="10"
                        show-word-limit size="medium">
                    </el-input>
                </div>
                <div style="display: flex;">
                    <span style="text-align: center;line-height: 30px; margin-left: 1%;margin-right: 3%;">所属类别:</span>
                    <el-select v-model="newValue" filterable placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose()">取 消</el-button>
                <el-button type="primary" @click="handleCreate()">确 定</el-button>
            </span>
        </el-dialog>
        <el-header style="margin-bottom: 3%;">
            <el-input placeholder="请输入内容" v-model="searchInput" class="input-with-select" style="width:50%; ">
                <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
            </el-input>
            <el-button icon="el-icon-refresh-left" style="margin-right: 3%;" @click="refreshSearch()"></el-button>
            <el-select v-model="value" filterable placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <el-button icon="el-icon-search" style="margin-right: 5%;" @click="searchKind()"></el-button>
            <el-button type="primary" style="border-radius: 20px;" @click="dialogVisible = true"
                size="small">新建服务模式</el-button>
        </el-header>
        <div class="file_area">
            <div class="file_view" v-for="file in fileinformation" :key="file.fileId" @mouseleave="bmenushowattribute = 0">
                <el-image class="file_image" @click="goModelEdit(file.servicePatternName, file.data)" :src="img"
                    fit="contain">
                </el-image>
                <div class="image_menu">
                    <el-button size="mini" icon="el-icon-s-operation" circle
                        @click="changeMenuShowAttribute(bmenushowattribute)"></el-button>
                    <bmenu :showattribute="bmenushowattribute" :fileNameOrigin="file.servicePatternName"
                        @file-delete="handleFileDelete" @name-change="handleNameChange"
                        :style="{ opacity: bmenushowattribute }"></bmenu>
                </div>
                <p class="filename"><i class="el-icon-folder"></i>{{ file.servicePatternName }}</p>
            </div>
        </div>
    </div>
</template>
<script>
import { reqServicePatternInformation, createServicePattern } from '@/api/index'
import bmenu from './menu.vue'
export default {
    name: "file_area",
    components: {
        bmenu,
    },
    data() {
        return {
            img: require('@/assets/servicePattern.jpg'),
            fileinformation: [
            ],
            allfileinformation: [],
            createcommand: "createfile",
            bmenushowattribute: 0,
            dialogVisible: false,
            patternName: "",
            searchInput: "",
            options: [
                {
                    value: '智慧社区服务',
                    label: '智慧社区服务'
                }, {
                    value: '安防服务',
                    label: '安防服务'
                }, {
                    value: '环保服务',
                    label: '环保服务'
                }, {
                    value: '物业服务',
                    label: '物业服务'
                }, {
                    value: '党建服务',
                    label: '党建服务'
                }
            ],
            value: "",
            newValue: ""
        }
    },
    methods: {
        refreshSearch() {
            this.$message({
                type: "success",
                message: "刷新成功!"
            })
            this.fileinformation = this.allfileinformation
            this.searchInput = ""
        },
        searchKind() {
            this.$message({
                type: "success",
                message: "查询完成!"
            })
            console.log(this.value)
            this.fileinformation = this.allfileinformation.filter(file => file.servicePatternKind == this.value)
        },
        search() {
            this.$message({
                type: "success",
                message: "查询完成!"
            })
            this.fileinformation = this.allfileinformation.filter(file => file.servicePatternName.includes(this.searchInput))
        },
        handleCreate() {
            if (this.newValue == "") {
                this.$message({
                    type: "warning",
                    message: "类别为空!"
                })
                return 
            }
            if (this.patternName == "") {
                this.patternName = ""
                this.$message({
                    type: "warning",
                    message: "名字为空!"
                })
            } else {
                for (let i = 0; i < this.fileinformation.length; i++) {
                    if (this.fileinformation[i].servicePatternName == this.patternName) {
                        this.$message({
                            type: "warning",
                            message: "名称重复!"
                        })
                        this.patternName = ""
                        return
                    }
                }
                var dataAll = { servicePatternName: this.patternName, data: "", servicePatternKind: this.newValue }
                console.log(dataAll)
                createServicePattern(dataAll).then((ret) => {
                    console.log("success")
                    reqServicePatternInformation().then((ret) => {
                        let returndata = ret.data
                        this.fileinformation = returndata.data
                        this.allfileinformation = returndata.data
                        this.patternName = ""
                        this.dialogVisible = false;
                        this.$message({
                            type: "success",
                            message: "创建成功!"
                        })
                    }).catch((err) => {
                        console.log(err)
                        this.$message({
                            type: "warning",
                            message: "文件获取失败!"
                        })
                    })
                }).catch((err) => {
                    console.log(err)
                    this.$message({
                        type: "warning",
                        message: "保存失败!"
                    })
                })
            }
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    this.dialogVisible = false
                    this.patternName = ""
                })
                .catch(_ => { });
        },
        goModelEdit(fileId, data) {
            console.log(data)
            this.$router.push({
                path: "/bppmDisplayPage",
                query: {
                    societyPattern: fileId, //文件ID
                    data: data
                },
            });
        },
        handleNameChange(oldName, newName) {
            reqServicePatternInformation().then((ret) => {
                let returndata = ret.data
                this.fileinformation = returndata.data
                this.allfileinformation = returndata.data
            }).catch((err) => {
                console.log(err)
                this.$message({
                    type: "warning",
                    message: "文件获取失败!"
                })
            })
        },
        handleFileDelete(name) {
            reqServicePatternInformation().then((ret) => {
                let returndata = ret.data
                this.fileinformation = returndata.data
                this.allfileinformation = returndata.data
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
        reqServicePatternInformation().then((ret) => {
            let returndata = ret.data
            this.fileinformation = returndata.data
            this.allfileinformation = returndata.data
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
    flex-wrap: wrap;
    display: flex;
    margin-left: 7%;
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