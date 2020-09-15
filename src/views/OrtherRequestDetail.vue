<template>
    <div v-loading="dataLoading">
        <ptitle title="需求详情"></ptitle>

        <table class="data-table">
            <tr>
                <td colspan="4">
                    <p><span>姓名: {{data.name}}</span></p>
                    <p><span>手机号码: {{data.phone}}</span></p>
                    <p><span>残疾证号: {{data.disable_member_id}}</span></p>
                </td>
            </tr>
<!--            <tr>-->
<!--                <td>-->
<!--                    服务号：-->
<!--                </td>-->
<!--                <td>-->
<!--                    {{data.disable_member_id}}-->
<!--                </td>-->
<!--                <td>-->
<!--                    订单号：-->
<!--                </td>-->
<!--                <td>-->
<!--                    {{data.order_id}}-->
<!--                </td>-->
<!--            </tr>-->
            <tr>
                <td>
                    账户类型：
                </td>
                <td>
                    {{'助残'}}
                </td>
                <td>
                    服务备注：
                </td>
                <td>
                    {{data.comment}}
                </td>
            </tr>
<!--            <tr>-->
<!--                <td>-->
<!--                    服务点：-->
<!--                </td>-->
<!--                <td colspan="3">-->
<!--                    {{data.service_addr}}-->
<!--                </td>-->
<!--            </tr>-->
<!--            <tr>-->
<!--                <td colspan="4" style="text-align: center">-->
<!--                    服务内容：-->
<!--                </td>-->
<!--            </tr>-->
<!--            <tr>-->
<!--                <td colspan="4">-->
<!--                    {{data.service_item_name}}-->
<!--                </td>-->
<!--            </tr>-->
        </table>
    </div>
</template>

<script>
    export default {
        name: "OrtherRequestDetail",
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
                    url: '/service_info/order/info',
                    params: {
                        call_records_id: this.queryData.id
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
