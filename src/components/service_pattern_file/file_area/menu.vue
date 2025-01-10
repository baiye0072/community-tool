<template>
    <div class="menu">
        <ul>
            <li><span @click="showdialog()"><i class="el-icon-edit"></i>重命名</span></li>
            <li><span @click="deleteFile(fileNameOrigin2)"><i class="el-icon-delete"></i>删除</span></li>
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
import { reNameServicePattern, deleteServicePattern } from '@/api/index'
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
            let firstName = 'John';
            let message = `<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" id="sid-38422fae-e03e-43a3-bef4-bd33b32041b2" targetNamespace="http://bpmn.io/bpmn" exporter="bpmn-js (https://demo.bpmn.io)" exporterVersion="5.1.2">
  <process id="Process_1" isExecutable="false">
    <startEvent id="StartEvent_1y45yut" name="开始" />
    <task id="Task_1hcentk">
      <outgoing>Flow_02v82gi</outgoing>
    </task>
    <task id="Task_2hcentk" />
    <sequenceFlow id="SequenceFlow_0h21x7r" sourceRef="StartEvent_1y45yut" targetRef="Task_1hcentk" />
    <task id="Activity_1pj8p2r" name="服务可用性:1.005">
      <incoming>Flow_02v82gi</incoming>
      <outgoing>Flow_02a98y4</outgoing>
    </task>
    <sequenceFlow id="Flow_02v82gi" sourceRef="Task_1hcentk" targetRef="Activity_1pj8p2r" />
    <task id="Activity_10jmkxa">
      <incoming>Flow_02a98y4</incoming>
      <outgoing>Flow_0zuo8ak</outgoing>
    </task>
    <sequenceFlow id="Flow_02a98y4" sourceRef="Activity_1pj8p2r" targetRef="Activity_10jmkxa" />
    <exclusiveGateway id="Gateway_1v7ct8j">
      <incoming>Flow_0zuo8ak</incoming>
    </exclusiveGateway>
    <sequenceFlow id="Flow_0zuo8ak" sourceRef="Activity_10jmkxa" targetRef="Gateway_1v7ct8j" />
  </process>
  <bpmndi:BPMNDiagram id="BpmnDiagram_1">
    <bpmndi:BPMNPlane id="BpmnPlane_1" bpmnElement="Process_1">
      <bpmndi:BPMNEdge id="Flow_02v82gi_di" bpmnElement="Flow_02v82gi">
        <omgdi:waypoint x="340" y="120" />
        <omgdi:waypoint x="400" y="120" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_0h21x7r_di" bpmnElement="SequenceFlow_0h21x7r">
        <omgdi:waypoint x="188" y="120" />
        <omgdi:waypoint x="240" y="120" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_02a98y4_di" bpmnElement="Flow_02a98y4">
        <omgdi:waypoint x="500" y="120" />
        <omgdi:waypoint x="560" y="120" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0zuo8ak_di" bpmnElement="Flow_0zuo8ak">
        <omgdi:waypoint x="660" y="120" />
        <omgdi:waypoint x="725" y="120" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="StartEvent_1y45yut_di" bpmnElement="StartEvent_1y45yut">
        <omgdc:Bounds x="152" y="102" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <omgdc:Bounds x="160" y="145" width="22" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_1hcentk_di" bpmnElement="Task_1hcentk">
        <omgdc:Bounds x="240" y="80" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1pj8p2r_di" bpmnElement="Activity_1pj8p2r">
        <omgdc:Bounds x="400" y="80" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_10jmkxa_di" bpmnElement="Activity_10jmkxa">
        <omgdc:Bounds x="560" y="80" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_1v7ct8j_di" bpmnElement="Gateway_1v7ct8j" isMarkerVisible="true">
        <omgdc:Bounds x="725" y="95" width="50" height="50" />
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</definitions>
`;

            let jsonObject = {
                name: firstName,
                message: message
            };

            console.log(JSON.stringify(jsonObject)); // 将 JSON 对象转换为字符串
            this.dialogVisible = true
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
            reNameServicePattern(name).then((ret) => {
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
                deleteServicePattern(fileNameOrigin2).then((ret) => {
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