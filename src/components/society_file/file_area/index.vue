<template>
    <div style="margin-top: 2px;" class="total">
        <el-dialog title="新建社区实例模型" :visible.sync="dialogVisible" width="20%" append-to-body>
            <div style="display: inline;">
                <span class="create_society_button" style="display: flex;margin-bottom: 5%;margin-left: 20%;">
                    <el-button type="primary" style="border-radius: 20px;" @click="dialogVisible4 = true">选择特征模型</el-button>
                </span>
                <span class="create_society_button" style="display: flex;margin-bottom: 5%;margin-left: 20%;">
                    <el-button type="primary" style="border-radius: 20px;" @click="dialogVisible5 = true">选择服务模式</el-button>
                </span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button @click="dialogVisible7 = true">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="社区实例模型命名" :visible.sync="dialogVisible7" width="30%" append-to-body>
            <div class="input-area">
                <span class="input-label">文件名:</span>
                <el-input id="input1" type="text" placeholder="请输入文件名" v-model="newSocietyName" maxlength="10"
                    show-word-limit size="medium">
                </el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible7 = false">关 闭</el-button>
                <el-button @click="createSociety()">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="选择社区特征模型" :visible.sync="dialogVisible4" width="60%" append-to-body>
            <el-header style="margin-bottom: 3%;">
                <el-input placeholder="请输入内容" v-model="searchInput2" class="input-with-select" style="width:50%;">
                    <el-button slot="append" icon="el-icon-search" @click="searchMindMap()"></el-button>
                </el-input>
                <el-button icon="el-icon-refresh-left" style="margin-right: 3%;" @click="refreshMindMap()"></el-button>
            </el-header>
            <div style="display: flex;">
                <div class="file_view" v-for="file in mindMapInformation" :key="file.societyPattern">
                    <el-radio v-model="radio" :label="file.societyPattern"><el-image class="file_image"
                            :class="{ 'clicked-image': file.isClick }" @click="chooseMindMap(file.societyPattern)"
                            :src="img" fit="contain">
                        </el-image>
                        <p class="filename"><i class="el-icon-folder"></i>{{ file.societyPattern }}</p>
                    </el-radio>

                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible4 = false">关 闭</el-button>
                <el-button @click="dialogVisible4 = false">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="添加概要" :visible.sync="dialogVisible6" width="30%" append-to-body>
            <div class="input_form">

            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible4 = false">关 闭</el-button>
                <el-button @click="dialogVisible4 = false">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="选择服务模式" :visible.sync="dialogVisible5" width="60%" append-to-body>
            <el-header style="margin-bottom: 3%;">
                <el-input placeholder="请输入内容" v-model="searchInput3" class="input-with-select" style="width:50%;">
                    <el-button slot="append" icon="el-icon-search" @click="searchSocietyPattern()"></el-button>
                </el-input>
                <el-button icon="el-icon-refresh-left" style="margin-right: 3%;" @click="refreshSocietyPattern()"></el-button>
                <el-select v-model="value" filterable placeholder="请选择">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <el-button icon="el-icon-search" style="margin-right: 5%;" @click="searchKind()"></el-button>
            </el-header>
            <div style="display: flex;">
                <div class="file_view" v-for="file in servicePatternInformation" :key="file.servicePatternName"
                    @mouseleave="bmenushowattribute = 0">
                    <el-checkbox :v-model="file.isClick"><el-image class="file_image"
                            :class="{ 'clicked-image': file.isClick }"
                            @click="chooseServicePattern(file.servicePatternName)" :src="img" fit="contain">
                        </el-image>
                        <p class="filename"><i class="el-icon-folder"></i>{{ file.servicePatternName }}</p>
                    </el-checkbox>

                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible5 = false">关 闭</el-button>
                <el-button @click="dialogVisible5 = false">确 定</el-button>
            </span>
        </el-dialog>
        <el-header style="margin-bottom: 3%;">
            <el-input placeholder="请输入内容" v-model="searchInput1" class="input-with-select" style="width:50%;">
                <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
            </el-input>
            <el-button icon="el-icon-refresh-left" style="margin-right: 3%;" @click="refreshSearch()"></el-button>
            <el-button type="primary" style="border-radius: 20px;" @click="dialogVisible = true"
                size="small">新建社区实例</el-button>
        </el-header>
        <div class="file_area">
            <div class="file_view" v-for="file in fileinformation" :key="file.societyName"
                @mouseleave="bmenushowattribute = 0">
                <el-image class="file_image" :src="img" fit="contain">
                </el-image>
                <div class="image_menu">
                    <el-button size="mini" icon="el-icon-s-operation" circle
                        @click="changeMenuShowAttribute(bmenushowattribute)"></el-button>
                    <bmenu :showattribute="bmenushowattribute" :fileNameOrigin="file.societyName"
                        @file-delete="handleFileDelete" @name-change="handleNameChange"
                        :style="{ opacity: bmenushowattribute }"></bmenu>
                </div>
                <p class="filename"><i class="el-icon-folder"></i>{{ file.societyName }}</p>
            </div>
        </div>

    </div>
