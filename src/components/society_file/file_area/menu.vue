<template>
    <div class="menu">
        <ul>
            <li><span @click="goMindMap()"><i class="el-icon-edit"></i>查看社区特征模型</span></li>
            <li><span @click="showdialog2(fileNameOrigin2)"><i class="el-icon-edit"></i>查看社区服务模式模型</span></li>
            <li><span @click="showdialog1()"><i class="el-icon-edit"></i>重命名</span></li>
            <li><span @click="deleteFile(fileNameOrigin2)"><i class="el-icon-edit"></i>删除</span></li>
        </ul>


        <el-dialog title="包含服务模式" :visible.sync="dialogVisible3" width="30%" append-to-body :before-close="handleClose">
            <div class="file_view" v-for="file in bpmnInformation" :key="file.servicePatternName"
                @mouseleave="bmenushowattribute = 0">
                <el-image class="file_image" @click="goBPMN(file.servicePatternName)" :src="img" fit="contain">
                </el-image>
                <p class="filename"><i class="el-icon-folder"></i>{{ file.servicePatternName }}</p>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible3 = false">取 消</el-button>
            </span>
        </el-dialog>
        <!-- 编辑文件重命名 -->
        <el-dialog title="重命名文件" :visible.sync="dialogVisible" width="40%" append-to-body :before-close="handleClose">
            <div class="input-area">
                <span class="input-label">文件名:</span>
                <el-input id="input1" type="text" placeholder="请输入文件名" v-model="fileName" maxlength="10" show-word-limit
                    size="medium">
                </el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose()">取 消</el-button>
                <el-button type="primary" @click="handleModifyFileName()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { reqOneSocietyInformation, reNameSociety, deleteSociety } from '@/api/index'
export default {
    name: "button-menu",
    props: ['fileId', 'showattribute', 'fileNameOrigin'],
    data() {
        return {
            fileName: "",
            dialogVisible: false,
            dialogVisible3: false,
            fileNameOrigin2: this.fileNameOrigin,
            societyInformation: {},
            bpmnInformation: [],
            img: require('@/assets/servicePattern.jpg'),
        }
    },
    methods: {
        goModelEdit(fileId) {
            this.$router.push({
                path: "/modeledit",
                query: {
                    fileId: fileId, //文件ID
                },
            });
        },
        showdialog2() {
            if (this.dialogVisible3 == false) {
                this.dialogVisible3 = true
            }
            reqOneSocietyInformation(this.fileNameOrigin2).then((ret) => {
                this.societyInformation = ret.data
                console.log("here")
                this.bpmnInformation = this.societyInformation.data.servicePatternData
                console.log(this.bpmnInformation)
            }).catch((err) => {
                console.log(err)
            })
        },
        goMindMap() {
            reqOneSocietyInformation(this.fileNameOrigin2).then((ret) => {
                this.societyInformation = ret.data
                console.log("here")
                console.log(this.societyInformation.data.MindMapData)
                var tempData = this.societyInformation.data.MindMapData
                this.$router.push({
                    path: "/MyMindMapSociety",
                    query: {
                        societyPatternData: tempData,
                        societyName: this.fileNameOrigin2
                    },
                });
            }).catch((err) => {
                console.log(err)
            })
        },
        goBPMN(servicePatternName) {
            for (let i = 0; i < this.bpmnInformation.length; i++) {
                if (this.bpmnInformation[i].servicePatternName == servicePatternName) {
                    var data = this.bpmnInformation[i].servicePatternData
                    console.log(i)
                    this.dialogVisible3 = false
                    this.$router.push({
                        path: "/bpmnSocietyDisplayPage",
                        query: {
                            data: data,
                            name: this.bpmnInformation[i].servicePatternName,
                            societyName: this.fileNameOrigin2
                        },
                    });
                }
            }
        },
        //重命名文件对话框
        showdialog1() {
            if (this.dialogVisible == false) {
                this.dialogVisible = true
            }
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    this.dialogVisible = false
                    this.dialogVisible3 = false
                })
                .catch(_ => { });
        },
        modifyFileName() {
            var name = { oldName: this.fileNameOrigin2, newName: this.fileName }
            reNameSociety(name).then((ret) => {
                this.$emit('name-change', this.fileNameOrigin2, this.fileName)
                this.fileNameOrigin2 = this.fileName
                console.log(this.fileNameOrigin2)
            }).catch((err) => {
                console.log(err)
            })
        },
        handleModifyFileName() {
            this.$confirm('确认修改文件名？')
                .then(_ => {
                    if (this.fileName != "") {
                        this.modifyFileName()
                        this.dialogVisible = false
                        this.$message({
                            type: "success",
                            message: "重命名成功!"
                        })
                    }
                    else {
                        this.$message({
                            type: "warning",
                            message: "文件名为空!"
                        })
                    }
                })
        },
        //删除文件
        deleteFile(fileNameOrigin2) {
            if (this.showattribute != 0) {
                this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteSociety(fileNameOrigin2).then((ret) => {
                        this.$emit('file-delete', fileNameOrigin2)
                        this.$message({
                            type: "success",
                            message: "删除成功!"
                        })
                    }).catch((err) => {
                        console.log(err)
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            }

        }
    },
};
</script>
<style scoped>
.file_view {
    position: relative;
    top: 0px;
    width: 12vw;
    height: 18vh;
    margin: 20px;
    margin-left: 100px;
    text-align: center;
    padding: 0;
    min-width: 150px;
    min-height: 120px;
    transition: top 0.3s;
    border-color: black;
}

.file_image {
    position: relative;
    width: 100%;
    border-radius: 12px;
    border-color: rgb(158, 60, 60);
    border-width: 1px;
    border-style: solid;
}

.file_view:hover .image_menu {
    opacity: 1;
}



.file_view:hover {
    top: -5px;

}

.filename {
    position: relative;
    text-align: center;
    font-size: small;
}

.menu:after {
    position: absolute;
    left: 30%;
    margin-left: -8px;
    top: -15px;
    border: 8px solid transparent;
    border-bottom: 8px solid #fff;
    content: "";
    width: 10;
    height: 0;
}

.menu {
    position: absolute;
    left: -115%;
    top: 125%;
    width: 150px;
    background: #fff;
    z-index: 111;
    border: 1px solid #ddd;
    box-shadow: 0 1px 6px #ccc;
    border-radius: 8px;
}

.menu li {
    width: 150px;
    margin-top: 5px;
    cursor: default;
    color: #444;
    line-height: 30px;
    position: relative;
    display: flex;
}

.menu ul {
    padding: 0px;
}

.menu li span {
    position: relative;
    width: 100%;
    height: 100%;
    font-size: 1.6ex;
    font-weight: 250;
    letter-spacing: 0.1px;
}

.menu li i {
    margin-right: 4px;
}

.menu li span:hover {
    color: rgb(0, 0, 0);
    background-color: #ccc;
}

.input-area {
    display: flex;
    flex-wrap: nowrap;
}

.input-label {
    width: 100px;
    text-align: center;
    line-height: 30px;
    display: block;
}
</style>