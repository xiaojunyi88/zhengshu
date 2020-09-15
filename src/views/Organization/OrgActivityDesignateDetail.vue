<template>
    <div v-loading="dataLoading">
        <ptitle title="活动详情"></ptitle>

        <el-form ref="form" :model="data" label-width="120px" size="small" :label-position="'left'" style="padding: 0 120px;">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="活动名称:">
                        {{data.service_item_name}}
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="类型:">
                        {{data.service_type_name}}
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="服务机构:">
                        {{data.branches_name}}
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="计划参与人数:">
                        {{data.plan_number}}
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="计划活动时间:">
                        {{data.plan_begin_time}}至{{data.plan_end_time}}
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="活动地点:">
                        {{data.addr}}
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="发起人:">
                        {{data.initiator_name}}
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="活动发起时间:">
                        {{data.create_time}}
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12" >
                    <el-form-item label="备注:">
                        {{data.remark}}
                    </el-form-item>
                </el-col>
                <el-col :span="12" v-if="data.approval_people_name">
                    <el-form-item label="审批人:">
                        {{data.approval_people_name}}
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12" v-if="data.approval_time">
                    <el-form-item label="审批时间:">
                        {{data.approval_time}}
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

        <ptitle title="选择接单员"></ptitle>

        <el-table :data="orderClerkDataList" res="singleTable"
                  border>
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
                    prop="name"
                    align="center"
                    label="服务次数">
            </el-table-column>
            <el-table-column
                    prop="mobile"
                    align="center"
                    label="联系电话">
            </el-table-column>
            <el-table-column
                    prop="address"
                    align="center"
                    label="地址">
            </el-table-column>
            <el-table-column
                    align="center"
                    label="派单">
                <template slot-scope="scope">
                    <el-button @click="handleTableCurrentChange(scope.row)" type="text" size="small">派单</el-button>
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

    </div>
</template>

<script>
    export default {
        name: "OrgActivityDesignateDetail",
        data(){
            return {
                dataLoading: false,
                queryData: this.$route.query,

                // 接单员列表
                orderClerkDataList: [],
                // 活动基本信息
                data: {
                    addr: "",
                    remark: "",
                    branches_name: "",
                    service_item_name: "",
                    create_time: "",
                    id: "",
                    initiator_name: "",
                    plan_begin_time: "",
                    plan_end_time: "",
                    plan_number: "",
                    service_type_name: "",
                    status: "",
                    type: "",
                    approval_people_name: "",
                    approval_time: ""
                },

                // 列表和分页获取相关(本页因接口信息没有根据id获取，暂用老接口 带分页)
                currPage: 1,
                pageSize: 10,
                order: 'DESC',
                total: 0
            }
        },
        mounted:function(){
            this.$nextTick(function(){
                this.getData();
            });
        },
        methods: {

            handleTableCurrentChange(row){
                if(this.data.status !== '2'){
                    this.$message({
                        type: 'warning',
                        message: '该活动状态不可派单！'
                    })
                    return false;
                }
                this.$confirm('确定要该员工接单吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.dataLoading = true;

                    this.axios({
                        method: 'PUT',
                        url: '/activities/detail',
                        data: {
                            branches_executor_id: row.id,
                            activity_id: this.data.id,
                            status: 3
                        }
                    }).then(res => {
                      if(res.code === 'success'){
                          this.$message({
                              type: 'success',
                              message: '活动派单成功!'
                          });
                          this.getData();
                      } else {
                          this.$message({
                              type: 'warning',
                              message: '活动派单失败!'
                          });
                      }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消活动派单'
                    });
                });
            },


            // 获取接单员
            getOrderClerkList(){
                return this.axios({
                    method: 'GET',
                    url: '/branches/service/person/getEffectList',
                    params: {
                        currPage: this.currPage,
                        pageSize: this.pageSize,
                        order: 'DESC',
                        branchId: JSON.parse(localStorage.getItem('Auth'))['id']                    }
                })
            },

            // 获取活动详情
            getData(){
                this.dataLoading = true;
                this.axios({
                    method: 'GET',
                    url: '/activities/'+this.queryData.id+'/detail',
                    params: {
                        type: this.queryData.type
                    }
                }).then( async res => {

                    let OrderClerkRes = await this.getOrderClerkList();
                    this.orderClerkDataList = OrderClerkRes['dataList'];
                    this.total = OrderClerkRes['total'];

                    this.dataLoading = false;
                    if(res.code === "single"){
                        this.data = res.data;
                    } else {
                        this.$message({
                            type: 'warning',
                            message: '信息获取失败'
                        })
                    }
                }).catch(e => {
                    this.$message({
                        type: 'warning',
                        message: e
                    })
                })
            },

            // 获取接单员分页
            async handleCurrentChange(val){
                this.currPage = val;
                let OrderClerkRes = await this.getOrderClerkList();
                this.orderClerkDataList = OrderClerkRes['dataList'];
            }
        }
    }
</script>

<style scoped>

</style>
