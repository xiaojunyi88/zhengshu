<template>
    <div v-loading="dataLoading">
        <ptitle title="中心信息"></ptitle>
        <el-form ref="form" :model="formData" :rules="rules" label-width="120px" style="padding: 20px 160px 30px" size="small">
            <el-row>
                <el-col :span="10">
                    <el-form-item label="中心名称" prop="name">
                        <el-input :disabled="auth.type_id !== 1" v-model="formData.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10" :offset="2">
                    <el-form-item label="详细地址" prop="address">
                        <el-input :disabled="auth.type_id !== 1" v-model="formData.address"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10">
                    <el-form-item label="联系人" prop="contacts">
                        <el-input :disabled="auth.type_id !== 1" v-model="formData.contacts"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10" :offset="2">
                    <el-form-item label="营业许可证号" prop="license">
                        <el-input :disabled="auth.type_id !== 1" v-model="formData.license"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10">
                    <el-form-item label="手机" prop="contactsMobile">
                        <el-input :disabled="auth.type_id !== 1" v-model="formData.contactsMobile"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10" :offset="2">
                    <el-form-item label="固定电话" prop="contactsPhone">
                        <el-input :disabled="auth.type_id !== 1" v-model="formData.contactsPhone"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10">
                    <el-form-item label="法人代表" prop="corporate">
                        <el-input :disabled="auth.type_id !== 1" v-model="formData.corporate"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10" :offset="2">
                    <el-form-item label="法人手机" prop="corporateMobile">
                        <el-input :disabled="auth.type_id !== 1" v-model="formData.corporateMobile"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10">
                    <el-form-item label="签约日期" prop="contractDate">
                        <el-input v-model="formData.contractDate" disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <el-button v-if="auth.type_id === 1" style="display: block;margin: 20px auto" type="primary" @click="formSubmit">提交修改</el-button>

    </div>
</template>

<script>
    export default {
        name: "ComponyMsg",
        data(){
            return {
                dataLoading: false,
                auth: JSON.parse(localStorage.getItem("Auth")),

                // 提交表单信息
                formData: {
                    address: "",
                    contacts: "",
                    contactsMobile: "",
                    contactsPhone: "",
                    contractDate: "",
                    corporate: "",
                    corporateMobile: "",
                    id: "",
                    license: "",
                    middleSeniorManage: "",
                    name: "",
                    type: ""
                },
                classList: [],
                // 验证规则
                rules: {
                    name: [
                        { required: true, message: '请输入中心名称', trigger: 'blur' }
                    ],
                    address: [
                        { required: true, message: '请输入详细地址', trigger: 'blur' }
                    ],
                    contacts: [
                        { required: true, message: '请输入联系人', trigger: 'blur' }
                    ],
                    contactsMobile: [
                        { required: true, message: '请输入联系人手机', trigger: 'blur' },
                        { validator: this.phoneValid, trigger: 'blur' }
                    ],
                    contactsPhone: [
                        { required: true, message: '请输入联系人固定电话', trigger: 'blur' },
                        { validator: this.callValid, trigger: 'blur' }
                    ],
                    corporate: [
                        { required: true, message: '请输入法人姓名', trigger: 'blur' }
                    ],
                    corporateMobile: [
                        { required: true, message: '请输入法人手机', trigger: 'blur' },
                        { validator: this.phoneValid, trigger: 'blur' }
                    ],
                    license: [
                        { required: true, message: '请输入许可证号', trigger: 'blur' }
                    ]
                },
            }
        },
        mounted: function(){
            this.$nextTick(function(){
                this.getData();
            })
        },
        methods: {

            formSubmit(){
                this.$refs['form'].validate( valid => {
                    if(valid){
                        this.dataLoading = true;
                        this.axios({
                            method: 'PUT',
                            url: '/service/enterprises/info/update',
                            data: this.formData
                        }).then(res => {
                            this.dataLoading = false;
                            if(res.code === 'success'){
                                this.$message({
                                    type: 'success',
                                    message: '修改成功！'
                                })
                            } else {
                                this.$message({
                                    type: 'warning',
                                    message: '修改失败！'
                                })
                            }
                        }).catch(e => {
                            this.dataLoading = false;
                            this.$message({
                                type: 'warning',
                                message: e
                            })
                        })
                    } else {
                        return false
                    }
                })
            },

            // 获取信息
            getData(){
                this.dataLoading = true;
                this.axios({
                    method: 'GET',
                    url: '/service/enterprises/info/getById?id='+this.auth.enterpriseId
                }).then(res => {
                    this.dataLoading = false;
                    if(res.code === 'success'){
                        this.formData = res.data;
                    } else {
                        this.$message({
                            type: 'warning',
                            message: '获取信息失败！'
                        });
                    }
                }).catch(e => {
                    this.$message({
                        type: 'warning',
                        message: e
                    });
                })
            }

        }
    }
</script>

<style scoped>

</style>
