<template>
    <div v-loading="dataLoading">

        <el-row style="padding-bottom: 10px;margin-bottom: 10px">
            <el-col :span="4">
                <el-input size="small" placeholder="请输入要搜索的内容" v-model="searchMsg"></el-input>
            </el-col>
            <el-col :span="4" style="margin-left: 10px;">
                <el-select size="small" v-model="searchOrg" style="width: 100%;" placeholder="请选择机构">
                    <el-option
                            v-for="item in orgOptions"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4" style="margin-left: 10px;">
                <el-cascader
                        style="width: 100%"
                        size="small"
                        v-model="searchGroup"
                        :options="groupOptions"
                        :props="{ expandTrigger: 'hover' , multiple: true, value: 'id', label: 'name'}"
                        collapse-tags
                        clearable
                        placeholder="请选择服务"
                        @change="handleCascaderChange">
                </el-cascader>
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
                    prop="no"
                    align="center"
                    label="活动编号">
            </el-table-column>
            <el-table-column
                    :width="160"
                    prop="order_id"
                    align="center"
                    label="活动起止时间">
                <template slot-scope="scope">
                    {{scope.row.service_begin_time}}<br />{{scope.row.service_end_time}}
                </template>
            </el-table-column>
            <el-table-column
                    prop="plan_number"
                    align="center"
                    label="活动人数">
            </el-table-column>
            <el-table-column
                    prop="branches_name"
                    align="center"
                    label="服务机构">
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
        name: "ServiceRecordActivity",
        data(){
            return {
                dataLoading: false,
                tableData: [],

                // 检索的相关字段
                searchMsg: '',
                searchOrg: '',
                searchGroup: [],
                orgOptions: [],
                groupOptions: [],

                // 列表和分页获取相关
                currPage: 1,
                pageSize: 10,
                order: 'DESC',
                total: 0
            }
        },
        mounted:function(){
            this.$nextTick(async function(){
                this.getDataList();

                // 服务机构下拉
                let branchRes = await this.getBranchesList();
                this.orgOptions = branchRes['dataList'];
                // 类型和项目
                let groupRes = await this.getServiceItemList();
                this.groupOptions = groupRes['dataList'];
            })
        },
        methods: {

            // 获取机构列表 下拉用
            getBranchesList(){
                return this.axios({
                    method: 'GET',
                    url: '/service/branches/info/getListSelectUse'
                })
            },

            // 获取可提供的服务项目
            getServiceItemList(){
                return  this.axios({
                    method: 'GET',
                    url: '/service_info/type/group'
                });
            },

            // 查看详情
            detailClick(row){
                this.$router.push({ path: '/esc/center/4-2', query: { id: row.id , type: row.type}})
            },

            handleCascaderChange(){

            },

            // 检索
            search(){
                this.currPage = 1;
                this.getDataList();
            },

            // 清空搜索
            searchAll(){
                this.currPage = 1;

                this.searchOrg = '';
                this.searchMsg = '';
                this.searchGroup =  [];

                this.getDataList();
            },

            getDataList(){
                this.dataLoading = true;
                this.axios({
                    method: 'GET',
                    url: '/activities/record/list',
                    params: {
                        currPage: this.currPage,
                        pageSize: this.pageSize,
                        order: this.order,
                        search_org: this.searchOrg,
                        search_msg: this.searchMsg,
                        search_group: this.searchGroup
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
