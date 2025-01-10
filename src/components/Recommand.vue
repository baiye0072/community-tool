<template>

  <div>
    <div>
      <el-dialog title="推荐结果" :visible.sync="dialogVisible" width="30%" append-to-body :before-close="handleClose">
        <p>该社区属于党建引领型、智慧型社区、养老型社区</p>
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
    </div>
    <el-form ref="form" :model="form" label-width="130px">
      <el-form-item label="人口数量">
        <el-col :span="6">
          <el-input v-model="form.name1"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="人口年龄结构">
        <el-col :span="6">
          <el-input placeholder="0-15岁人数" v-model="form.name2"></el-input>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="6">
          <el-input placeholder="16-59岁人数" v-model="form.name3"></el-input>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="6">
          <el-input placeholder="60岁以上人数" v-model="form.name4"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="学历分布">
        <el-col :span="6">
          <el-input placeholder="未受教育" v-model="form.name5"></el-input>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="6">
          <el-input placeholder="初中以下" v-model="form.name6"></el-input>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="6">
          <el-input placeholder="高中" v-model="form.name7"></el-input>
        </el-col>
        <el-col :span="6" style="margin-top: 5px;">
          <el-input placeholder="大专" v-model="form.name8"></el-input>
        </el-col>
        <el-col class="line" :span="2" style="margin-top: 5px;">-</el-col>
        <el-col :span="6" style="margin-top: 5px;">
          <el-input placeholder="本科及以上" v-model="form.name9"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="流动/常驻人口占比">
        <el-col :span="6">
          <el-input placeholder="流动人口数量" v-model="form.name10"></el-input>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="6">
          <el-input placeholder="常住人口数量" v-model="form.name11"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="服务特征">

        <el-col :span=6>
          <el-select v-model="value" placeholder="服务种类">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span=6>
          <el-input placeholder="服务名称" v-model="serviceName"></el-input>
        </el-col>
        <el-col :span=3>
          <el-button type="primary" @click="onAdd">添加服务</el-button>
        </el-col>
        <el-col :span="17" style="margin-top: 10px;">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="serviceKind" label="服务种类" width="400">
            </el-table-column>
            <el-table-column prop="serviceName" label="服务名称" width="400">
            </el-table-column>
          </el-table>
        </el-col>

      </el-form-item>

      <el-form-item label="组织特征">

        <el-col :span=6>
          <el-select v-model="value1" placeholder="组织种类">
            <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span=6>
          <el-input placeholder="组织名称" v-model="organizationName"></el-input>
        </el-col>
        <el-col :span=3>
          <el-button type="primary" @click="onAdd1">添加组织</el-button>
        </el-col>
        <el-col :span="17" style="margin-top: 10px;">
          <el-table :data="tableData1" style="width: 100%">
            <el-table-column prop="organizationKind" label="组织种类" width="400">
            </el-table-column>
            <el-table-column prop="organizationName" label="组织名称" width="400">
            </el-table-column>
          </el-table>
        </el-col>

      </el-form-item>

      <el-form-item label="资源特征">

        <el-col :span=6>
          <el-select v-model="value2" placeholder="资源种类">
            <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span=6>
          <el-input placeholder="资源名称" v-model="resourceName"></el-input>
        </el-col>
        <el-col :span=3>
          <el-button type="primary" @click="onAdd2">添加资源</el-button>
        </el-col>
        <el-col :span="17" style="margin-top: 10px;">
          <el-table :data="tableData1" style="width: 100%">
            <el-table-column prop="organizationKind" label="资源种类" width="400">
            </el-table-column>
            <el-table-column prop="organizationName" label="资源名称" width="400">
            </el-table-column>
          </el-table>
        </el-col>
      </el-form-item>
      <el-form-item label="服务模式需求向量">
        <el-col :span="8">
          <el-input v-model="form.name12" placeholder="服务种类需求"></el-input>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="8">
          <el-input v-model="form.name13" placeholder="服务复杂度需求"></el-input>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="8" style="margin-top: 10px;">
          <el-input v-model="form.name14" placeholder="服务可用性"></el-input>
        </el-col>
        <el-col class="line" :span="2" style="margin-top: 10px;">-</el-col>
        <el-col :span="8" style="margin-top: 10px;">
          <el-input v-model="form.name15" placeholder="服务执行时间"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交数据</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        name1: '',
        name2: '',
        name3: '',
        name4: '',
        name5: '',
        name6: '',
        name7: '',
        name8: '',
        name9: '',
        name10: '',
        name11: '',
        name12: '',
        name13: '',
        name14: '',
        name15: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      tableData: [],
      tableData1: [],
      options: [{
        value: '智慧服务',
        label: '智慧服务'
      }, {
        value: '养老服务',
        label: '养老服务'
      }, {
        value: '环保服务',
        label: '环保服务'
      }, {
        value: '文体服务',
        label: '文体服务'
      }, {
        value: '便民利民服务',
        label: '便民利民服务'
      }, {
        value: '物业服务',
        label: '物业服务'
      }],

      options1: [{
        value: '社区治理组织',
        label: '社区治理组织'
      }, {
        value: '社区服务组织',
        label: '社区服务组织'
      }, {
        value: '居民自组织',
        label: '居民自组织'
      }],
      options2: [{
        value: '人力资源',
        label: '人力资源'
      }, {
        value: '软件资源',
        label: '软件资源'
      }, {
        value: '硬件资源',
        label: '硬件资源'
      }, {
        value: '环境资源',
        label: '环境资源'
      }, {
        value: '环境资源',
        label: '环境资源'
      }],
      value: '',
      value1: '',
      value2: '',
      serviceName: '',
      organizationName: '',
      resourceName: '',
      img: require('@/assets/servicePattern.jpg'),
      bpmnInformation: [

        {
          "servicePatternName": "智慧招标服务流程1",
          "servicePatternKind": "智慧社区服务",
          "data": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<definitions xmlns=\"http://www.omg.org/spec/BPMN/20100524/MODEL\" xmlns:bpmndi=\"http://www.omg.org/spec/BPMN/20100524/DI\" xmlns:omgdi=\"http://www.omg.org/spec/DD/20100524/DI\" xmlns:omgdc=\"http://www.omg.org/spec/DD/20100524/DC\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" id=\"sid-38422fae-e03e-43a3-bef4-bd33b32041b2\" targetNamespace=\"http://bpmn.io/bpmn\" exporter=\"bpmn-js (https://demo.bpmn.io)\" exporterVersion=\"5.1.2\">\n  <process id=\"Process_1\" isExecutable=\"false\">\n    <startEvent id=\"StartEvent_1y45yut\" name=\"开始\" />\n    <task id=\"Task_1hcentk\">\n      <outgoing>Flow_02v82gi</outgoing>\n    </task>\n    <task id=\"Task_2hcentk\" />\n    <sequenceFlow id=\"SequenceFlow_0h21x7r\" sourceRef=\"StartEvent_1y45yut\" targetRef=\"Task_1hcentk\" />\n    <task id=\"Activity_1pj8p2r\" name=\"服务可用性:1.005\">\n      <incoming>Flow_02v82gi</incoming>\n    </task>\n    <sequenceFlow id=\"Flow_02v82gi\" sourceRef=\"Task_1hcentk\" targetRef=\"Activity_1pj8p2r\" />\n  </process>\n  <bpmndi:BPMNDiagram id=\"BpmnDiagram_1\">\n    <bpmndi:BPMNPlane id=\"BpmnPlane_1\" bpmnElement=\"Process_1\">\n      <bpmndi:BPMNEdge id=\"SequenceFlow_0h21x7r_di\" bpmnElement=\"SequenceFlow_0h21x7r\">\n        <omgdi:waypoint x=\"188\" y=\"120\" />\n        <omgdi:waypoint x=\"240\" y=\"120\" />\n      </bpmndi:BPMNEdge>\n      <bpmndi:BPMNEdge id=\"Flow_02v82gi_di\" bpmnElement=\"Flow_02v82gi\">\n        <omgdi:waypoint x=\"340\" y=\"120\" />\n        <omgdi:waypoint x=\"400\" y=\"120\" />\n      </bpmndi:BPMNEdge>\n      <bpmndi:BPMNShape id=\"StartEvent_1y45yut_di\" bpmnElement=\"StartEvent_1y45yut\">\n        <omgdc:Bounds x=\"152\" y=\"102\" width=\"36\" height=\"36\" />\n        <bpmndi:BPMNLabel>\n          <omgdc:Bounds x=\"160\" y=\"145\" width=\"22\" height=\"14\" />\n        </bpmndi:BPMNLabel>\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNShape id=\"Task_1hcentk_di\" bpmnElement=\"Task_1hcentk\">\n        <omgdc:Bounds x=\"240\" y=\"80\" width=\"100\" height=\"80\" />\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNShape id=\"Activity_1pj8p2r_di\" bpmnElement=\"Activity_1pj8p2r\">\n        <omgdc:Bounds x=\"400\" y=\"80\" width=\"100\" height=\"80\" />\n      </bpmndi:BPMNShape>\n    </bpmndi:BPMNPlane>\n  </bpmndi:BPMNDiagram>\n</definitions>\n"
        },
        {
          "servicePatternName": "智慧招标服务流程2",
          "servicePatternKind": "智慧社区服务",
          "data": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<definitions xmlns=\"http://www.omg.org/spec/BPMN/20100524/MODEL\" xmlns:bpmndi=\"http://www.omg.org/spec/BPMN/20100524/DI\" xmlns:omgdi=\"http://www.omg.org/spec/DD/20100524/DI\" xmlns:omgdc=\"http://www.omg.org/spec/DD/20100524/DC\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" id=\"sid-38422fae-e03e-43a3-bef4-bd33b32041b2\" targetNamespace=\"http://bpmn.io/bpmn\" exporter=\"bpmn-js (https://demo.bpmn.io)\" exporterVersion=\"5.1.2\">\n  <process id=\"Process_1\" isExecutable=\"false\">\n    <startEvent id=\"StartEvent_1y45yut\" name=\"开始\" />\n    <task id=\"Task_1hcentk\">\n      <outgoing>Flow_02v82gi</outgoing>\n    </task>\n    <task id=\"Task_2hcentk\" />\n    <sequenceFlow id=\"SequenceFlow_0h21x7r\" sourceRef=\"StartEvent_1y45yut\" targetRef=\"Task_1hcentk\" />\n    <task id=\"Activity_1pj8p2r\" name=\"服务可用性:1.005\">\n      <incoming>Flow_02v82gi</incoming>\n      <outgoing>Flow_02a98y4</outgoing>\n    </task>\n    <sequenceFlow id=\"Flow_02v82gi\" sourceRef=\"Task_1hcentk\" targetRef=\"Activity_1pj8p2r\" />\n    <task id=\"Activity_10jmkxa\">\n      <incoming>Flow_02a98y4</incoming>\n      <outgoing>Flow_0zuo8ak</outgoing>\n    </task>\n    <sequenceFlow id=\"Flow_02a98y4\" sourceRef=\"Activity_1pj8p2r\" targetRef=\"Activity_10jmkxa\" />\n    <exclusiveGateway id=\"Gateway_1v7ct8j\">\n      <incoming>Flow_0zuo8ak</incoming>\n    </exclusiveGateway>\n    <sequenceFlow id=\"Flow_0zuo8ak\" sourceRef=\"Activity_10jmkxa\" targetRef=\"Gateway_1v7ct8j\" />\n  </process>\n  <bpmndi:BPMNDiagram id=\"BpmnDiagram_1\">\n    <bpmndi:BPMNPlane id=\"BpmnPlane_1\" bpmnElement=\"Process_1\">\n      <bpmndi:BPMNEdge id=\"Flow_02v82gi_di\" bpmnElement=\"Flow_02v82gi\">\n        <omgdi:waypoint x=\"340\" y=\"120\" />\n        <omgdi:waypoint x=\"400\" y=\"120\" />\n      </bpmndi:BPMNEdge>\n      <bpmndi:BPMNEdge id=\"SequenceFlow_0h21x7r_di\" bpmnElement=\"SequenceFlow_0h21x7r\">\n        <omgdi:waypoint x=\"188\" y=\"120\" />\n        <omgdi:waypoint x=\"240\" y=\"120\" />\n      </bpmndi:BPMNEdge>\n      <bpmndi:BPMNEdge id=\"Flow_02a98y4_di\" bpmnElement=\"Flow_02a98y4\">\n        <omgdi:waypoint x=\"500\" y=\"120\" />\n        <omgdi:waypoint x=\"560\" y=\"120\" />\n      </bpmndi:BPMNEdge>\n      <bpmndi:BPMNEdge id=\"Flow_0zuo8ak_di\" bpmnElement=\"Flow_0zuo8ak\">\n        <omgdi:waypoint x=\"660\" y=\"120\" />\n        <omgdi:waypoint x=\"725\" y=\"120\" />\n      </bpmndi:BPMNEdge>\n      <bpmndi:BPMNShape id=\"StartEvent_1y45yut_di\" bpmnElement=\"StartEvent_1y45yut\">\n        <omgdc:Bounds x=\"152\" y=\"102\" width=\"36\" height=\"36\" />\n        <bpmndi:BPMNLabel>\n          <omgdc:Bounds x=\"160\" y=\"145\" width=\"22\" height=\"14\" />\n        </bpmndi:BPMNLabel>\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNShape id=\"Task_1hcentk_di\" bpmnElement=\"Task_1hcentk\">\n        <omgdc:Bounds x=\"240\" y=\"80\" width=\"100\" height=\"80\" />\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNShape id=\"Activity_1pj8p2r_di\" bpmnElement=\"Activity_1pj8p2r\">\n        <omgdc:Bounds x=\"400\" y=\"80\" width=\"100\" height=\"80\" />\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNShape id=\"Activity_10jmkxa_di\" bpmnElement=\"Activity_10jmkxa\">\n        <omgdc:Bounds x=\"560\" y=\"80\" width=\"100\" height=\"80\" />\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNShape id=\"Gateway_1v7ct8j_di\" bpmnElement=\"Gateway_1v7ct8j\" isMarkerVisible=\"true\">\n        <omgdc:Bounds x=\"725\" y=\"95\" width=\"50\" height=\"50\" />\n      </bpmndi:BPMNShape>\n    </bpmndi:BPMNPlane>\n  </bpmndi:BPMNDiagram>\n</definitions>\n"
        },
        {
          "servicePatternName": "居家养老服务流程1",
          "servicePatternKind": "养老服务",
          "data": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<definitions xmlns=\"http://www.omg.org/spec/BPMN/20100524/MODEL\" xmlns:bpmndi=\"http://www.omg.org/spec/BPMN/20100524/DI\" xmlns:omgdi=\"http://www.omg.org/spec/DD/20100524/DI\" xmlns:omgdc=\"http://www.omg.org/spec/DD/20100524/DC\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" id=\"sid-38422fae-e03e-43a3-bef4-bd33b32041b2\" targetNamespace=\"http://bpmn.io/bpmn\" exporter=\"bpmn-js (https://demo.bpmn.io)\" exporterVersion=\"5.1.2\">\n  <process id=\"Process_1\" isExecutable=\"false\">\n    <startEvent id=\"StartEvent_1y45yut\" name=\"开始\" />\n    <task id=\"Task_1hcentk\">\n      <outgoing>Flow_02v82gi</outgoing>\n    </task>\n    <task id=\"Task_2hcentk\" />\n    <sequenceFlow id=\"SequenceFlow_0h21x7r\" sourceRef=\"StartEvent_1y45yut\" targetRef=\"Task_1hcentk\" />\n    <task id=\"Activity_1pj8p2r\" name=\"服务可用性:1.005\">\n      <incoming>Flow_02v82gi</incoming>\n      <outgoing>Flow_02a98y4</outgoing>\n    </task>\n    <sequenceFlow id=\"Flow_02v82gi\" sourceRef=\"Task_1hcentk\" targetRef=\"Activity_1pj8p2r\" />\n    <task id=\"Activity_10jmkxa\">\n      <incoming>Flow_02a98y4</incoming>\n      <outgoing>Flow_0zuo8ak</outgoing>\n    </task>\n    <sequenceFlow id=\"Flow_02a98y4\" sourceRef=\"Activity_1pj8p2r\" targetRef=\"Activity_10jmkxa\" />\n    <exclusiveGateway id=\"Gateway_1v7ct8j\">\n      <incoming>Flow_0zuo8ak</incoming>\n    </exclusiveGateway>\n    <sequenceFlow id=\"Flow_0zuo8ak\" sourceRef=\"Activity_10jmkxa\" targetRef=\"Gateway_1v7ct8j\" />\n  </process>\n  <bpmndi:BPMNDiagram id=\"BpmnDiagram_1\">\n    <bpmndi:BPMNPlane id=\"BpmnPlane_1\" bpmnElement=\"Process_1\">\n      <bpmndi:BPMNEdge id=\"Flow_02v82gi_di\" bpmnElement=\"Flow_02v82gi\">\n        <omgdi:waypoint x=\"340\" y=\"120\" />\n        <omgdi:waypoint x=\"400\" y=\"120\" />\n      </bpmndi:BPMNEdge>\n      <bpmndi:BPMNEdge id=\"SequenceFlow_0h21x7r_di\" bpmnElement=\"SequenceFlow_0h21x7r\">\n        <omgdi:waypoint x=\"188\" y=\"120\" />\n        <omgdi:waypoint x=\"240\" y=\"120\" />\n      </bpmndi:BPMNEdge>\n      <bpmndi:BPMNEdge id=\"Flow_02a98y4_di\" bpmnElement=\"Flow_02a98y4\">\n        <omgdi:waypoint x=\"500\" y=\"120\" />\n        <omgdi:waypoint x=\"560\" y=\"120\" />\n      </bpmndi:BPMNEdge>\n      <bpmndi:BPMNEdge id=\"Flow_0zuo8ak_di\" bpmnElement=\"Flow_0zuo8ak\">\n        <omgdi:waypoint x=\"660\" y=\"120\" />\n        <omgdi:waypoint x=\"725\" y=\"120\" />\n      </bpmndi:BPMNEdge>\n      <bpmndi:BPMNShape id=\"StartEvent_1y45yut_di\" bpmnElement=\"StartEvent_1y45yut\">\n        <omgdc:Bounds x=\"152\" y=\"102\" width=\"36\" height=\"36\" />\n        <bpmndi:BPMNLabel>\n          <omgdc:Bounds x=\"160\" y=\"145\" width=\"22\" height=\"14\" />\n        </bpmndi:BPMNLabel>\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNShape id=\"Task_1hcentk_di\" bpmnElement=\"Task_1hcentk\">\n        <omgdc:Bounds x=\"240\" y=\"80\" width=\"100\" height=\"80\" />\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNShape id=\"Activity_1pj8p2r_di\" bpmnElement=\"Activity_1pj8p2r\">\n        <omgdc:Bounds x=\"400\" y=\"80\" width=\"100\" height=\"80\" />\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNShape id=\"Activity_10jmkxa_di\" bpmnElement=\"Activity_10jmkxa\">\n        <omgdc:Bounds x=\"560\" y=\"80\" width=\"100\" height=\"80\" />\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNShape id=\"Gateway_1v7ct8j_di\" bpmnElement=\"Gateway_1v7ct8j\" isMarkerVisible=\"true\">\n        <omgdc:Bounds x=\"725\" y=\"95\" width=\"50\" height=\"50\" />\n      </bpmndi:BPMNShape>\n    </bpmndi:BPMNPlane>\n  </bpmndi:BPMNDiagram>\n</definitions>\n"
        }
      ],
      dialogVisible: false
    }
  },
  methods: {
    onSubmit() {
      this.dialogVisible=true
      console.log('submit!');
    },
    onAdd() {
      // this.tableData[this.tableData.length] = { serviceName: "", serviceKind: "" }
      // console.log(this.tableData)
      // this.tableData[this.tableData.length - 1].serviceKind = this.value
      // this.tableData[this.tableData.length - 1].serviceName = this.serviceName
      this.tableData.push({
        // 新行的数据
        serviceKind: this.value,
        serviceName: this.serviceName,
      });
      this.value = ""
      this.serviceName = ""
      this.$message({
        type: "success",
        message: "添加服务项成功!"
      })
      console.log(this.tableData)
      this.$forceUpdate();
    },
    onAdd1() {
      // this.tableData[this.tableData.length] = { serviceName: "", serviceKind: "" }
      // console.log(this.tableData)
      // this.tableData[this.tableData.length - 1].serviceKind = this.value
      // this.tableData[this.tableData.length - 1].serviceName = this.serviceName
      this.tableData1.push({
        // 新行的数据
        organizationKind: this.value1,
        organizationName: this.organizationName,
      });
      this.value1 = ""
      this.organizationName = ""
      this.$message({
        type: "success",
        message: "添加组织项成功!"
      })
      console.log(this.tableData)
      this.$forceUpdate();
    },
    onAdd2() {
      // this.tableData[this.tableData.length] = { serviceName: "", serviceKind: "" }
      // console.log(this.tableData)
      // this.tableData[this.tableData.length - 1].serviceKind = this.value
      // this.tableData[this.tableData.length - 1].serviceName = this.serviceName
      this.tableData2.push({
        // 新行的数据
        resourceKind: this.value2,
        resourceName: this.resourceName,
      });
      this.value2 = ""
      this.resourceName = ""
      this.$message({
        type: "success",
        message: "添加资源项成功!"
      })
      console.log(this.tableData)
      this.$forceUpdate();
    },
  },


}
</script>

<style scoped>
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
