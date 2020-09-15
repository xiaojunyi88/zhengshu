<template>
    <div>
        <ptitle title="员工信息">
            <el-button v-if="activeName !== 'third'&&auth.type_id === 1" @click="addStaff()" size="small" type="primary">
                新增{{activeName==='first'?'中心':activeName==='second'?'机构':''}}员工
            </el-button>
        </ptitle>
        <el-tabs v-model="activeName" @tab-click="handleTabsClick" style="padding: 0 20px">
            <el-tab-pane label="中心人员" name="first">
                <staff-info-center ref="first"></staff-info-center>
            </el-tab-pane>
            <el-tab-pane label="机构人员" name="second">
                <staff-info-org ref="second"></staff-info-org>
            </el-tab-pane>
            <el-tab-pane label="政府人员" name="third">
                政府人员
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import StaffInfoCenter from "../components/StaffInfoCenter";
    import StaffInfoOrg from "../components/StaffInfoOrg";
    export default {
        name: "StaffInfo",
        components: {StaffInfoOrg, StaffInfoCenter},
        data(){
            return {
                activeName: 'first',
                auth: JSON.parse(localStorage.getItem("Auth")),

            }
        },
        mounted: function(){
            this.$nextTick(function(){

            })
        },
        methods: {
            handleTabsClick(){

            },

            addStaff(){
                this.$refs[this.activeName].addStaff();
            }
        }
    }
</script>

<style scoped>

</style>
