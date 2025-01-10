<template>
  <div id="societyPatternBackGround">
    <el-container>
      <el-main>
        <file_area></file_area>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import file_area from "./file_area"
export default {
  name: "societyManagementMenu",
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
  margin-left:200px;
  font-size: medium;
}
#societyPatternBackGround{
  height:100%;
}
</style>