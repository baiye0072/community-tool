<template>
    <div class="menu">
        <ul>
            <li><span @click="showdialog()"><i class="el-icon-edit"></i>重命名</span></li>
            <li><span @click="deleteFile(fileNameOrigin2)"><i class="el-icon-delete"></i>删除</span></li>
            <li><span @click="downloadFileInformation(fileNameOrigin2)"><i class="el-icon-download"></i>下载</span></li>
        </ul>

        <!-- 编辑文件重命名 -->
        <el-dialog title="重命名文件" :visible.sync="dialogVisible" width="40%" append-to-body=true :before-close="handleClose">
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
import { downLoadMindMapInformation, reNameMindMapInformation, deleteMindMapInformation } from '@/api/index'
export default {
    name: "button-menu",
    props: ['fileId', 'showattribute', 'fileNameOrigin'],
    data() {
        return {
            fileName: "",
            dialogVisible: false,
            fileNameOrigin2: this.fileNameOrigin
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
        //重命名文件对话框
        showdialog() {
            if (this.showattribute != 0) {
                this.dialogVisible = true;
            }
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    this.dialogVisible = false
                })
                .catch(_ => { });
        },
        modifyFileName() {
            var name = { oldName: this.fileNameOrigin2, newName: this.fileName }
            reNameMindMapInformation(name).then((ret) => {
                console.log(ret)
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
            this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteMindMapInformation(fileNameOrigin2).then((ret) => {
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
        },
        //导出文件
        downloadFileInformation(fileNameOrigin2) {
            if (this.showattribute != 0) {
                downLoadMindMapInformation(fileNameOrigin2).then((ret) => {
                    console.log(ret.data.data)
                    const jsonStr = JSON.stringify(ret.data.data, null, 2);

                    // 创建一个 Blob 对象
                    const blob = new Blob([jsonStr], { type: 'application/json' });

                    // 创建一个链接元素
                    const link = document.createElement('a');

                    // 为链接添加下载属性，并将 Blob 对象作为 URL
                    link.href = URL.createObjectURL(blob);
                    link.download = this.fileNameOrigin2 + '.json'; // 文件名

                    // 模拟点击事件，触发下载
                    link.click();

                    // 释放 URL 对象
                    URL.revokeObjectURL(link.href);
                }).catch((error) => {
                    console.log(error)
                    this.$message({
                        type: "warning",
                        message: "下载失败!"
                    })
                });
            }


        }
    },
};
</script>
<style>
.menu:after {
    position: absolute;
    left: 50%;
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
    width: 90px;
    background: #fff;
    z-index: 111;
    border: 1px solid #ddd;
    box-shadow: 0 1px 6px #ccc;
    border-radius: 8px;
}

.menu li {
    width: 90px;
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