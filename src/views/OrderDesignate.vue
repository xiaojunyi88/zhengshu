<template>
    <div v-loading="dataLoading">

        <ptitle title="订单派工"></ptitle>

        <el-row style="padding-bottom: 10px;margin-bottom: 10px">
            <el-col :span="4">
                <el-input size="small" placeholder="请输入要搜索的内容" v-model="searchMsg"></el-input>
            </el-col>
            <el-col :span="3" style="margin-left: 10px;">
                <el-select size="small" v-model="searchState" style="width: 100%;" placeholder="请选择">
                    <el-option
                            v-for="item in statusOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4" style="margin-left: 10px">
                <el-button type="primary" size="small" @click="search">搜索</el-button>
                <el-button type="default" size="small" @click="searchAll">清空</el-button>
            </el-col>
        </el-row>

        <!--列表-->
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column
                    type="index"
                    align="center"
                    width="50">
            </el-table-column>
            <el-table-column
                    prop="order_id"
                    align="center"
                    label="订单编号">
            </el-table-column>
            <el-table-column
                    prop="name"
                    align="center"
                    label="姓名">
            </el-table-column>
            <el-table-column
                    prop="disable_member_id"
                    align="center"
                    label="残疾证号">
            </el-table-column>
            <el-table-column
                    prop="service_type_name"
                    align="center"
                    label="服务类型">
            </el-table-column>
            <el-table-column
                    prop="service_item_name"
                    align="center"
                    label="服务项目">
            </el-table-column>
            <el-table-column
                    prop="status"
                    align="center"
                    label="状态">
                <template slot-scope="scope">
                    <span v-if="scope.row.status === 0">待分配</span>
                    <span v-if="scope.row.status === 1">已派单</span>
                    <span v-if="scope.row.status === 2">待服务</span>
                    <span v-if="scope.row.status === 3">服务中</span>
                    <span v-if="scope.row.status === 4">已完成</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="service_assigns_time"
                    align="center"
                    label="派单时间">
                <template slot-scope="scope">
                    <span v-if="scope.row.service_assigns_time">{{scope.row.service_assigns_time}}</span>
                    <span v-else>暂未派单</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="name"
                    align="center"
                    label="派单">
                <template slot-scope="scope">
                    <el-button v-if="scope.row.status === 0" @click="designateClick(scope.row)" type="text" size="small">派单</el-button>
                    <span v-if="scope.row.status === 1">已派单</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="name"
                    align="center"
                    label="查看">
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
        <el-dialog :title="'派单'" :visible.sync="dialogVisible" width="70%" :before-close="handleClose">

            <div class="form-box" v-loading="formLoading">
                <el-form ref="form" :model="formData" :rules="rules" label-width="100px" size="small">
                    <p>客户信息</p>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="订单编号:">
                                {{customerData.order_id}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="客户姓名:">
                                {{customerData.name}}
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="残疾证号:">
                                {{customerData.disable_member_id}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="地址:">
                                {{customerData.addr}}
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="服务项目:">
                                {{customerData.service_item_name}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="紧急程度:">
                                <span v-if="customerData.urgency === '0'">普通</span>
                                <span v-if="customerData.urgency === '1'">一般</span>
                                <span v-if="customerData.urgency === '2'">急迫</span>
                                <span v-if="customerData.urgency === '3'">紧急</span>

                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="服务日期:">
                                {{customerData.begin_time}}至{{customerData.end_time}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="创建人:">
                                {{customerData.create_account}}
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="创建时间:">
                                {{customerData.create_time}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="备注:">
                                {{customerData.comment}}
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <p>机构列表</p>
                    <el-table :data="branchList"
                              res="singleTable"
                              border
                              style="width: 100%">
                        <el-table-column
                                type="index"
                                align="center"
                                width="50">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                align="center"
                                label="机构名称">
                        </el-table-column>
<!--                        <el-table-column-->
<!--                                prop="name"-->
<!--                                align="center"-->
<!--                                label="历史服务总次数">-->
<!--                        </el-table-column>-->
                        <el-table-column
                                prop="addr"
                                align="center"
                                label="办公地址">
                        </el-table-column>
                        <el-table-column
                                prop="serviceCount"
                                align="center"
                                label="服务次数">
                        </el-table-column>
<!--                        <el-table-column-->
<!--                                prop="addr"-->
<!--                                align="center"-->
<!--                                label="目前状态">-->
<!--                        </el-table-column>-->
                        <el-table-column
                                prop="leader"
                                align="center"
                                label="负责人">
                        </el-table-column>
                        <el-table-column
                                prop="contactsPhone"
                                align="center"
                                label="联系电话">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                label="操作">
                            <template slot-scope="scope">
                                <el-button type="text" @click="formSubmit(scope.row)">派单</el-button>
                            </template>
                        </el-table-column>
                    </el-table>

                    <!--分页-->
                    <el-pagination
                            background
                            layout="total, prev, pager, next"
                            :page-size="dialogPageSize"
                            :total="dialogTotal"
                            @current-change="diglogHandleCurrentChange">
                    </el-pagination>


<!--                    <el-form-item label="服务机构" prop="branch_id">-->
<!--                        <el-select v-model="formData.branch_id" placeholder="请选择服务机构"  style="width: 100%">-->
<!--                            <el-option-->
<!--                                    v-for="item in branchList"-->
<!--                                    :key="item.id"-->
<!--                                    :label="item.name"-->
<!--                                    :value="item.id">-->
<!--                            </el-option>-->
<!--                        </el-select>-->
<!--                    </el-form-item>-->
                </el-form>
<!--                <span slot="footer" class="dialog-footer" style="margin-top: 20px">-->
<!--                    <el-button size="small" @click="handleClose">取消</el-button>-->
<!--                    <el-button size="small" type="primary" @click="formSubmit">提交</el-button>-->
<!--                </span>-->
            </div>

        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "OrderDesignate",
        data(){
            return {
                dataLoading: false,
                dialogVisible: false,
                formLoading: false,
                tableData: [],
                customerData: '',

                // 提交表单信息
                formData: {
                    service_people_id: JSON.parse(localStorage.getItem('Auth'))['personalId'],
                    branches_id: '',
                    id: '',
                    status: 1
                },
                branchList: [],
                rules: {
                    branches_id: [
                        {required: true, message: '请选择服务机构', trigger: 'change'}
                    ]
                },

                // 检索的相关字段
                searchMsg: '',
                searchState: '',
                statusOptions: [
                    {
                        label: '待分配',
                        value: 0
                    },
                    {
                        label: '待派单',
                        value: 1
                    },
                    {
                        label: '待服务',
                        value: 2
                    },
                    {
                        label: '服务中',
                        value: 3
                    },
                    {
                        label: '已完成',
                        value: 4
                    },
                ],

                // 列表和分页获取相关
                currPage: 1,
                pageSize: 10,
                order: 'DESC',
                total: 0,

                // 列表和分页获取相关
                dialogCurrPage: 1,
                dialogPageSize: 10,
                dialogOrder: 'DESC',
                dialogTotal: 0,
                curr_service_item_id: ''
            }
        },
        mounted: function(){
            this.$nextTick(function(){
                this.getDataList();
            })
        },
        methods: {

            // 获取客户信息
            getCustomerData(id){
                return this.axios({
                    method: 'GET',
                    url: '/service_info/order/info',
                    params: {
                        id: id
                    }
                })
            },

            // 派单
            async designateClick(row) {
                this.formLoading = true;
                this.dialogVisible = true;
                this.formData.id = row.id;
                this.curr_service_item_id = row.service_item_id;
                // 获取客户信息
                let customerRes = await this.getCustomerData(row.id);
                this.customerData = customerRes['data'];

                let res = await this.axios({
                    method: 'GET',
                    url: '/branches/service/item/getBranchesByItemId',
                    params: {
                        currPage: this.dialogCurrPage,
                        pageSize: this.dialogPageSize,
                        order: this.dialogOrder,
                        itemId: row.service_item_id
                    }
                })

                this.branchList = res['dataList'];
                this.dialogTotal = res['total'];
                this.formLoading = false;

            },
            editClick(){

            },
            detailClick(row){
                this.$router.push({path: '/esc/center/2/2-2/2-2-1', query: {id: row.id}});
            },

            handleClose(){
                this.dialogVisible = false;
                this.$refs['form'].resetFields();
            },

            handleTableCurrentChange(row){
                this.formData.branches_id = row?row.id:'';
            },
            formSubmit(row){
                this.$confirm('确定要向该服务机构派单吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.formData.branches_id = row?row.id:'';
                    this.formLoading = true;
                    this.axios({
                        method: 'PUT',
                        url: '/service_info/order',
                        data: this.formData
                    }).then(res => {
                        this.formLoading = false;
                        if(res.code === 'success'){
                            this.$message({
                                type: 'success',
                                message: '订单派工成功！'
                            })
                            this.dialogVisible = false;
                            this.$refs['form'].resetFields();
                            this.getDataList();
                        } else {
                            this.$message({
                                type: 'warning',
                                message: '订单派工失败！'
                            })
                        }
                        this.formData.branches_id = '';
                    }).catch(e => {
                        this.$message({
                            type: 'warning',
                            message: e
                        })
                        this.formLoading = false;
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消派单'
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
                this.searchState = '';

                this.getDataList();
            },

            // 获取列表数据
            getDataList(){
                this.dataLoading = true;
                this.axios({
                    method: 'GET',
                    url: '/service_info/orders',
                    params: {
                        currPage: this.currPage,
                        pageSize: this.pageSize,
                        order: this.order,
                        status: this.searchState,
                        search_msg: this.searchMsg
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
            },

            async diglogHandleCurrentChange(val){
                this.dialogCurrPage = val;
                let res = await this.axios({
                    method: 'GET',
                    url: '/branches/service/item/getBranchesByItemId',
                    params: {
                        currPage: this.dialogCurrPage,
                        pageSize: this.dialogPageSize,
                        order: this.dialogOrder,
                        itemId: this.curr_service_item_id
                    }
                })

                this.branchList = res['dataList'];
                this.dialogTotal = res['total'];
            }
        }
    }
</script>

<style scoped>

</style>
