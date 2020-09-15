<template>
    <div v-loading="dataLoading">
        <ptitle title="人员详情"></ptitle>


        <el-tabs v-model="activeName" @tab-click="handleTabsClick" style="padding: 0 20px">
            <el-tab-pane label="基本信息" name="first">
                <staff-detail-base-info :id="paramsId"></staff-detail-base-info>
            </el-tab-pane>
            <el-tab-pane label="服务记录" name="second">
                <staff-detail-service-log :id="paramsIdCode"></staff-detail-service-log>
            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<script>
    import StaffDetailBaseInfo from "../components/StaffDetailBaseInfo";
    import StaffDetailServiceLog from "../components/StaffDetailServiceLog";
    export default {
        name: "StaffDetail",
        components: {StaffDetailServiceLog, StaffDetailBaseInfo},
        data(){
            return {
                dataLoading: false,
                data: {
                    disableMemberEntity: {}
                },
                paramsId: '',
                paramsIdCode: '',

                activeName: 'first'
            }
        },
        mounted:function (){
            this.$nextTick(function(){
                this.paramsId = this.$route.query.id;
                this.paramsIdCode = this.$route.query.idCode;

            });
        },
        methods: {

            handleTabsClick(){

            },

        }
    }
</script>

<style scoped>

</style>
