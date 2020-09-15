<template>
    <div v-loading="dataLoading">
        <ptitle title="活动详情"></ptitle>
        <el-form ref="form" :model="data" label-width="120px" size="small" :label-position="'left'" style="padding: 0 120px">
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
                <el-col :span="12" v-if="data.approval_people_name" >
                    <el-form-item label="审批人:">
                        {{data.approval_people_name}}
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12" v-if="data.approval_time" >
                    <el-form-item label="审批时间:">
                        {{data.approval_time}}
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div v-if="!data.approval_people_name" style="display: flex; flex-direction: row; justify-content: center;margin-top: 30px">
            <el-button style="margin: 0 60px" type="primary" @click="approve(true)">通过</el-button>
            <el-button style="margin: 0 60px" type="danger" @click="approve(false)">不通过</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ActivityApproveDetail",
        data(){
            return {
                dataLoading: false,
                queryData: this.$route.query,
                data: {
                    addr: "",
                    remark: "",
                    branches_name: "",
                    service_item_name: "",
                    create_time: "",
                    id: "",
                    initiator_name: "",
                    plan_begin_time: "",
                    plan_end_time: "",
                    plan_number: "",
                    service_type_name: "",
                    status: "",
                    type: "",
                    approval_people_name: "",
                    approval_time: ""
                }
            }
        },
        mounted:function(){
            this.$nextTick(function(){
                this.getData();
            });
        },
        methods: {
            // 获取待审批活动数
            getApprove(){
                return this.axios({
                    method: 'GET',
                    url: '/activities/total?status=0'
                })
            },

            approve(isPass){
                this.dataLoading = true;
                this.axios({
                    method: 'PUT',
                    url: '/activities/approval',
                    data: {
                        id: this.data.id,
                        status: isPass?2:1,
                        approval_people_id: JSON.parse(localStorage.getItem('Auth')).personalId
                    }
                }).then(async res => {
                    if(res.code === 'success'){
                        // 不管通未通过 点击按钮后都重新获取待审核活动数
                        let NumRes = await this.getApprove();
                        if(NumRes.code === 'single'){
                            this.$store.commit('setApproveNumber', NumRes.total);
                        }
                        this.getData();

                        this.$message({
                            type: isPass?'success':'warning',
                            message: isPass?'审核通过':'审核未通过'
                        })
                    }
                })
                this.$store.commit('setApproveNumber', --this.$store.state.approveNumber);
            },

            getData(){
                this.dataLoading = true;
                this.axios({
                    method: 'GET',
                    url: '/activities/'+this.queryData.id+'/detail',
                    params: {
                        type: this.queryData.type
                    }
                }).then(res => {
                    this.dataLoading = false;
                    if(res.code === "single"){
                        this.data = res.data;
                    } else {
                        this.$message({
                            type: 'warning',
                            message: '信息获取失败'
                        })
                    }
                }).catch(e => {
                    this.$message({
                        type: 'warning',
                        message: e
                    })
                })
            }
        }
    }
</script>

<style scoped>

</style>
