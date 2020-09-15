<template>
    <div v-loading="dataLoading">
        <ptitle title="其他需求"></ptitle>

        <!--列表-->
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column
                    type="index"
                    align="center"
                    width="50">
            </el-table-column>
            <el-table-column
                    prop="name"
                    align="center"
                    label="姓名">
            </el-table-column>
            <el-table-column
                    prop="contacts_phone"
                    align="center"
                    label="类型">
                <template slot-scope="scope">
                    <span v-if="scope.row.type === 0">无效</span>
                    <span v-if="scope.row.type === 1">有效</span>
                </template>
            </el-table-column>
<!--            <el-table-column-->
<!--                    prop="order_status"-->
<!--                    align="center"-->
<!--                    label="状态">-->
<!--                <template slot-scope="scope">-->
<!--                    <span v-if="scope.row.order_status === 0">待分配</span>-->
<!--                    <span v-if="scope.row.order_status === 1">待派单</span>-->
<!--                    <span v-if="scope.row.order_status === 2">待服务</span>-->
<!--                    <span v-if="scope.row.order_status === 3">服务中</span>-->
<!--                    <span v-if="scope.row.order_status === 4">已完成</span>-->
<!--                </template>-->
<!--            </el-table-column>-->
<!--            <el-table-column-->
<!--                    prop="service_item_name"-->
<!--                    align="center"-->
<!--                    label="服务项目">-->
<!--            </el-table-column>-->
            <el-table-column
                    prop="service_people_name"
                    align="center"
                    label="经办人">
            </el-table-column>
            <el-table-column
                    prop="create_time"
                    align="center"
                    label="来电时间">
            </el-table-column>
            <el-table-column
                    prop="comment"
                    align="center"
                    label="备注">
            </el-table-column>
            <el-table-column
                    prop="name"
                    align="center"
                    label="查看详情">
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
                :current-page="currPage"
                @current-change="handleCurrentChange">
        </el-pagination>

    </div>
</template>

<script>
    export default {
        name: "OrtherRequest",
        data(){
            return {
                dataLoading: false,
                tableData: [],

                // 列表和分页获取相关
                currPage: 1,
                pageSize: 10,
                order: 'DESC',
                total: 0,
            }
        },
        mounted:function(){
            this.$nextTick(function(){
                this.getDataList();
            })
        },
        methods: {

            detailClick(row){
                this.$router.push({path: '/esc/center/2/2-3/2-3-1', query: {id: row.id}})
            },

            getDataList(){
                this.dataLoading = true;
                this.axios({
                    method: 'GET',
                    url: '/service_info/call/records',
                    params: {
                        currPage: this.currPage,
                        pageSize: this.pageSize,
                        order: this.order,
                        type: 0
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
