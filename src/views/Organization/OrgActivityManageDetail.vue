<template>
    <div v-loading="dataLoading">
        <ptitle title="活动详情"></ptitle>
        <el-form ref="form" :model="data" label-width="120px" size="small" :label-position="'left'" style="padding: 0 120px;">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="活动名称:">
                        {{data.service_item_name}}
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="类型:">
                        {{data.service_type_name}}
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="服务机构:">
                        {{data.branches_name}}
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="计划参与人数:">
                        {{data.plan_number}}
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="计划活动时间:">
                        {{data.plan_begin_time}}至{{data.plan_end_time}}
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="活动地点:">
                        {{data.addr}}
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="发起人:">
                        {{data.initiator_name}}
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="活动发起时间:">
                        {{data.create_time}}
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="备注:">
                        {{data.remark}}
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "OrgActivityManageDetail",
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

            getData(){
                this.dataLoading = true;
                this.axios({
                    method: 'GET',
                    url: '/activities/' + this.queryData.id + '/detail',
                    params: {
                        type: this.queryData.type
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
