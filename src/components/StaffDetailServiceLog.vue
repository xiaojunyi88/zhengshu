<template>
    <div v-loading="dataLoading">
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column
                    type="index"
                    align="center"
                    width="50">
            </el-table-column>
            <el-table-column
                    prop="create_time"
                    align="center"
                    label="来电时间">
            </el-table-column>
            <el-table-column
                    prop="service_item_name"
                    align="center"
                    label="服务内容">
            </el-table-column>
            <el-table-column
                    prop="service_people_name"
                    align="center"
                    label="记录人">
            </el-table-column>
            <el-table-column
                    align="center"
                    label="服务状态">
                <template slot-scope="scope">
                    <span v-if="scope.row.order_status === 0">待分配</span>
                    <span v-if="scope.row.order_status === 1">已派单</span>
                    <span v-if="scope.row.order_status === 2">待服务</span>
                    <span v-if="scope.row.order_status === 3">服务中</span>
                    <span v-if="scope.row.order_status === 4">已完成</span>
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
        name: "StaffDetailServiceLog",
        props: ['id'],
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
        watch: {
            id(){
                this.getDataList();
            }
        },
        methods: {
            // 根据残疾人号获取服务记录
            async getDataList(){
                this.dataLoading = true;

                let res = await this.axios({
                    method: "GET",
                    url: "/service_info/" + this.id + "/call/records",
                    params: {
                        currPage: this.currPage,
                        pageSize: this.pageSize,
                        order: this.order,
                    }
                })

                this.tableData = res['dataList'];
                this.total =res['total'];

                this.dataLoading = false;

            },


            handleCurrentChange(val){
                this.currPage = val;
                this.getDataList();
            },
        }
    }
</script>

<style scoped>

</style>
