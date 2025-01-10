<template>
    <div id="page">
        <div id="building">
            <div style="margin: 20px 0; text-align:  center;font-size: 24px;"><b>登 录</b></div>
            <el-form :model="numberValidateForm" ref="numberValidateForm"  class="demo-ruleForm">
                <el-form-item  prop="username" :rules="[
                    { required: true, message: '账号名不能为空' },
                    { type: 'number', message: '年龄必须为数字值' }
                ]">
                    <el-input v-model.number="numberValidateForm.account" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item  prop="password" :rules="[
                    { required: true, message: '密码不能为空' },
                    { type: 'number', message: '年龄必须为数字值' }
                ]">
                    <el-input v-model.number="numberValidateForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item style="margiin:10px 0; text-align: right;">
                    <el-button type="primary" @click="submitForm('numberValidateForm')">登录</el-button>
                    <el-button type="warning" @click="resetForm('numberValidateForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<style scoped>
#page {
    width: 100%;
    height: 100%;
    position: fixed;
    background-size: 100% 100%;
    background: url("../assets/Untitled.png");
}
#building{
    margin: 300px auto;
    background-color: #FFF;
    width: 350px;
    height: 300px;
    padding: 20px;
    border-radius: 10px;
}
</style>

<script>
export default {
    name: 'LogPage',
    data() {
        return {
            imageUrl: "/Untitled (1).png",
            numberValidateForm: {
                account: '',
                password: ''
            }
        }
    },
    components: {
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
};
</script>
