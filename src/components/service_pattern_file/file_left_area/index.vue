<template>
    <div class="file_left_area">
        <div class="button-area">
            <el-button type="primary" round @click="dialogVisible = true" icon="el-icon-plus">新建</el-button>
        </div>
        <div class="button-area">
            <el-button type="primary" round icon="el-icon-upload">导入</el-button>
        </div>


        <el-dialog title="创建文件" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
            <div class="input-area">
                <span class="input-label">文件名:</span>
                <el-input id="input1" type="text" placeholder="请输入文件名" v-model="fileName" maxlength="10" show-word-limit
                    size="medium">
                </el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose()">取 消</el-button>
                <el-button type="primary" @click="handleCreateFile()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { putFileInformation, reqFileInformation } from '@/api/index'
export default {
    name: "file_area_header",
    data() {
        return {
            fileName: "",
            dialogVisible: false,
        };
    },
    mounted() {
    },
    methods: {
        //获取文件数量
        getFileNum() {
            reqFileInformation().then((ret) => {
                let returndata = ret.data
                returndata = returndata.replace(/NaN/g, null)
                this.fileNum = JSON.parse(returndata).length
            })
        },
        goModelEdit(fileId) {
            this.$router.push({
                path: "/mindMap"
            });
        },
        createfile() {
            let formdata = new FormData()
            formdata.append('filename', this.fileName)
            putFileInformation(formdata).then((ret) => {
                this.$message({
                    type: "success",
                    message: "创建成功!"

                })
                this.$store.commit("addModelFile",ret.data)
                console.log(ret.data)
            }).catch((error) => {
                console.log(error)
                this.$message({
                    type: "warning",
                    message: "创建失败!"
                })
                this.dialogVisible = false
                this.fileName = ""
            })
        },
        //取消创建文件
        handleClose(done) {
            this.$confirm('确认取消创建文件？')
                .then(_ => {
                    this.dialogVisible = false
                    this.fileName = ""
                })
        },
        //创建文件
        handleCreateFile() {
            this.$confirm('确认创建文件？')
                .then(_ => {
                    if (this.fileName != "") {
                        this.createfile()
                        this.dialogVisible = false
                        this.fileName = ""
                    }
                    else {
                        this.$message({
                            type: "warning",
                            message: "文件名为空!"
                        })
                    }
                })
        }
    },
};
</script>
<style>
/* button区域布局 */
.button-area {
    margin-bottom: 20px;
    margin-top: 30px;
}

/* 新建文件输入区域布局 */
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