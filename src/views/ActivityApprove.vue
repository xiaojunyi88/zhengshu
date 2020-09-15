<template>
    <div v-loading="dataLoading">
        <ptitle title="活动审批"></ptitle>
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
                    prop="branches_name"
                    align="center"
                    label="申请机构">
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
    </div>
</template>

<script>
    export default {
        name: "ActivityApprove",
        data(){
            return {
                dataLoading: false,

                tableData: [],

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
            });
        },
        methods: {

            detailClick(row){
                this.$router.push({path: '/esc/center/5/5-2/5-2-1', query: { id: row.id, type: row.type }})
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
                        type: 1
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
