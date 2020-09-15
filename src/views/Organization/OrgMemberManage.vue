<template>
    <div v-loading="dataLoading">
        <ptitle title="会员管理"></ptitle>

        <el-row style="padding-bottom: 10px;margin-bottom: 10px">
            <el-col :span="4">
                <el-input size="small" placeholder="请输入要搜索的内容" v-model="searchMsg"></el-input>
            </el-col>
            <el-col :span="4" style="margin-left: 10px">
                <el-button type="primary" size="small" @click="search">搜索</el-button>
                <el-button type="default" size="small" @click="searchAll">清空</el-button>
            </el-col>
        </el-row>

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
                    prop="disable_member_id"
                    align="center"
                    label="残疾证号">
            </el-table-column>
            <el-table-column
                    prop="service_count"
                    align="center"
                    label="服务次数">
            </el-table-column>
            <el-table-column
                    prop="consumption_integral"
                    align="center"
                    label="消费分值">
            </el-table-column>
            <el-table-column
                    prop="phone"
                    align="center"
                    label="联系电话">
            </el-table-column>

            <el-table-column
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
                @current-change="handleCurrentChange">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "OrgMemberManage",
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
                this.getDataList();
            });
        },
        methods: {

            // 查看详情
            detailClick(row){
                this.$router.push({ path: '/esc/org/6-2', query: { id: row.id }})
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
                    url: '/disabled/member/getListByBranchesId',
                    params: {
                        currPage: this.currPage,
                        pageSize: this.pageSize,
                        order: this.order,
                        search_msg: this.searchMsg,
                        branches_id: JSON.parse(localStorage.getItem('Auth')).id
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