</template>
<script>
import { reqSocietyInformation, reqServicePatternInformation, reqMindMapInformation, createSociety } from '@/api/index'
import bmenu from './menu.vue'
export default {
    name: "file_area",
    components: {
        bmenu,
    },
    data() {
        return {
            checked: false,
            radio: "",
            form: {
                generalizations: [],
            },
            img: require('@/assets/thumbnail.jpg'),
            fileinformation: [
            ],
            options: [
                {
                    value: '已选择',
                    label: '已选择'
                },
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
            allfileinformation: [],
            servicePatternInformation: [],
            allServicePatternInformation: [],
            mindMapInformation: [],
            allmindMapInformation: [],
            createcommand: "createfile",
            bmenushowattribute: 0,
            dialogVisible: false,
            dialogVisible4: false,
            dialogVisible5: false,
            dialogVisible6: false,
            dialogVisible7: false,
            imageColor: "black",
            chooseMindMapNum: 0,
            newSocietyName: "",
            searchInput1: "",
            searchInput2: "",
            searchInput3: "",
            value:""
        }

    },
    methods: {
        search() {
            this.$message({
                type: "success",
                message: "查询完成!"
            })
            this.fileinformation = this.allfileinformation.filter(file => file.societyName.includes(this.searchInput1))
        },
        searchMindMap() {
            this.$message({
                type: "success",
                message: "查询完成!"
            })
            this.mindMapInformation = this.allmindMapInformation.filter(file => file.societyPattern.includes(this.searchInput2))
        },
        searchKind() {
            this.$message({
                type: "success",
                message: "查询完成!"
            })
            if(this.value=="已选择"){
                this.servicePatternInformation = this.allServicePatternInformation.filter(file => file.isClick == true)
            }
            this.servicePatternInformation = this.allServicePatternInformation.filter(file => file.servicePatternKind == this.value)
        },
        searchSocietyPattern() {
            this.$message({
                type: "success",
                message: "查询完成!"
            })
            this.servicePatternInformation = this.allServicePatternInformation.filter(file => file.servicePatternName.includes(this.searchInput3))
        },
        refreshSearch() {
            this.$message({
                type: "success",
                message: "刷新成功!"
            })
            this.fileinformation = this.allfileinformation
            this.searchInput1 = ""
        },
        refreshMindMap() {
            this.$message({
                type: "success",
                message: "刷新成功!"
            })
            this.mindMapInformation = this.allmindMapInformation
            this.searchInput2 = ""
        },
        refreshSocietyPattern() {
            this.$message({
                type: "success",
                message: "刷新成功!"
            })
            this.servicePatternInformation = this.allServicePatternInformation
            this.searchInput3 = ""
        },
        goModelEdit(fileId) {
            this.$router.push({
                path: "/mindMap",
                query: {
                    societyPattern: fileId, //文件ID
                },
            });
        },
        createSociety() {
            var society = { societyName: this.newSocietyName, servicePatternData: [], MindMapData: { societyPattern: "", data: {}, children: [] } }
            var mindMapInformationNum = 0
            var servicePatternInformationNum = 0
            for (let i = 0; i < this.mindMapInformation.length; i++) {
                if (this.mindMapInformation[i].isClick == true) {
                    society.MindMapData.societyPattern = this.mindMapInformation[i].societyPattern
                    society.MindMapData.data = this.mindMapInformation[i].data
                    society.MindMapData.children = this.mindMapInformation[i].children
                    mindMapInformationNum = 1
                }
            }
            if (mindMapInformationNum == 0) {
                this.$message({
                    type: "warning",
                    message: "未选择特征模型!"
                })
                return
            }
            for (let i = 0; i < this.servicePatternInformation.length; i++) {
                if (this.servicePatternInformation[i].isClick == true) {
                    society.servicePatternData[servicePatternInformationNum] = {}
                    society.servicePatternData[servicePatternInformationNum].servicePatternName = this.servicePatternInformation[i].servicePatternName
                    society.servicePatternData[servicePatternInformationNum].servicePatternData = this.servicePatternInformation[i].data
                    servicePatternInformationNum = servicePatternInformationNum + 1
                }
            }
            if (servicePatternInformationNum == 0) {
                this.$message({
                    type: "warning",
                    message: "未选择服务模式模型!"
                })
                return
            }
            console.log(society)
            createSociety(society).then((ret) => {
                reqSocietyInformation().then((ret) => {
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
                this.$message({
                    type: "success",
                    message: "创建成功!"
                })
                this.dialogVisible = false
                this.dialogVisible7 = false
            }).catch((err) => {
                console.log(err)
                this.$message({
                    type: "warning",
                    message: "创建失败!"
                })
            })
        },
        chooseMindMap(societyPattern) {
            if (this.chooseMindMapNum != 0) {
                for (let i = 0; i < this.mindMapInformation.length; i++) {
                    if (this.mindMapInformation[i].isClick == true) {
                        this.mindMapInformation[i].isClick = false
                        this.chooseMindMapNum = 0
                    }
                }
            }
            for (let i = 0; i < this.mindMapInformation.length; i++) {
                console.log(this.mindMapInformation[i].societyPattern)
                if (this.mindMapInformation[i].societyPattern == societyPattern) {
                    this.mindMapInformation[i].isClick = true
                    this.chooseMindMapNum = 1
                }
            }
            this.$forceUpdate();
        },
        chooseServicePattern(servicePatternName) {
            for (let i = 0; i < this.servicePatternInformation.length; i++) {
                if (this.servicePatternInformation[i].servicePatternName == servicePatternName && this.servicePatternInformation[i].isClick == false) {
                    this.servicePatternInformation[i].isClick = true
                    this.allServicePatternInformation[i].isClick = true
                    // console.log(i + "true")
                    this.$forceUpdate();
                    break
                }
                if (this.servicePatternInformation[i].servicePatternName == servicePatternName && this.servicePatternInformation[i].isClick == true) {
                    this.servicePatternInformation[i].isClick = false
                    this.allServicePatternInformation[i].isClick = false
                    // console.log(i + "false")
                    this.$forceUpdate();
                    break
                }
            }
            // console.log(this.servicePatternInformation)
        },
        handleNameChange(oldName, newName) {
            reqSocietyInformation().then((ret) => {
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
            reqSocietyInformation().then((ret) => {
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
        reqSocietyInformation().then((ret) => {
            let returndata = ret.data
            this.fileinformation = returndata.data
            this.allfileinformation = returndata.data
        }).catch((err) => {
            console.log(err)
            this.$message({
                type: "warning",
                message: "文件获取失败!"
            })
        });
        reqServicePatternInformation().then((ret) => {
            let returndata = ret.data
            this.servicePatternInformation = returndata.data
            this.allServicePatternInformation = returndata.data
            for (let i = 0; i < this.servicePatternInformation.length; i++) {
                this.servicePatternInformation[i].isClick = false
                this.allServicePatternInformation[i].isClick = false
            }
            console.log(this.servicePatternInformation)
        }).catch((err) => {
            console.log(err)
            this.$message({
                type: "warning",
                message: "文件获取失败!"
            })
        });
        reqMindMapInformation().then((ret) => {
            let returndata = ret.data
            this.mindMapInformation = returndata.data
            this.allmindMapInformation=returndata.data
            for (let i = 0; i < this.mindMapInformation.length; i++) {
                this.mindMapInformation[i].isClick = false
                this.allmindMapInformation[i].isClick=false
            }
            console.log(this.mindMapInformation)
        }).catch((err) => {
            console.log(err)
            this.$message({
                type: "warning",
                message: "文件获取失败!"
            })
        });
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
    margin-left: 5%;
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
    border-color: black;
    border-width: 1px;
}

.file_view1 {
    position: relative;
    top: 0px;
    width: 8vw;
    height: 12vh;
    margin: 20px;
    padding: 0;
    min-width: 150px;
    min-height: 120px;
    transition: top 0.3s;
    border-color: black;
    border-width: 1px;
}

.file_image {
    position: relative;
    width: 100%;
    border-radius: 12px;
    border-color: black;
    border-width: 1px;
    border-style: solid;
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
    margin-bottom: 2%;
    font-size: small;
}

.clicked-image {
    /* 被点击后的图片样式 */
    border: 1px solid red;
    /* 或者使用其他颜色 */
    /* 可以添加其他样式，如背景颜色变化等 */
}
</style>