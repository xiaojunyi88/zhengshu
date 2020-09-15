<!--服务项目-->
<template>
    <div v-loading="dataLoading">
        <ptitle title="服务项目列表">
            <el-button @click="addService()" size="small" type="primary">新增服务项目</el-button>
        </ptitle>

        <el-table :data="tableData" border style="width: 100%">
            <el-table-column
                    type="index"
                    align="center"
                    width="50">
            </el-table-column>
            <el-table-column
                    prop="name"
                    align="center"
                    label="服务项目名称">
            </el-table-column>
            <el-table-column
                    prop="class_name"
                    align="center"
                    label="项目类别">
            </el-table-column>
            <el-table-column
                    prop="type_name"
                    align="center"
                    label="项目类型">
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
                    prop="integral"
                    align="center"
                    label="服务单价">
            </el-table-column>
            <el-table-column
                    prop="content"
                    align="center"
                    label="服务内容">
            </el-table-column>
            <el-table-column
                    prop="min_hours"
                    align="center"
                    label="最低服务时长(分钟)">
            </el-table-column>
            <el-table-column
                    prop="unit"
                    align="center"
                    label="单位">
            </el-table-column>
            <el-table-column
                    prop="create_date"
                    align="center"
                    label="添加时间">
            </el-table-column>
            <el-table-column
                    prop="create_account_name"
                    align="center"
                    label="添加人">
            </el-table-column>
            <el-table-column
                    prop="name"
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
                    <el-form-item label="服务项目名称" prop="name">
                        <el-input v-model="formData.name"></el-input>
                    </el-form-item>
                    <el-form-item label="所属类型" prop="type_id">
                        <el-select v-model="formData.type_id" placeholder="请选择所属类型"  style="width: 100%">
                            <el-option
                                    v-for="item in typeList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="服务项目积分" prop="integral">
                        <el-input v-model.number="formData.integral"></el-input>
                    </el-form-item>
                    <el-form-item label="最低服务时长" prop="min_hours">
                        <el-input v-model.number="formData.min_hours"></el-input>
                    </el-form-item>
                    <el-form-item label="单位" prop="unit">
                        <el-input v-model="formData.unit"></el-input>
                    </el-form-item>
                    <el-form-item label="服务内容" prop="content">
                        <el-input v-model="formData.content"></el-input>
                    </el-form-item>
                    <el-form-item label="服务区域" prop="area">
                        <el-input v-model="formData.area"></el-input>
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
        name: "ServiceItem",
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
                    type_id: '',
                    integral: '',
                    content: '',
                    min_hours: '',
                    unit: '',
                    area: '',
                    create_account: JSON.parse(localStorage.getItem('Auth')).personalId
                },
                typeList: [],
                // 验证规则
                rules: {
                    name: [
                        { required: true, message: '请输入项目名称', trigger: 'blur' }
                    ],
                    type_id: [
                        { required: true, message: '请选择所属类型', trigger: 'change' }
                    ],
                    integral: [
                        { required: true, message: '请输入服务项目积分', trigger: 'blur' }
                    ],
                    min_hours: [
                        { required: true, message: '请输入最低服务时长', trigger: 'blur' }
                    ],
                    unit: [
                        { required: true, message: '请输入单位', trigger: 'blur' }
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

            getTypeList(){
                return this.axios({
                    method: 'GET',
                    url: '/service_info/type/list'
                })
            },

            // 新增dialog
            async addService(){
                this.dialogVisible = true;
                this.dialogText = '新增服务项目';
                this.formLoading = true;
                this.isAdd = true;

                let res = await this.getTypeList();
                this.typeList = res['dataList'];

                this.formLoading = false;

            },
            handleClose(){
                this.dialogVisible = false;
                this.$refs['form'].resetFields();
            },
            // 编辑修改dialog
            async editClick(row){
                this.dialogVisible = true;
                this.dialogText = '修改服务项目';
                this.formLoading = true;
                this.isAdd = false;

                let res = await this.getTypeList();
                this.typeList = res['dataList'];

                this.currentId = row.id;
                this.formData.name = row.name;
                this.formData.type_id = row.type_id;
                this.formData.integral = row.integral;
                this.formData.content = row.content;
                this.formData.min_hours = row.min_hours;
                this.formData.unit = row.unit;
                this.formData.area = row.area;

                this.formLoading = false;

            },
            // 停用或启用
            statusClick(row){
                let statusText = row.status === 1?'停用':'启用';
                this.$confirm('确认要'+statusText+'此项服务项目吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.dataLoading = true;

                    this.axios({
                        method: 'PUT',
                        url: '/service_info/item',
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
                        let method = this.isAdd?'POST':'PUT'
                        this.formLoading = true;
                        this.axios({
                            method: method,
                            url: '/service_info/item',
                            data: this.isAdd?this.formData:{...this.formData,id: this.currentId}
                        }).then(res => {
                            this.formLoading = false;

                            if(res.code === 'success'){
                                this.$message({
                                    type: 'success',
                                    message: (this.isAdd?'新增':'修改') + '服务项目成功！'
                                })
                                this.$refs['form'].resetFields();
                                this.dialogVisible = false;
                                this.getDataList();
                            } else {
                                this.$message({
                                    type: 'warning',
                                    message: (this.isAdd?'新增':'修改') + '服务项目失败！' + (res.errorMsg||'')
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
                    url: '/service_info/item',
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
