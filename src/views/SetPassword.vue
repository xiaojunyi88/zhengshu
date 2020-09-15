<template>
    <div style="height: 100vh;display: flex; justify-content: center; align-items: center;">
        <el-form :model="formData" :rules="rules" style="width: 40%;" ref="form" label-width="100px"
                 class="demo-ruleForm">
            <el-form-item label="账号" prop="userName">
                <el-input type="text" v-model="formData.userName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="旧密码" prop="oldPassword">
                <el-input type="password" v-model="formData.oldPassword" autocomplete="new-password"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPassword">
                <el-input type="password" v-model="formData.newPassword" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="newPasswordConfirm">
                <el-input type="password" v-model="formData.newPasswordConfirm" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="type">
                <el-radio-group v-model="formData.type">
                    <el-radio label="1">修改服务中心密码</el-radio>
                    <el-radio label="2">修改服务机构密码</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="setPassword()" :loading="onLoading">确认修改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "SetPassword",
        data() {
            return {
                onLoading: false,
                formData: {
                    userName: '',
                    oldPassword: '',
                    newPassword: '',
                    newPasswordConfirm: '',
                    type: ''
                },
                rules: {
                    userName: [
                        {required: true, message: '请输入账号', trigger: 'blur'}
                    ],
                    oldPassword: [
                        {required: true, message: '请输入旧密码', trigger: 'blur'}
                    ],
                    newPassword: [
                        {required: true, message: '请输入新密码', trigger: 'blur'},
                        {validator: this.validatePass, trigger: 'blur'}
                    ],
                    newPasswordConfirm: [
                        {required: true, message: '请输入确认密码', trigger: 'blur'},
                        {validator: this.validateCheckPass, trigger: 'blur'}
                    ],
                    type: [
                        {required: true, message: '请选择要修改的组织', trigger: 'change'},
                    ]
                }
            }
        },
        methods: {

            setPassword() {
                this.$refs['form'].validate(valid => {

                    let url = this.formData.type === '1'?'/enterprises/user/changePassword':'/service/branches/info/changePassword';
                    if (valid) {
                        this.onLoading = true;

                        this.axios({
                            method: 'PUT',
                            url: url,
                            data: this.formData
                        }).then(res => {
                            this.onLoading = false;
                            if(res.code === 'success'){
                                this.$message({
                                    type: 'success',
                                    message: '修改成功！'
                                });
                                this.$refs['form'].resetFields();
                            } else {
                                this.$message({
                                    type: 'warning',
                                    message: res.errorMsg
                                });
                            }
                        }).catch(e => {
                            this.onLoading = false;
                        })
                    } else {
                        return false;
                    }
                })
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
