<!--服务种类-->
<template>
    <div v-loading="dataLoading">

        <ptitle title="服务类型列表">
            <el-button @click="addService()" size="small" type="primary">新增服务类型</el-button>
        </ptitle>

        <el-table :data="tableData" border style="width: 100%;">
            <el-table-column
                    type="index"
                    align="center"
                    width="50">
            </el-table-column>
            <el-table-column
                    prop="name"
                    align="center"
                    label="类型名称">
            </el-table-column>
            <el-table-column
                    prop="status"
                    align="center"
                    label="状态">
                <template slot-scope="scope">
                    {{scope.row.status === 1?'已启用':'已停用'}}
                </template>
            </el-table-column>
<!--            <el-table-column-->
<!--                    prop="no"-->
<!--                    align="center"-->
<!--                    label="编号">-->
<!--            </el-table-column>-->
            <el-table-column
                    prop="class_name"
                    align="center"
                    label="类别">
            </el-table-column>
            <el-table-column
                    prop="create_date"
                    align="center"
                    label="添加时间">
            </el-table-column>
            <el-table-column
                    prop="status_change_time"
                    align="center"
                    label="状态变更时间">
            </el-table-column>
            <el-table-column
                    prop="create_account_name"
                    align="center"
                    label="添加人">
            </el-table-column>
            <el-table-column
                    align="center"
                    label="编辑">
                <template slot-scope="scope">
                    <el-button @click="editClick(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button @click="statusClick(scope.row)" type="text" size="small">{{scope.row.status === 1?'停用':'启用'}}</el-button>

                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                background
                layout="total, prev, pager, next"
                :page-size="pageSize"
                :total="total"
                @current-change="handleCurrentChange">
        </el-pagination>

        <!--弹出层-->
        <el-dialog :title="dialogText" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">

            <div class="form-box percent-70" v-loading="formLoading">
                <el-form ref="form" :model="formData" :rules="rules" label-width="120px" size="small">
                    <el-form-item label="服务类型名称" prop="name">
                        <el-input v-model="formData.name"></el-input>
                    </el-form-item>
                    <el-form-item label="所属类别" prop="class_id">
                        <el-select v-model="formData.class_id" placeholder="请选择所属类别"  style="width: 100%">
                            <el-option
                                    v-for="item in classList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
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
        name: "ServiceType",
        components: {},
        data(){
            return {
                dataLoading: false,
                formLoading: false,
                dialogVisible: false,
                isAdd: false,
                currentId: '',
                dialogText: '',
                tableData: [],

                // 提交表单信息
                formData: {
                    name: '',
                    class_id: '',
                    create_account: JSON.parse(localStorage.getItem('Auth')).personalId
                },
                classList: [],
                // 验证规则
                rules: {
                    name: [
                        { required: true, message: '请输入服务类型名称', trigger: 'blur' }
                    ],
                    class_id: [
                        { required: true, message: '请选择服务类型', trigger: 'change' },
                    ]
                },

                // 列表和分页获取相关
                currPage: 1,
                pageSize: 10,
                order: 'DESC',
                total: 0
            }
        },
        mounted:function(){
            this.$nextTick(function(){
                this.getDataList()
            })
        },
        methods: {

            // 获取服务类别
            getClassList(){
                return this.axios({
                    method: 'GET',
                    url: '/service_info/class/list'
                })
            },

            // 新增dialog
            async addService(){
                this.dialogVisible = true;
                this.dialogText = '新增服务类型';
                this.formLoading = true;
                this.isAdd = true;

                let res = await this.getClassList();
                this.classList = res['dataList'];

                this.formLoading = false;
            },
            handleClose(){
                this.dialogVisible = false;
                this.$refs['form'].resetFields();
            },

            // 编辑修改dialog
            async editClick(row){
                this.dialogVisible = true;
                this.dialogText = '修改服务类型';
                this.formLoading = true;
                this.isAdd = false;

                let res = await this.getClassList();
                this.classList = res['dataList'];

                this.formData.name = row.name;
                this.formData.class_id = row.class_id;
                this.currentId = row.id;

                this.formLoading = false;
            },
            // 停用或启用
            statusClick(row){
                let statusText = row.status === 1 ?'停用':'启用';
                this.$confirm('确认要'+statusText+'此项服务类型吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.dataLoading = true;
                    this.axios({
                        method: 'PUT',
                        url: '/service_info/type',
                        data: {
                            id: row.id,
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
                        message: '已取消'
                    });
                });
            },

            // dialog 提交
            formSubmit(){
                this.$refs['form'].validate( valid => {
                    if(valid){
                        let method = this.isAdd?'POST':'PUT';
                        this.formLoading = true;
                        this.axios({
                            method: method,
                            url: '/service_info/type',
                            data: this.isAdd?this.formData:{...this.formData, id: this.currentId}
                        }).then(res => {
                            this.formLoading = false;

                            if(res.code === 'success'){
                                this.$message({
                                    type: 'success',
                                    message: (this.isAdd?'新增':'修改') + '服务类型成功！'
                                })
                                this.$refs['form'].resetFields();
                                this.dialogVisible = false;
                                this.getDataList();
                            } else {
                                this.$message({
                                    type: 'warning',
                                    message: (this.isAdd?'新增':'修改') + '服务类型失败！' + (res.errorMsg||'')
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

            getDataList(){
                this.dataLoading = true;
                this.axios({
                    method: 'GET',
                    url: '/service_info/type',
                    params: {
                        currPage: this.currPage,
                        pageSize: this.pageSize,
                        order: this.order,
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
