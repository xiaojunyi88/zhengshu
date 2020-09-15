<template>
    <div>
        <ptitle title="服务记录"></ptitle>
        <el-tabs v-model="activeName" @tab-click="handleTabsClick" style="padding: 0 20px">
            <el-tab-pane label="订单" name="first">
                <service-record-order></service-record-order>
            </el-tab-pane>
            <el-tab-pane label="活动" name="second">
                <service-record-activity ref="second"></service-record-activity>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import ServiceRecordOrder from "../components/ServiceRecordOrder";
    import ServiceRecordActivity from "../components/ServiceRecordActivity";
    export default {
        name: "ServiceRecord",
        components: {ServiceRecordActivity, ServiceRecordOrder},
        data(){
            return {
                activeName: 'first'
            }
        },
        methods: {
            handleTabsClick(){

            },
        }
    }
</script>

<style scoped>

</style>
