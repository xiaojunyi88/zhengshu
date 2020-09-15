<template>
    <div v-loading="dataLoading">
        <ptitle title="活动派单"></ptitle>

        <el-row style="padding-bottom: 10px;margin-bottom: 10px">
            <el-col :span="4">
                <el-input size="small" placeholder="请输入要搜索的内容" v-model="searchMsg"></el-input>
            </el-col>
            <el-col :span="4" style="margin-left: 10px">
                <el-button type="primary" size="small" @click="search">搜索</el-button>
                <el-button type="default" size="small" @click="searchAll">清空</el-button>
            </el-col>
        </el-row>

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
    </div>
</template>

<script>
    export default {
        name: "OrgActivityDesignate",
        data(){
            return {
                dataLoading: false,

                tableData: [],

                // 检索的相关字段
                searchMsg: '',

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
            detailClick(row){
                this.$router.push({path: '/esc/org/3/3-2/3-2-1', query: {id: row.id, type: row.type}})
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

                this.getDataList();
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
                        branches_id: JSON.parse(localStorage.getItem('Auth')).id,
                        status: 2,
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
            }
        }
    }
</script>

<style scoped>

</style>
