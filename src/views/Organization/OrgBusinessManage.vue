<template>
    <div v-loading="dataLoading">
        <ptitle title="业务管理"></ptitle>

        <el-table :data="tableData" border style="width: 100%;">
            <el-table-column
                    type="index"
                    align="center"
                    width="50">
            </el-table-column>
            <el-table-column
                    prop="name"
                    align="center"
                    label="服务项目">
            </el-table-column>
            <el-table-column
                    prop="class_name"
                    align="center"
                    label="服务类别">
            </el-table-column>
            <el-table-column
                    prop="type_name"
                    align="center"
                    label="服务类型">
            </el-table-column>
            <el-table-column
                    prop="integral"
                    align="center"
                    label="分值">
            </el-table-column>
            <el-table-column
                    prop="unit"
                    align="center"
                    label="单位">
            </el-table-column>
            <el-table-column
                    prop="create_account_name"
                    align="center"
                    label="创建人">
            </el-table-column>
            <el-table-column
                    prop="status"
                    align="center"
                    label="状态">
                <template  slot-scope="scope">
                    {{scope.row.status === 1?'开启':'关闭'}}
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
        name: "OrgBusinessManage",
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
            })
        },
        methods: {

            getDataList(){
                this.dataLoading = true;
                this.axios({
                    method: 'GET',
                    url: '/service_info/item',
                    params: {
                        currPage: this.currPage,
                        pageSize: this.pageSize,
                        order: this.order,
                        branches_id: JSON.parse(localStorage.getItem('Auth')).id,
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
