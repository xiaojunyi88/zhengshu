<template>
    <div v-loading="dataLoading">
        <ptitle title="业绩统计"></ptitle>

        <el-table :data="tableData" border style="width: 100%">
            <el-table-column
                    type="index"
                    align="center"
                    width="50">
            </el-table-column>
            <el-table-column
                    prop="settlement_date"
                    align="center"
                    label="月份">
            </el-table-column>
            <el-table-column
                    prop="branches_no"
                    align="center"
                    label="机构编号">
            </el-table-column>
            <el-table-column
                    prop="no_settled_sum"
                    align="center"
                    label="未结算">
            </el-table-column>
            <el-table-column
                    prop="settled_sum"
                    align="center"
                    label="已结算">
            </el-table-column>
            <el-table-column
                    prop="service_count"
                    align="center"
                    label="次数">
            </el-table-column>

<!--            <el-table-column-->
<!--                    align="center"-->
<!--                    label="查看详情">-->
<!--                <template slot-scope="scope">-->
<!--                    <el-button @click="detailClick(scope.row)" type="text" size="small">查看详情</el-button>-->
<!--                </template>-->
<!--            </el-table-column>-->
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
        name: "OrgBusinessStatistic",
        data(){
            return {
                dataLoading: false,
                tableData: [],

                // 检索的相关字段
                searchMonth: '',

                // 列表和分页获取相关
                currPage: 1,
                pageSize: 10,
                order: 'DESC',
                total: 0
            }
        },
        mounted:function(){
            this.$nextTick(function(){
                this.getDataList();
            });
        },
        methods: {

            getDataList(){
                this.dataLoading = true;
                this.axios({
                    method: 'GET',
                    url: 'settlements/'+JSON.parse(localStorage.getItem('Auth')).id,
                    params: {
                        currPage: this.currPage,
                        pageSize: this.pageSize,
                        order: this.order,
                        search_month: '',
                    }
                }).then(res => {
                    this.dataLoading = false;
                    if(res.code === 'list'){
                        this.tableData = res['dataList'];
                        this.total = res.total;
                    } else {
                        this.$message({
                            type: 'warning',
                            message: '数据获取失败'
                        })
                    }
                })
            },
            // 分页
            handleCurrentChange(val){
                this.currPage = val;
                this.getDataList();
            }

        }
    }
</script>

<style scoped>

</style>
