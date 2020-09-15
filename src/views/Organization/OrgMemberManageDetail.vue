<template>
    <div v-loading="dataLoading">
        <ptitle title="会员基本信息"></ptitle>
        <el-form ref="form" :model="data" label-width="120px" size="small" :label-position="'left'"  style="padding: 0 120px">
            <el-row>
                <el-col :span="12" >
                    <el-form-item label="姓名:">
                        {{data.name}}
                    </el-form-item>
                </el-col>
                <el-col :span="12" >
                    <el-form-item label="残疾证号:">
                        {{data.disable_member_id}}
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12" >
                    <el-form-item label="联系电话:">
                        {{data.phone}}
                    </el-form-item>
                </el-col>
                <el-col :span="12" >
                    <el-form-item label="服务次数:">
                        {{data.service_count}}
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12" >
                    <el-form-item label="订单数:">
                        {{data.orderCount}}
                    </el-form-item>
                </el-col>
                <el-col :span="12" >
                    <el-form-item label="活动数:">
                        {{data.activityCount}}
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12" >
                    <el-form-item label="消费分值:">
                        {{data.consumption_integral}}
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

        <ptitle title="会员订单信息"></ptitle>
        <el-table :data="data.orderInfoList" border style="width: 100%">
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
                    :width="160"
                    prop="order_id"
                    align="center"
                    label="服务起止时间">
                <template slot-scope="scope">
                    {{scope.row.service_begin_time}}<br />{{scope.row.service_end_time}}
                </template>
            </el-table-column>
            <el-table-column
                    prop="service_item_name"
                    align="center"
                    label="服务项目">
            </el-table-column>
            <el-table-column
                    prop="integral"
                    align="center"
                    label="分值">
            </el-table-column>
            <el-table-column
                    prop="name"
                    align="center"
                    label="查看">
                <template slot-scope="scope">
                    <el-button @click="orderDetailClick(scope.row)" type="text" size="small">查看详情</el-button>
                </template>
            </el-table-column>
        </el-table>

        <ptitle title="会员活动信息"></ptitle>
        <el-table :data="data.activityList" border style="width: 100%">
            <el-table-column
                    type="index"
                    align="center"
                    width="50">
            </el-table-column>
            <el-table-column
                    prop="order_id"
                    align="center"
                    label="活动编号">
            </el-table-column>
            <el-table-column
                    prop="service_item_name"
                    align="center"
                    label="活动名称">
            </el-table-column>
            <el-table-column
                    :width="160"
                    prop="order_id"
                    align="center"
                    label="服务起止时间">
                <template slot-scope="scope">
                    {{scope.row.service_begin_time}}<br />{{scope.row.service_end_time}}
                </template>
            </el-table-column>
            <el-table-column
                    prop="integral"
                    align="center"
                    label="分值">
            </el-table-column>
            <el-table-column
                    prop="name"
                    align="center"
                    label="查看">
                <template slot-scope="scope">
                    <el-button @click="activityDetailClick(scope.row)" type="text" size="small">查看详情</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "OrgMemberManageDetail",
        data(){
            return {
                dataLoading: false,
                data: {},
                queryData: this.$route.query
            }
        },
        mounted: function(){
            this.$nextTick(function(){
                this.getData();
            })
        },
        methods: {

            // 查看订单详情
            orderDetailClick(row){
                this.$router.push({path: '/esc/org/2-1', query: {id: row.id}})
            },

            // 查看活动详情
            activityDetailClick(row){
                this.$router.push({path: '/esc/org/3/3-1/3-1-1', query: {id: row.id, type: row.type}})
            },

            getData(){
                this.dataLoading = true;
                this.axios({
                    method: 'GET',
                    url: '/disabled/member/getByBranchesId',
                    params: {
                        id: this.queryData.id,
                        branches_id: JSON.parse(localStorage.getItem('Auth')).id
                    }
                }).then(res => {
                    this.data = res['data'];
                    this.dataLoading = false;

                })
            }
        }
    }
</script>

<style scoped>

</style>
