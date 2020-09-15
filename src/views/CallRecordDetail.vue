<template>
    <div v-loading="dataLoading">
        <el-row :gutter="40">
            <el-col :span="10">
                <ptitle title="来电详情"></ptitle>
                <el-form ref="form" :model="data" label-width="120px" size="small" :label-position="'left'" style="padding: 0 20px">
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="客户姓名:">
                                {{data.name}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="残疾证号:">
                                {{data.disable_member_id}}
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24" >
                            <el-form-item label="地址:">
                                {{data.addr}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="24" >
                            <el-form-item label="服务机构:">
                                {{data.branches_name}}
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24" >
                            <el-form-item label="服务名称:">
                                {{data.service_item_name}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="24" >
                            <el-form-item label="紧急程度:">
                                <span v-if="data.urgency === '0'">普通</span>
                                <span v-if="data.urgency === '1'">一般</span>
                                <span v-if="data.urgency === '2'">急迫</span>
                                <span v-if="data.urgency === '3'">紧急</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24" >
                            <el-form-item label="当前状态:">
                                <span v-if="data.status === '0'">待分配</span>
                                <span v-if="data.status === '1'">待派单</span>
                                <span v-if="data.status === '2'">待服务</span>
                                <span v-if="data.status === '3'">服务中</span>
                                <span v-if="data.status === '4'">已完成</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24" >
                            <el-form-item label="创建人:">
                                {{data.create_account}}
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="开始时间:">
                                {{data.begin_time}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="结束时间:">
                                {{data.end_time}}
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-col>
            <el-col :span="14">
                <ptitle title="事件进度"></ptitle>
                <el-steps :active="parseInt(data.status)+1" style="padding: 0 20px">
                    <el-step title="待分配" icon="el-icon-thumb"></el-step>
                    <el-step title="待派单" icon="el-icon-paperclip"></el-step>
                    <el-step title="待服务" icon="el-icon-s-order"></el-step>
                    <el-step title="服务中" icon="el-icon-truck"></el-step>
                    <el-step title="已完成" icon="el-icon-s-check"></el-step>
                </el-steps>
                <ptitle title="最新进展" style="border-bottom: 1px solid #eee;padding-bottom: 10px;margin-top: 20px;margin-bottom: 30px"></ptitle>
                <el-timeline :reverse="true">

                    <el-timeline-item :color="'#10a8ae'" v-if="data.create_time">
                        <div class="time-line-box">
                            <div>{{data.create_account}} 创建了 {{data.service_item_name}} 服务订单 {{data.order_id}}</div>
                            <span>{{data.create_time}}</span>
                        </div>
                    </el-timeline-item>

                    <el-timeline-item :color="'#10a8ae'" v-if="data.service_assigns_time">
                        <div class="time-line-box">
                            <div>订单 {{data.order_id}} 被派给了 {{data.branches_name}}</div>
                            <span>{{data.service_assigns_time}}</span>
                        </div>
                    </el-timeline-item>

                    <el-timeline-item :color="'#10a8ae'" v-if="data.branches_assigns_time">
                        <div class="time-line-box">
                            <div>{{data.branches_name}} 将订单 {{data.order_id}} 派给了 {{data.branches_order_people_name}}</div>
                            <span>{{data.branches_assigns_time}}</span>
                        </div>
                    </el-timeline-item>

                    <el-timeline-item :color="'#10a8ae'" v-if="data.service_begin_time">
                        <div class="time-line-box">
                            <div>{{data.branches_order_people_name}} 正在服务中</div>
                            <span>{{data.service_begin_time}}</span>
                        </div>
                    </el-timeline-item>

                    <el-timeline-item :color="'#10a8ae'" v-if="data.service_end_time">
                        <div class="time-line-box">
                            <div>服务完成</div>
                            <span>{{data.service_end_time}}</span>
                        </div>
                        <div class="image-box" v-if="data.orderImages.length !== 0">
                            <el-image :fit="'cover'" v-for="(item, index) in data.orderImages" :src="item | imgBaseUrl" :key="item.image_url" :preview-src-list="data.orderImages | imgList(index)">
                                <div slot="placeholder" class="image-slot">
                                    加载中<span class="dot">...</span>
                                </div>
                            </el-image>
                        </div>
                    </el-timeline-item>


<!--                    <el-timeline-item-->
<!--                            v-for="(activity, index) in activities"-->
<!--                            :key="index"-->
<!--                            :color="'#10a8ae'">-->
<!--                        <div class="time-line-box">-->
<!--                            <div>{{activity.content}}</div>-->
<!--                            <span>{{activity.timestamp}}</span>-->
<!--                        </div>-->
<!--                        <div class="image-box" v-if="data.orderImages !== []&&activity.content === '服务完成'">-->
<!--                            <el-image :fit="'cover'" v-for="(item, index) in data.orderImages" :src="item | imgBaseUrl" :key="item.image_url" :preview-src-list="data.orderImages | imgList(index)">-->
<!--                                <div slot="placeholder" class="image-slot">-->
<!--                                    加载中<span class="dot">...</span>-->
<!--                                </div>-->
<!--                            </el-image>-->
<!--                        </div>-->
<!--                    </el-timeline-item>-->
                </el-timeline>
            </el-col>
        </el-row>

<!--        <ptitle title="照片列表" v-if="data.orderImages !== []"></ptitle>-->
    </div>
</template>

<script>
    export default {
        name: "CallRecordDetail",
        data(){
            return {
                dataLoading: false,
                data: {
                    orderImages: []
                },
                queryData: this.$route.query,

                // 时间线的一些字段
                activities: [{
                    content: '创建订单',
                    timestamp: '2019-12-19'
                }, {
                    content: '订单派工',
                    timestamp: '2019-12-19'
                }, {
                    content: '服务中',
                    timestamp: '2019-12-20'
                }, {
                    content: '服务完成',
                    timestamp: '2019-12-20'
                }]
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
                    if(res.code === 'single'){
                        this.data = res['data'];
                    } else {
                        this.$message({
                            type: 'warning',
                            message: res.errorMsg
                        })
                    }
                    this.dataLoading = false;
                })
            }

        }
    }
</script>

<style scoped lang="scss">
    .time-line-box{
        display: flex;
        flex-direction: row;
        div{
            flex: 1;
            padding-right: 10px;
        }
        span{
            color: #aaa;
            min-width: 80px
        }
    }
    .image-box .el-image{
        height: 120px;
    }
</style>
