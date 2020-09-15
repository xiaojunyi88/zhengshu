<template>
    <div v-loading="dataLoading">

        <el-row style="padding-bottom: 10px;margin-bottom: 10px">
            <el-col :span="4">
                <el-input size="small" placeholder="请输入要搜索的内容" v-model="searchMsg"></el-input>
            </el-col>
            <el-col :span="3" style="margin-left: 10px;">
                <el-select size="small" v-model="searchState" style="width: 100%;" placeholder="请选择状态">
                    <el-option
                            v-for="item in statusOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="3" style="margin-left: 10px;">
                <el-select size="small" v-model="searchSex" style="width: 100%;" placeholder="请选择性别">
                    <el-option
                            v-for="item in sexOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="3" style="margin-left: 10px;">
                <el-select size="small" v-model="searchOrg" style="width: 100%;" placeholder="请选择机构">
                    <el-option
                            v-for="item in orgOptions"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4" style="margin-left: 10px">
                <el-button type="primary" size="small" @click="search">搜索</el-button>
                <el-button type="default" size="small" @click="searchAll">清空</el-button>
            </el-col>
        </el-row>


        <el-table :data="tableData"  border style="width: 100%">
            <el-table-column
                    type="index"
                    align="center"
                    width="50">
            </el-table-column>
            <el-table-column
                    prop="staffNo"
                    align="center"
                    label="员工编号">
            </el-table-column>
            <el-table-column
                    prop="name"
                    align="center"
                    label="姓名">
            </el-table-column>
            <el-table-column
                    prop="sex"
                    align="center"
                    label="性别">
                <template slot-scope="scope">
                    {{scope.row.sex === 1?'男':'女'}}
                </template>
            </el-table-column>
            <el-table-column
                    prop="age"
                    align="center"
                    label="年龄">
            </el-table-column>
            <el-table-column
                    prop="mobile"
                    align="center"
                    label="电话">
            </el-table-column>
            <el-table-column
                    prop="address"
                    align="center"
                    label="地址">
            </el-table-column>
            <el-table-column
                    prop="status"
                    align="center"
                    label="状态">
                <template slot-scope="scope">
                    {{scope.row.status === 1?'已启用':'已停用'}}
                </template>
            </el-table-column>
            <el-table-column
                    prop="branchName"
                    align="center"
                    label="所属机构">
            </el-table-column>
            <el-table-column
                    v-if="auth.type_id === 1"
                    align="center"
                    label="操作">
                <template slot-scope="scope">
                    <el-button @click="editClick(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button @click="statusClick(scope.row)" type="text" size="small">{{scope.row.status === 1?'停用':'启用'}}</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--分页-->
        <el-pagination
                background
                layout="total, prev, pager, next"
                :page-size="pageSize"
                :total="total"
                @current-change="handleCurrentChange">
        </el-pagination>

        <!--弹出层-->
        <el-dialog :title="dialogText" :visible.sync="dialogVisible" width="50%" :before-close="handleClose" :destroy-on-close="true">

            <div class="form-box percent-70" v-loading="formLoading">
                <el-form ref="form" :model="formData" :rules="rules" label-width="120px" size="small">
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="formData.name"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证号" prop="idCode">
                        <el-input v-model="formData.idCode"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="sex">
                        <el-radio-group v-model="formData.sex">
                            <el-radio :label="1">男</el-radio>
                            <el-radio :label="0">女</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="年龄" prop="age">
                        <el-input v-model.number="formData.age"></el-input>
                    </el-form-item>
                    <el-form-item label="电话" prop="mobile">
                        <el-input v-model="formData.mobile"></el-input>
                    </el-form-item>
                    <el-form-item label="地址" prop="address">
                        <el-input v-model="formData.address"></el-input>
                    </el-form-item>
                    <el-form-item label="员工编号" v-if="!isAdd">
                        <el-input v-model="formData.staffNo" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="所属机构" prop="branchesId">
                        <el-select v-model="formData.branchesId" placeholder="请选择所属机构">
                            <el-option v-for="item in orgOptions"
                                       :key="item.id"
                                       :label="item.name"
                                       :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="员工类型" prop="type">
                        <el-select v-model="formData.type" placeholder="请选择员工类型">
                            <el-option v-for="item in typeList"
                                       :key="item.id"
                                       :label="item.label"
                                       :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="初始密码">
                        123456
                    </el-form-item>
                    <el-form-item label="当前员工状态">
                        <el-switch v-model="formData.status"
                                   :active-value="1"
                                   :inactive-value="0"
                                   active-text="开启"
                                   inactive-text="关闭">

                        </el-switch>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button size="small" @click="handleClose">取消</el-button>
                    <el-button size="small" type="primary" @click="formSubmit">提交</el-button>
                    <el-button size="small" type="primary" @click="initPassword" v-if="!isAdd">初始化密码</el-button>
                </span>
            </div>

        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "StaffInfoOrg",
        data(){
            return {
                dataLoading: false,
                dialogText: '',
                dialogVisible: false,
                formLoading: false,
                isAdd: false,
                tableData: [],
                auth: JSON.parse(localStorage.getItem("Auth")),


                // 提交表单信息
                currentId: '',
                formData: {
                    enterpriseId: 1,
                    name: '',
                    sex: '',
                    mobile: '',
                    address: '',
                    status: '',
                    idCode: '',
                    age: '',
                    type: '',
                    staffNo: '',
                    branchesId: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请填写员工姓名', trigger: 'blur' }
                    ],
                    sex: [
                        { required: true, message: '请选择员工性别', trigger: 'change' }
                    ],
                    mobile: [
                        { required: true, message: '请填写电话号码', trigger: 'blur' },
                        { validator: this.phoneValid, trigger: 'blur' }
                    ],
                    address: [
                        { required: true, message: '请填写地址', trigger: 'blur' }
                    ],
                    idCode: [
                        { required: true, message: '请填写身份证号', trigger: 'blur' },
                        { validator: this.idCodeValid, trigger: 'blur' }
                    ],
                    age: [
                        { required: true, message: '请填写年龄', trigger: 'blur' },
                        { type: 'number', message: '年龄必须为数字值', trigger: 'blur' },
                    ],
                    type: [
                        { required: true, message: '请选择员工类型', trigger: 'change' }
                    ],
                    branchesId: [
                        { required: true, message: '请选择所属机构', trigger: 'change' }
                    ]
                },
                typeList: [
                    {
                        id: 1,
                        label: '接单员'
                    },
                    {
                        id: 2,
                        label: '其他'
                    },
                ],



                // 检索的相关字段
                searchMsg: '',
                searchState: '',
                searchSex: '',
                searchOrg: '',
                statusOptions: [
                    {
                        label: '关闭',
                        value: 0
                    },
                    {
                        label: '开启',
                        value: 1
                    }
                ],
                sexOptions: [
                    {
                        label: '女',
                        value: 0
                    },
                    {
                        label: '男',
                        value: 1
                    }
                ],
                orgOptions: [],

                // 列表和分页获取相关
                currPage: 1,
                pageSize: 10,
                order: 'DESC',
                total: 0
            }
        },
        mounted: function(){
            this.$nextTick(async function(){
                this.getDataList();
                let branchRes = await this.getBranchesList();
                this.orgOptions = branchRes['dataList'];

            })
        },
        methods: {

            // 获取机构列表 下拉用
            getBranchesList(){
                return this.axios({
                    method: 'GET',
                    url: '/service/branches/info/getListSelectUse'
                })
            },


            async addStaff(){
                this.dialogVisible = true;
                this.formLoading = true;
                this.dialogText = '新增机构人员';
                this.isAdd = true;

                this.formLoading = false;
            },
            async editClick(row){
                this.dialogVisible = true;
                this.formLoading = true;
                this.dialogText = '修改机构人员';
                this.isAdd = false;

                // 组件内会有这种问题？ 正常来说open dialog时 form的赋值(会认为是初始值)是在mounted时赋值的，如果不用$nextTick vue
                // 会认为赋值后的formData就是初始值，导致无法清空；调用nextTick 此时的赋值是在mounted之后，所以并不是初始值了。
                this.$nextTick(() => {
                    for(let key in row){
                        this.formData[key] = row[key];
                    }
                });
                this.currentId = row.id;

                this.formLoading = false;

            },
            statusClick(row){
                let statusText = row.status === 1?'停用':'启用';
                this.$confirm('确认要'+statusText+'此机构人员吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.dataLoading = true;
                    this.axios({
                        method: 'PUT',
                        url: '/branches/service/person/changeUsing',
                        data: {
                            ids: [row.id],
                            status: row.status === 1?0:1
                        }
                    }).then(res => {
                        this.dataLoading = false;
                        if(res.code === 'success'){
                            this.$message({
                                type: 'success',
                                message: statusText+'成功!'
                            });
                        }
                        this.getDataList();
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消' + statusText
                    });
                });
            },

            handleClose(){
                this.dialogVisible = false;
                this.$refs['form'].resetFields();
            },

            formSubmit(){
                this.$refs['form'].validate( valid => {
                    if(valid){
                        this.formLoading = true;
                        let method = this.isAdd?'POST':'PUT';
                        let url = this.isAdd?'/branches/service/person/insert':'/branches/service/person/update';
                        this.axios({
                            method: method,
                            url: url,
                            data: this.formData
                        }).then(res => {
                            this.formLoading = false;

                            if(res.code === 'success'){
                                this.$message({
                                    type: 'success',
                                    message: (this.isAdd?'新增':'修改') + '机构人员成功！'
                                })
                                this.$refs['form'].resetFields();
                                this.dialogVisible = false;
                                this.getDataList();
                            }else {
                                this.$message({
                                    type: 'warning',
                                    message: (this.isAdd?'新增':'修改') + '人员失败！' + (res.errorMsg || '')
                                })
                            }
                        }).catch(e => {
                            this.$message({
                                type: 'warning',
                                message: e
                            })
                            this.formLoading = false;
                        })
                    } else {
                        return false;
                    }
                })
            },

            // 初始化密码
            initPassword(){

                this.$confirm('确认要初始化密码吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.formLoading = true;
                    this.axios({
                        method: 'PUT',
                        url: '/branches/service/person/resetPassword',
                        params: {
                            id: this.currentId
                        }
                    }).then(res => {
                        if(res.code === 'success'){
                            this.$message({
                                type: 'success',
                                message: '初始化密码成功!'
                            });
                        } else {
                            this.$message({
                                type: 'warning',
                                message: '初始化密码失败!'
                            });
                        }
                        this.formLoading = false;
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消初始化密码'
                    });
                });
            },


            // 检索
            search(){
                this.currPage = 1;
                this.getDataList();
            },

            // 清空搜索
            searchAll(){
                this.currPage = 1;

                this.searchMsg = '';
                this.searchOrg = '';
                this.searchState = '';
                this.searchSex = '';

                this.getDataList();
            },


            getDataList(){
                this.dataLoading = true;
                this.axios({
                    method: 'GET',
                    url: '/branches/service/person/getList',
                    params: {
                        currPage: this.currPage,
                        pageSize: this.pageSize,
                        order: this.order,
                        status: this.searchState,
                        search_msg: this.searchMsg,
                        search_sex: this.searchSex,
                        search_branches: this.searchOrg
                    }
                }).then(res => {
                    this.dataLoading = false;
                    if(res.code === 'list'){
                        this.tableData = res.dataList;
                        this.total = res.total;
                    }
                }).catch(e => {
                    this.dataLoading = false;
                })
            },
            handleCurrentChange(val){
                this.currPage = val;
                this.getDataList();
            }
        }
    }
</script>

<style scoped>

</style>
