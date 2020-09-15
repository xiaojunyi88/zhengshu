<template>
    <div v-loading="dataLoading">
        <ptitle title="服务详情"></ptitle>

        <table class="data-table">
            <tr>
                <td colspan="4">
                    <p><span>姓名: {{data.name}}</span></p>
                    <p><span>手机号码: {{data.phone}}</span></p>
                    <p><span>残疾证号: {{data.disable_member_id}}</span></p>
                </td>
            </tr>
            <tr>
                <td>
                    服务号：
                </td>
                <td>
                    {{data.disable_member_id}}
                </td>
                <td>
                    订单号：
                </td>
                <td>
                    {{data.order_id}}
                </td>
            </tr>
            <tr>
                <td>
                    服务公司：
                </td>
                <td>
                    {{data.branches_name}}
                </td>
                <td>
                    满意度：
                </td>
                <td>
                    {{data.satisfaction}}
                </td>
            </tr>
            <tr>
                <td>
                    服务人员：
                </td>
                <td>
                    {{data.branches_order_people_name}}
                </td>
                <td>
                    联系方式：
                </td>
                <td>
                    {{data.branches_order_people_mobile}}
                </td>
            </tr>
            <tr>
                <td>
                    服务项目：
                </td>
                <td>
                    {{data.service_item_name}}
                </td>
                <td>
                    服务数量：
                </td>
                <td>
                    {{1}}
                </td>
            </tr>
            <tr>
                <td>
                    填单时间：
                </td>
                <td>
                    {{data.service_begin_time}}
                </td>
                <td>
                    完成时限：
                </td>
                <td>
                    {{data.service_end_time}}
                </td>
            </tr>
            <tr>
                <td>
                    服务分值：
                </td>
                <td>
                    {{data.integral}}
                </td>
                <td>
                    账户类型：
                </td>
                <td>
                    {{'助残'}}
                </td>
            </tr>
            <tr>
                <td>
                    服务评分：
                </td>
                <td>
                    {{data.satisfaction}}
                </td>
                <td>
                    服务备注：
                </td>
                <td>
                    {{data.comment}}
                </td>
            </tr>
            <tr>
                <td>
                    服务点：
                </td>
                <td colspan="3">
                    {{data.service_addr}}
                </td>
            </tr>
            <tr>
                <td colspan="4" style="text-align: center">
                    服务内容：
                </td>
            </tr>
            <tr>
                <td colspan="4">
                    {{data.service_item_name}}
                </td>
            </tr>
            <tr>
                <td colspan="4" style="text-align: center">
                    服务细节：
                </td>
            </tr>
            <tr>
                <td colspan="4">
                    {{data.service_item_name}}
                </td>
            </tr>

            <tr v-if="data.orderImages.length !== 0">
                <td colspan="4" style="text-align: center">
                    照片列表：
                </td>
            </tr>
            <tr v-if="data.orderImages.length !== 0">
                <td colspan="4">
                    <div class="image-box">
                        <el-image :fit="'cover'" v-for="(item, index) in data.orderImages" :src="item | imgBaseUrl" :key="item.image_url" :preview-src-list="data.orderImages | imgList(index)">
                            <div slot="placeholder" class="image-slot">
                                加载中<span class="dot">...</span>
                            </div>
                        </el-image>
                    </div>
                </td>
            </tr>
        </table>

<!--        <el-form ref="form" :model="data" label-width="120px" size="small" :label-position="'left'" style="padding: 0 120px;">-->
<!--            <el-row>-->
<!--                <el-col :span="12">-->
<!--                    <el-form-item label="客户姓名:">-->
<!--                        {{data.name}}-->
<!--                    </el-form-item>-->
<!--                </el-col>-->
<!--                <el-col :span="12">-->
<!--                    <el-form-item label="残疾证号:">-->
<!--                        {{data.disable_member_id}}-->
<!--                    </el-form-item>-->
<!--                </el-col>-->
<!--            </el-row>-->
<!--            <el-row>-->
<!--                <el-col :span="12">-->
<!--                    <el-form-item label="地址:">-->
<!--                        {{data.addr}}-->
<!--                    </el-form-item>-->
<!--                </el-col>-->
<!--                <el-col :span="12">-->
<!--                    <el-form-item label="服务机构:">-->
<!--                        {{data.branches_name}}-->
<!--                    </el-form-item>-->
<!--                </el-col>-->
<!--            </el-row>-->
<!--            <el-row>-->
<!--                <el-col :span="12" >-->
<!--                    <el-form-item label="服务名称:">-->
<!--                        {{data.service_item_name}}-->
<!--                    </el-form-item>-->
<!--                </el-col>-->
<!--                <el-col :span="12" >-->
<!--                    <el-form-item label="紧急程度:">-->
<!--                        <span v-if="data.urgency === '0'">普通</span>-->
<!--                        <span v-if="data.urgency === '1'">一般</span>-->
<!--                        <span v-if="data.urgency === '2'">急迫</span>-->
<!--                        <span v-if="data.urgency === '3'">紧急</span>-->
<!--                    </el-form-item>-->
<!--                </el-col>-->
<!--            </el-row>-->
<!--            <el-row>-->
<!--                <el-col :span="12" >-->
<!--                    <el-form-item label="当前状态:">-->
<!--                        <span v-if="data.status === '0'">待分配</span>-->
<!--                        <span v-if="data.status === '1'">待派单</span>-->
<!--                        <span v-if="data.status === '2'">待服务</span>-->
<!--                        <span v-if="data.status === '3'">服务中</span>-->
<!--                        <span v-if="data.status === '4'">已完成</span>-->
<!--                    </el-form-item>-->
<!--                </el-col>-->
<!--                <el-col :span="12" >-->
<!--                    <el-form-item label="创建人:">-->
<!--                        {{data.create_account}}-->
<!--                    </el-form-item>-->
<!--                </el-col>-->
<!--            </el-row>-->
<!--            <el-row>-->
<!--                <el-col :span="12" >-->
<!--                    <el-form-item label="开始时间:">-->
<!--                        {{data.begin_time}}-->
<!--                    </el-form-item>-->
<!--                </el-col>-->
<!--                <el-col :span="12" >-->
<!--                    <el-form-item label="结束时间:">-->
<!--                        {{data.end_time}}-->
<!--                    </el-form-item>-->
<!--                </el-col>-->
<!--            </el-row>-->
<!--        </el-form>-->
<!--        <ptitle title="照片列表" v-if="data.orderImages.length !== 0"></ptitle>-->
<!--        <div class="image-box" v-if="data.orderImages.length !== 0">-->
<!--            <el-image :fit="'cover'" v-for="(item, index) in data.orderImages" :src="item | imgBaseUrl" :key="item.image_url" :preview-src-list="data.orderImages | imgList(index)">-->
<!--                <div slot="placeholder" class="image-slot">-->
<!--                    加载中<span class="dot">...</span>-->
<!--                </div>-->
<!--            </el-image>-->
<!--        </div>-->
    </div>
</template>

<script>
    export default {
        name: "ServiceRecordOrderDetail",
        data(){
            return {
                dataLoading: false,
                data: {
                    orderImages: []
                },
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
                    url: '/service_info/record/info',
                    params: {
                        id: this.queryData.id
                    }
                }).then(res => {
                    this.data = res['data'];
                    this.dataLoading = false;

                })
            }

        }
    }
</script>

<style scoped lang="scss">

</style>
