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
    </div>
</template>

<script>
    export default {
        name: "OrgServiceDesignateDetail",
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
                    url: '/service_info/order/info',
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

<style scoped>

</style>
