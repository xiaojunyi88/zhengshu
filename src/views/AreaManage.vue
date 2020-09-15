<template>
    <div>
        <ptitle title="区域管理">
            <el-button @click="addAreaAccount()" size="small" type="primary">新增区域账号</el-button>
        </ptitle>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column
                    type="index"
                    align="center"
                    width="50">
            </el-table-column>

            <el-table-column
                    prop="area_name"
                    align="center"
                    label="地区">
            </el-table-column>
            <el-table-column
                    prop="user_name"
                    align="center"
                    label="账号">
            </el-table-column>
            <el-table-column
                    prop="create_date"
                    align="center"
                    label="创建时间">
            </el-table-column>
            <el-table-column
                    align="center"
                    label="账号状态">
                <template slot-scope="scope">
                    {{scope.row.status?'已开启':'已关闭'}}
                </template>
            </el-table-column>
            <el-table-column
                    align="center"
                    label="操作">
                <template slot-scope="scope">
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

        <!--对话框-->
        <el-dialog :title="'新增区域账号'" :visible.sync="dialogVisible" width="50%" :before-close="handleClose" :destroy-on-close="true">

            <div class="form-box percent-70" v-loading="formLoading">
                <el-form ref="form" :model="formData" :rules="rules" label-width="120px" size="small">
                    <el-form-item label="选择区域" prop="area">
                        <el-cascader
                                style="width: 100%"
                                v-model="formData.area"
                                :options="areaList"
                                :props="{ expandTrigger: 'hover' , multiple: false, value: 'id', label: 'name'}"
                                clearable
                                @change="handleCascaderChange">
                        </el-cascader>
                    </el-form-item>
                    <el-form-item label="区域账号" prop="account">
                        <el-input disabled v-model="formData.account"></el-input>
                    </el-form-item>
                    <el-form-item label="默认密码" prop="account">
                        <el-input disabled v-model="formData.password"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="formData.email"></el-input>
                    </el-form-item>

                    <!--<el-form-item label="当前账户状态">-->
                    <!--<el-switch v-model="formData.status"-->
                    <!--:active-value="1"-->
                    <!--:inactive-value="0"-->
                    <!--active-text="开启"-->
                    <!--inactive-text="关闭">-->

                    <!--</el-switch>-->
                    <!--</el-form-item>-->
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button size="small" @click="handleClose">取消</el-button>
                    <el-button size="small" type="primary" @click="formSubmit">提交</el-button>
                </span>
            </div>

        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "AreaManage",
        data(){
            return {
                dataLoading: false,
                formLoading: false,
                dialogVisible: false,

                tableData: [],

                // 表单提交相关
                areaList: [],
                formData: {
                    area: '',
                    account: '',
                    password: '',
                    email: ''
                },
                rules: {
                    area: [
                        {required: true, message: '请选择区域', trigger: 'change'}
                    ],
                    email: [
                        {required: true, message: '请填写邮箱', trigger: 'blur'},
                        {validator: this.emailValid, trigger: 'blur'}
                    ]
                },

                // 列表和分页获取相关
                currPage: 1,
                pageSize: 10,
                order: 'DESC',
                total: 0
            }
        },
        mounted: function(){
            this.$nextTick(function(){
                this.getDataList();
            })
        },
        methods: {

            async addAreaAccount(){
                this.dialogVisible = true;
                this.formLoading = true;

                let areaRes = await this.getAreaList();
                if(areaRes.code === 'success'){
                    this.areaList = areaRes.data;
                }
                this.formLoading = false;
            },

            // 停用启用
            statusClick(row) {
                let statusText = row.status === 1?'停用':'启用';
                this.$confirm('确认要'+statusText+'此账号吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.axios({
                        method: 'PUT',
                        url: '/enterprises/user/changeUsing',
                        data: {
                            ids: [row.id],
                            status: row.status === 1?0:1
                        }
                    }).then(res => {
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

            // 查看详情
            detailClick(row){
                this.$router.push({ path: '/esc/center/9-1', query: { id: row.id }})
            },

            formSubmit(){
                this.$refs['form'].validate( valid => {
                    if(valid) {

                        let data = {
                            area: this.formData.area[2],
                            city: this.formData.area[1],
                            province: this.formData.area[0],
                            email: this.formData.email
                        }

                        this.axios({
                            method: "POST",
                            url: "/service/enterprises/info/insert",
                            data: data
                        }).then(res => {
                            this.formLoading = false;
                            if(res.code === 'success'){
                                this.$message({
                                    type: 'success',
                                    message: '新增账号成功！'
                                });

                                this.dialogVisible = false;
                                this.$refs['form'].resetFields();
                                this.getDataList();
                            } else {
                                this.$message({
                                    type: 'warning',
                                    message: '新增账号失败！' + (res.errorMsg||'')
                                });
                            }
                        }).catch(e => {
                            this.$message({
                                type: 'warning',
                                message: e
                            });
                            this.formLoading = false;
                        })

                    } else {
                        return false;
                    }
                })
            },

            getAreaList(){
              return this.axios({
                  method: 'GET',
                  url: '/service/enterprises/info/getAreaData'
              })
            },

            // 获取账号列表
            getDataList(){
                this.dataLoading = true;
                this.axios({
                    method: 'GET',
                    url: '/service/enterprises/info/getAreaAccountList',
                    params: {
                        currPage: this.currPage,
                        pageSize: this.pageSize,
                        order: this.order,
                    }
                }).then(res => {
                    this.dataLoading = false;
                    this.dataLoading = false;
                    if (res.code === 'list') {
                        this.tableData = res.dataList;
                        this.total = res.total;
                    }
                })
            },
            // 分页
            handleCurrentChange(val){
                this.currPage = val;
                this.getDataList();
            },

            // 级联change
            handleCascaderChange(){
                this.getCode(this.formData.area, this.areaList);
            },
            // 拿到code
            getCode(aId, aArray){
                if(aId.length > 0){
                    let oneRes = aArray.filter(v => {
                        return v.id === aId[0];
                    })[0];
                    let twoRes = oneRes.children.filter(v => {
                        return v.id === aId[1];
                    })[0];
                    let threeRes = twoRes.children.filter(v => {
                        return v.id === aId[2];
                    })[0];
                    this.formData.account = threeRes.code;
                    this.formData.password = '123456';
                } else {
                    this.formData.account = '';
                    this.formData.password = '';
                }
            }

        }
    }
</script>

<style scoped>

</style>
