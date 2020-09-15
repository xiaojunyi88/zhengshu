<template>
    <div v-loading="dataLoading">
        <ptitle title="活动管理">
            <el-button @click="addActivity()" size="small" type="primary">新增活动</el-button>
        </ptitle>

        <el-table :data="tableData" border style="width: 100%;">
            <el-table-column
                    type="index"
                    align="center"
                    width="50">
            </el-table-column>
            <el-table-column
                    prop="no"
                    align="center"
                    label="活动编号">
            </el-table-column>
            <el-table-column
                    prop="service_item_name"
                    align="center"
                    label="活动名称">
            </el-table-column>
            <el-table-column
                    prop="service_type_name"
                    align="center"
                    label="类型">
            </el-table-column>
            <el-table-column
                    prop="plan_number"
                    align="center"
                    label="计划人数">
            </el-table-column>
            <el-table-column
                    prop="number"
                    align="center"
                    label="实际参加人数">
            </el-table-column>
            <el-table-column
                    prop="status"
                    align="center"
                    label="状态">
                <template slot-scope="scope">
                    <span v-if="scope.row.status === 0">待审批</span>
                    <span v-if="scope.row.status === 1">未通过</span>
                    <span v-if="scope.row.status === 2">待派单</span>
                    <span v-if="scope.row.status === 3">待开始</span>
                    <span v-if="scope.row.status === 4">进行中</span>
                    <span v-if="scope.row.status === 5">已完成</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="service_type_name"
                    align="center"
                    label="发起类型">
                <template slot-scope="scope">
                    <span v-if="scope.row.type === 0">中心委派</span>
                    <span v-if="scope.row.type === 1">机构申请</span>
                </template>
            </el-table-column>
            <el-table-column
                    align="center"
                    label="操作">
                <template slot-scope="scope">
                    <el-button @click="detailClick(scope.row)" type="text" size="small">查看详情</el-button>
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
        <el-dialog :title="dialogText" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">

            <div class="form-box percent-70" v-loading="formLoading">
                <el-form ref="form" :model="formData" :rules="rules" label-width="120px" size="small">
                    <el-form-item label="活动项目" prop="service_item_id">
                        <el-select v-model="formData.service_item_id" placeholder="请选择活动项目"  style="width: 100%" @change="itemChange">
                            <el-option
                                    v-for="item in itemList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="服务机构" prop="branches_id" ref="branches_id">
                        <el-select v-model="formData.branches_id" placeholder="请选择服务机构"  style="width: 100%" @change="orgChange">
                            <el-option
                                    v-for="item in orgList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="计划起止日期:" prop="plan_time">
                        <el-date-picker
                                style="width: 100%"
                                v-model="formData.plan_time"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                type="datetimerange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="地址" prop="addr" ref="addr">
                        <el-input v-model="formData.addr"></el-input>
                    </el-form-item>
                    <el-form-item label="计划参加人数" prop="plan_number">
                        <el-input v-model.number="formData.plan_number"></el-input>
                    </el-form-item>
                    <el-form-item label="备注:" prop="remark">
                        <el-input style="width: 100%" type="textarea" v-model="formData.remark"></el-input>
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
        name: "ActivityManage",
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
                itemList: [], // 可做活动项目列表
                orgList: [],
                formData: {
                    service_item_id: '',
                    branches_id: '',
                    plan_time: '',
                    plan_begin_time: '',
                    plan_end_time: '',
                    addr: '',
                    plan_number: '',
                    type: 0,
                    remark: '',
                    initiator: JSON.parse(localStorage.getItem('Auth')).personalId
                },
                // 验证规则
                rules: {
                    addr: [
                        { required: true, message: '请输入地址', trigger: 'blur' }
                    ],
                    plan_number: [
                        { required: true, message: '请输入计划人数', trigger: 'blur' },
                        { type: 'number', message: '人数必须为数字值', trigger: 'blur' }
                    ],
                    service_item_id: [
                        { required: true, message: '请选择活动项目', trigger: 'change' },
                    ],
                    branches_id: [
                        { required: true, message: '请选择服务机构', trigger: 'change' },
                    ],
                    plan_time: [
                        { required: true, message: '请选择服务机构', trigger: 'change' },
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

            async itemChange(id){
                this.formLoading = true;

                let OrgRes = await this.getOrgList(id);
                this.orgList = OrgRes['dataList'];

                this.$refs['branches_id'].resetField();
                this.$refs['addr'].resetField();

                this.formLoading = false;

                if(this.orgList.length === 0){
                    this.$message({
                        type: 'warning',
                        message: '该项目没有可提供服务的机构'
                    })
                }
            },

            // 新增活动 选择机构后 默认的活动地址为机构地址
            orgChange(id){
                this.formData.addr = this.orgList.filter(v => v.id === id)[0]['addr'];
            },

            // 获取活动列表
            getActivityList(){
              return this.axios({
                  method: 'GET',
                  url: '/service_info/activity/item',
              })
            },

            // 获取机构列表
            getOrgList(id){
                return this.axios({
                    method: 'GET',
                    url: '/branches/service/item/getBranchesByItemId', // 根据可做活动的类型id获取项目列表 测试用26 后续确定
                    params: {
                        itemId: id
                    }
                })
            },

            async addActivity(){
                this.dialogVisible = true;
                this.dialogText = '新增活动';
                this.formLoading = true;
                this.isAdd = true;

                // 获取可创建活动的项目 (只取出其中一个类型下的列表)
                let ActRes = await this.getActivityList();
                this.itemList = ActRes['dataList'];

                this.formLoading = false;

            },

            handleClose(){
                this.dialogVisible = false;
                this.$refs['form'].resetFields();
            },

            formSubmit(){
                this.$refs['form'].validate( valid => {
                    if(valid){
                        this.formLoading = true;

                        this.formData.plan_begin_time = this.formData.plan_time[0];
                        this.formData.plan_end_time = this.formData.plan_time[1];

                        this.axios({
                            method: 'POST',
                            url: '/activities',
                            data: this.formData
                        }).then(res => {
                            this.formLoading = false;
                            if(res.code === 'success'){
                                this.$message({
                                    type: 'success',
                                    message: '新增活动成功！'
                                });

                                this.$refs['form'].resetFields();
                                this.getDataList();

                            } else {
                                this.$message({
                                    type: 'warning',
                                    message: '新增活动失败！'
                                });
                            }

                            this.dialogVisible = false;
                        }).catch(e => {
                            this.$message({
                                type: 'warning',
                                message: e
                            });
                            this.dialogVisible = false;
                        })

                    } else {
                        return false;
                    }
                })
            },

            detailClick(row){
                this.$router.push({path: '/esc/center/5/5-1/5-1-1', query: { id: row.id, type: row.type}})
            },

            getDataList(){
                this.dataLoading = true;
                this.axios({
                    method: 'GET',
                    url: '/activities',
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
