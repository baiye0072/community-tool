<template>
  <div>
    <el-dialog title="新建挖掘任务" :visible.sync="dialogVisible" width="40%">
      <div class="input-area" style="display: inline;">
        <div style="display: flex; margin-bottom: 20px;">
          <span class="input-label">任务描述:</span>
          <el-input id="input1" type="text" placeholder="请输入任务描述" v-model="description" maxlength="10" show-word-limit
            size="medium">
          </el-input>
        </div>
        <div style="display: flex;">
          <span style="text-align: center;line-height: 30px; margin-left: 2.5%;margin-right: 3%;">所属类别:</span>
          <el-select v-model="newValue" filterable placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = falses">取 消</el-button>
        <el-button type="primary" @click="handleCreate()">确 定</el-button>
      </span>
    </el-dialog>
    <el-upload ref="upload" :on-success="uploadSuccess" :before-upload="beforeUpload" accept=".xlsx"
      :show-file-list="false" :action="url"></el-upload>
    <el-button size="mini" id="create" type="primary" @click="changeVisable()">新建</el-button>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="任务ID" width="180">
        <template slot-scope="scope">
          <el-tag size="medium">{{ scope.row.name }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="任务描述" width="180">
        <template slot-scope="scope">
          <el-tag size="medium">{{ scope.row.description }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">上传excel</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作进度">
        <template slot-scope="scope">
          <el-steps :active="scope.row.state" finish-status="success">
            <el-step title="新建任务"></el-step>
            <el-step title="上传excel"></el-step>
            <el-step title="结果分析成功"></el-step>
          </el-steps>
        </template>
      </el-table-column>
      <el-table-column label="创建日期" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import * as XLSX from 'xlsx';
import { createServicePattern, createTask, deleteTask, reqTask } from '@/api/index'
export default {
  name: "ProcessPage",
  data() {
    return {
      activeindex: 0,
      dialogVisible: false,
      description: "",
      url: "http://localhost:8081//test",
      resultBPMN: [
        {
          data: `<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" id="sid-38422fae-e03e-43a3-bef4-bd33b32041b2" targetNamespace="http://bpmn.io/bpmn" exporter="bpmn-js (https://demo.bpmn.io)" exporterVersion="5.1.2">
  <collaboration id="Collaboration_0xyh3tm">
    <participant id="Participant_1a3ppu9" name="招标人" processRef="Process_1" />
    <participant id="Participant_1u7ayb1" name="智慧招标平台" processRef="Process_0w9bc0q" />
    <participant id="Participant_1pnbb19" name="招标人" processRef="Process_1e5yht5" />
    <messageFlow id="Flow_0hnjq2y" sourceRef="Task_1hcentk" targetRef="Activity_15tmj2h" />
    <messageFlow id="Flow_0cr56qm" sourceRef="Activity_15tmj2h" targetRef="Activity_0nziruk" />
    <messageFlow id="Flow_01mxsxt" sourceRef="Activity_0nziruk" targetRef="Activity_08yhtcg" />
    <messageFlow id="Flow_1dw2968" sourceRef="Activity_08yhtcg" targetRef="Activity_186spw6" />
    <messageFlow id="Flow_1vtknv3" sourceRef="Activity_1x1wljw" targetRef="Activity_01ax8pq" />
  </collaboration>
  <process id="Process_1" isExecutable="false">
    <task id="Task_2hcentk" />
    <startEvent id="StartEvent_1y45yut" name="开始" />
    <task id="Task_1hcentk" name="发布招标任务   服务满意度:3.853" />
    <sequenceFlow id="SequenceFlow_0h21x7r" sourceRef="StartEvent_1y45yut" targetRef="Task_1hcentk" />
    <task id="Activity_186spw6" name="审核投标人预审文件">
      <outgoing>Flow_0hnwqqe</outgoing>
    </task>
    <exclusiveGateway id="Gateway_0cccbb6">
      <incoming>Flow_0hnwqqe</incoming>
      <outgoing>Flow_00u1zxv</outgoing>
      <outgoing>Flow_0y4o758</outgoing>
    </exclusiveGateway>
    <sequenceFlow id="Flow_0hnwqqe" sourceRef="Activity_186spw6" targetRef="Gateway_0cccbb6" />
    <sequenceFlow id="Flow_00u1zxv" sourceRef="Gateway_0cccbb6" targetRef="Event_0722enu" />
    <endEvent id="Event_0722enu">
      <incoming>Flow_00u1zxv</incoming>
    </endEvent>
    <task id="Activity_1x1wljw" name="将通过信息上传平台">
      <incoming>Flow_0y4o758</incoming>
    </task>
    <sequenceFlow id="Flow_0y4o758" sourceRef="Gateway_0cccbb6" targetRef="Activity_1x1wljw" />
  </process>
  <process id="Process_0w9bc0q">
    <task id="Activity_15tmj2h" name="任务上传平台公示" />
    <task id="Activity_08yhtcg" name="预审文件平台公示" />
    <task id="Activity_01ax8pq" name="平台公示">
      <outgoing>Flow_0ufoqu7</outgoing>
    </task>
    <task id="Activity_1h29w4g" name="投标人竞争">
      <incoming>Flow_0ufoqu7</incoming>
      <outgoing>Flow_0r1p2xw</outgoing>
    </task>
    <sequenceFlow id="Flow_0ufoqu7" sourceRef="Activity_01ax8pq" targetRef="Activity_1h29w4g" />
    <exclusiveGateway id="Gateway_0hl7z37">
      <incoming>Flow_0r1p2xw</incoming>
      <outgoing>Flow_0feo6b5</outgoing>
      <outgoing>Flow_14715c9</outgoing>
    </exclusiveGateway>
    <sequenceFlow id="Flow_0r1p2xw" sourceRef="Activity_1h29w4g" targetRef="Gateway_0hl7z37" />
    <sequenceFlow id="Flow_0feo6b5" sourceRef="Gateway_0hl7z37" targetRef="Event_1azc6rj" />
    <endEvent id="Event_1azc6rj">
      <incoming>Flow_0feo6b5</incoming>
    </endEvent>
    <task id="Activity_1rwvmbh" name="申请开始建设">
      <incoming>Flow_14715c9</incoming>
      <outgoing>Flow_0vva6az</outgoing>
    </task>
    <sequenceFlow id="Flow_14715c9" sourceRef="Gateway_0hl7z37" targetRef="Activity_1rwvmbh" />
    <endEvent id="Event_1077gbf">
      <incoming>Flow_0vva6az</incoming>
    </endEvent>
    <sequenceFlow id="Flow_0vva6az" sourceRef="Activity_1rwvmbh" targetRef="Event_1077gbf" />
  </process>
  <process id="Process_1e5yht5">
    <task id="Activity_0nziruk" name="填写资格预审文件" />
  </process>
  <bpmndi:BPMNDiagram id="BpmnDiagram_1">
    <bpmndi:BPMNPlane id="BpmnPlane_1" bpmnElement="Collaboration_0xyh3tm">
      <bpmndi:BPMNShape id="Participant_1a3ppu9_di" bpmnElement="Participant_1a3ppu9" isHorizontal="true">
        <omgdc:Bounds x="102" y="60" width="768" height="250" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_0h21x7r_di" bpmnElement="SequenceFlow_0h21x7r">
        <omgdi:waypoint x="188" y="120" />
        <omgdi:waypoint x="240" y="120" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0hnwqqe_di" bpmnElement="Flow_0hnwqqe">
        <omgdi:waypoint x="470" y="120" />
        <omgdi:waypoint x="555" y="120" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_00u1zxv_di" bpmnElement="Flow_00u1zxv">
        <omgdi:waypoint x="580" y="145" />
        <omgdi:waypoint x="580" y="192" />
        <bpmndi:BPMNLabel>
          <omgdc:Bounds x="567" y="166" width="56" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0y4o758_di" bpmnElement="Flow_0y4o758">
        <omgdi:waypoint x="605" y="120" />
        <omgdi:waypoint x="690" y="120" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="StartEvent_1y45yut_di" bpmnElement="StartEvent_1y45yut">
        <omgdc:Bounds x="152" y="102" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <omgdc:Bounds x="160" y="145" width="23" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_1hcentk_di" bpmnElement="Task_1hcentk">
        <omgdc:Bounds x="240" y="80" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_186spw6_di" bpmnElement="Activity_186spw6">
        <omgdc:Bounds x="370" y="80" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_0cccbb6_di" bpmnElement="Gateway_0cccbb6" isMarkerVisible="true">
        <omgdc:Bounds x="555" y="95" width="50" height="50" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_0722enu_di" bpmnElement="Event_0722enu">
        <omgdc:Bounds x="562" y="192" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1x1wljw_di" bpmnElement="Activity_1x1wljw">
        <omgdc:Bounds x="690" y="80" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Participant_1u7ayb1_di" bpmnElement="Participant_1u7ayb1" isHorizontal="true">
        <omgdc:Bounds x="102" y="340" width="1296" height="250" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Flow_0ufoqu7_di" bpmnElement="Flow_0ufoqu7">
        <omgdi:waypoint x="790" y="450" />
        <omgdi:waypoint x="840" y="450" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0r1p2xw_di" bpmnElement="Flow_0r1p2xw">
        <omgdi:waypoint x="940" y="450" />
        <omgdi:waypoint x="995" y="450" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0feo6b5_di" bpmnElement="Flow_0feo6b5">
        <omgdi:waypoint x="1020" y="425" />
        <omgdi:waypoint x="1020" y="398" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_14715c9_di" bpmnElement="Flow_14715c9">
        <omgdi:waypoint x="1045" y="450" />
        <omgdi:waypoint x="1100" y="450" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0vva6az_di" bpmnElement="Flow_0vva6az">
        <omgdi:waypoint x="1200" y="450" />
        <omgdi:waypoint x="1262" y="450" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="Activity_15tmj2h_di" bpmnElement="Activity_15tmj2h">
        <omgdc:Bounds x="230" y="410" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_08yhtcg_di" bpmnElement="Activity_08yhtcg">
        <omgdc:Bounds x="370" y="410" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_01ax8pq_di" bpmnElement="Activity_01ax8pq">
        <omgdc:Bounds x="690" y="410" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1h29w4g_di" bpmnElement="Activity_1h29w4g">
        <omgdc:Bounds x="840" y="410" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_0hl7z37_di" bpmnElement="Gateway_0hl7z37" isMarkerVisible="true">
        <omgdc:Bounds x="995" y="425" width="50" height="50" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_1azc6rj_di" bpmnElement="Event_1azc6rj">
        <omgdc:Bounds x="1002" y="362" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1rwvmbh_di" bpmnElement="Activity_1rwvmbh">
        <omgdc:Bounds x="1100" y="410" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_1077gbf_di" bpmnElement="Event_1077gbf">
        <omgdc:Bounds x="1262" y="432" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Participant_1pnbb19_di" bpmnElement="Participant_1pnbb19" isHorizontal="true">
        <omgdc:Bounds x="102" y="620" width="768" height="250" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0nziruk_di" bpmnElement="Activity_0nziruk">
        <omgdc:Bounds x="230" y="710" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Flow_0hnjq2y_di" bpmnElement="Flow_0hnjq2y">
        <omgdi:waypoint x="290" y="160" />
        <omgdi:waypoint x="290" y="410" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0cr56qm_di" bpmnElement="Flow_0cr56qm">
        <omgdi:waypoint x="280" y="490" />
        <omgdi:waypoint x="280" y="710" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_01mxsxt_di" bpmnElement="Flow_01mxsxt">
        <omgdi:waypoint x="330" y="748" />
        <omgdi:waypoint x="420" y="745" />
        <omgdi:waypoint x="420" y="490" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1dw2968_di" bpmnElement="Flow_1dw2968">
        <omgdi:waypoint x="420" y="410" />
        <omgdi:waypoint x="420" y="160" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1vtknv3_di" bpmnElement="Flow_1vtknv3">
        <omgdi:waypoint x="740" y="160" />
        <omgdi:waypoint x="740" y="410" />
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</definitions>
`
        }
      ],
      tableData: [],
      options: [
       {
          value: '',
          label: ''
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
      newValue: "",
      allLength: 0
    }
  },
  beforeMount() {
    reqTask().then((ret) => {
      this.tableData = ret.data.data
      this.allLength = this.tableData.length
    }).catch((err) => {
      console.log(err)
      this.$message({
        type: "warning",
        message: "任务数据获取失败!"
      })
    })
  },
  methods: {
    changeVisable() {
      this.dialogVisible = true
    },
    handleCreate() {
      const name = "任务" + (this.allLength + 1)
      const now = new Date();
      const year = now.getFullYear();
      const month = (now.getMonth() + 1).toString().padStart(2, '0');
      const day = now.getDate().toString().padStart(2, '0');
      const date = `${year}-${month}-${day}`
      const state = '1'
      if (this.newValue == "") {
        this.$message({
          message: '类别为空',
          type: 'warning'
        });
        return
      }
      if (this.description != "") {
        var newData = { date: date, name: name, state: state, description: this.description, servicePatternKind: this.newValue }
        createTask(newData).then((ret) => {
          reqTask().then((ret) => {
            this.tableData = ret.data.data
            this.allLength=this.allLength+1
            console.log(ret.data)
            this.$message({
              message: '任务创建成功',
              type: 'success'
            });
            this.dialogVisible = false
          }).catch((err) => {
            console.log(err)
            this.$message({
              type: "warning",
              message: "任务数据获取失败!"
            })
          })
        }).catch((err) => {
          console.log(err)
          this.$message({
            type: "warning",
            message: "任务创建失败!"
          })
        })
      }
      else {
        this.$message({
          message: '描述为空',
          type: 'warning'
        });
      }
    },
    beforeUpload(file) {
      const isXLSX = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isXLSX) {
        this.$message.error('上传文件只能是 xlsx 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传文件大小不能超过 2MB!');
      }

      return isXLSX && isLt2M;
    },
    uploadSuccess(response, file, fileList) {
      console.log(1)
      this.tableData[this.activeindex].state = 2
      const reader = new FileReader();

      // 读取文件内容，并在读取完成后调用 readAsArrayBuffer 方法  
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        // 假设我们只读取第一个工作表  
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        // 将工作表转换为 JSON 格式  
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // 在这里处理你的 JSON 数据  
        console.log(jsonData);
        for (let i = 0; i < jsonData.length; i++) {
          if (jsonData[i][1] == "发布招标任务") {
            console.log(2)
            var newData = { servicePatternName: file.name.replace(/\.xlsx$/, ""), data: this.resultBPMN[0].data, servicePatternKind: this.newValue }
            console.log(newData)
            createServicePattern(newData).then((ret) => {
              this.tableData[this.activeindex].state = 3
              this.$message({
                type: "success",
                message: "得到结果!"
              })
            }).catch((err) => {
              console.log(err)
              this.$message({
                type: "warning",
                message: "解析失败!"
              })
            })
            break
          }
        }
        console.log(1)
      }
      reader.readAsArrayBuffer(file.raw);
    },
    handleEdit(index, row) {
      if (this.tableData[index].state == 1) {
        this.activeindex = index
        this.$refs['upload'].$refs['upload-inner'].handleClick()
      } else {
        this.$message({
          message: '已经上传完毕',
          type: 'warning'
        });
      }
    },
    handleDelete(index, row) {
      this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        for (let i = 0; i < this.tableData.length; i++) {
          if (i == index) {
            deleteTask(this.tableData[i].name).then((ret) => {
              reqTask().then((ret) => {
                this.tableData = ret.data.data
                console.log(ret.data)
                this.$message({
                  type: "success",
                  message: "删除成功!"
                })
              }).catch((err) => {
                console.log(err)
                this.$message({
                  type: "warning",
                  message: "任务数据获取失败!"
                })
              })
            }).catch((err) => {
              console.log(err)
              this.$message({
                type: "warning",
                message: "删除失败!"
              })
            })
          }
        }

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    mounted() {
      console.log(1)
      reqTask().then((ret) => {
        this.tableData = ret.data.data
        console.log(ret.data)
      }).catch((err) => {
        console.log(err)
        this.$message({
          type: "warning",
          message: "任务数据获取失败!"
        })
      })
    }
  }
}
</script>

<style scoped>
#create {
  margin-bottom: 10px;
  position: relative;
  left: 45%;
}

.upexcel {
  display: inline-block;
  margin-right: 10px;
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