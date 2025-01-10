<template>
  <div id="societyPatternBackGround">
    <el-container>
      <el-aside width="200px">
      </el-aside>
      <el-main>
        <p id="title">模式文件</p>
        <file_area></file_area>
      </el-main>
    </el-container>

  </div>
</template>

<script>
import file_area from "./file_area"
export default {
  name: "societyMenu",
  components: {
    file_area
  },
  methods: {
  },
};
</script>

<style scope>
#title {
  text-align: left;
  position: relative;
  top:-30px;
  left:20px;
  font-size: medium;
}
#societyPatternBackGround{
  height:100%;
}
</style>