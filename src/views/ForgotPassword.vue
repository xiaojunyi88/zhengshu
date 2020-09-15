<template>
    <div style="height: 100vh;display: flex; justify-content: center; align-items: center;">
        <el-form :model="formData" :rules="rules" ref="form"  style="width: 30%;" label-width="100px" class="demo-ruleForm">
            <el-form-item label="新密码" prop="newPassword">
                <el-input type="password" v-model="formData.newPassword" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="newPasswordConfirm">
                <el-input type="password" v-model="formData.newPasswordConfirm" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="setPassword()" :loading="onLoading" >确认</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "ForgotPassword",
        data(){
            return {
                dataLoading: false,
                onLoading: false,
                queryData: '',

                formData: {
                    newPassword: '',
                    newPasswordConfirm: ''
                },
                rules: {
                    newPassword: [
                        {required: true, message: '请输入新密码', trigger: 'blur'},
                        {validator: this.validatePass, trigger: 'blur'},
                        {min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur'}
                    ],
                    newPasswordConfirm: [
                        {required: true, message: '请输入确认密码', trigger: 'blur'},
                        {validator: this.validateCheckPass, trigger: 'blur'},
                        {min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur'}
                    ],
                }
            }
        },
        mounted: function(){
            this.$nextTick(function(){
               this.queryData = this.$route.query;
            })
        },
        methods: {
            setPassword(){
                if(!this.queryData.sid){
                    this.$message({
                        type: 'error',
                        message: '找回信息错误'
                    })
                    return false;
                } else {
                    this.onLoading = true;
                    this.$refs['form'].validate(valid => {
                        if(valid){
                            this.axios({
                                method: "POST",
                                url: "/mail/reset/password",
                                data: {
                                    password: this.formData.newPassword,
                                    sid: this.queryData.sid
                                }
                            }).then(res => {
                                if(res.code === 'success'){
                                    this.$message({
                                        type: 'success',
                                        message: res.data + " 5秒后返回登录页"
                                    })
                                    this.onLoading = false;
                                    setTimeout(() => {
                                        localStorage.removeItem('Auth');
                                        this.$router.push('/login');
                                    }, 5000)
                                } else {
                                    this.$message({
                                        type: 'warning',
                                        message: res.data
                                    })
                                }
                                this.$refs['form'].resetFields();
                            })
                        } else {
                            return false;
                        }
                    })
                }
            },

            validatePass(rule, value, callback) {
                if (this.formData.newPasswordConfirm !== ''&&value !== this.formData.newPasswordConfirm) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    this.$refs['form'].clearValidate('newPasswordConfirm');
                    callback();
                }
            },
            validateCheckPass(rule, value, callback) {
                if (value !== this.formData.newPassword) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    this.$refs['form'].clearValidate('newPassword');
                    callback();
                }
            }
        }
    }
</script>

<style scoped>

</style>
