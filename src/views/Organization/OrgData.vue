<template>
    <div v-loading="dataLoading">
        <ptitle title="数据快报"></ptitle>

        <el-row style="padding-bottom: 10px;margin-bottom: 10px">
            <el-col :span="3" style="margin-left: 10px;">
                <el-date-picker
                        style="width: 100%"
                        v-model="searchYear"
                        size="small"
                        type="year"
                        placeholder="选择年">
                </el-date-picker>
            </el-col>
            <el-col :span="4" style="margin-left: 10px">
                <el-button type="primary" size="small" @click="search">搜索</el-button>
                <!--                <el-button type="default" size="small" @click="searchAll">清空</el-button>-->
            </el-col>
        </el-row>

        <!--panel-->
        <el-row :gutter="20" class="panel-group">
            <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                <div class="card-panel">
                    <div class="card-panel-icon-wrapper icon-service-event">
                        <i class="el-icon-circle-plus-outline card-panel-icon"></i>
                    </div>
                    <div class="card-panel-description">
                        <div class="card-panel-text">
                            服务总数
                        </div>
                        <count-to :start-val="0" :end-val="topData.service_total" :duration="3000" class="card-panel-num" />
                    </div>
                </div>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                <div class="card-panel">
                    <div class="card-panel-icon-wrapper icon-service-order">
                        <i class="el-icon-service card-panel-icon"></i>
                    </div>
                    <div class="card-panel-description">
                        <div class="card-panel-text">
                            员工
                        </div>
                        <count-to :start-val="0" :end-val="topData.personal_total" :duration="3000" class="card-panel-num" />
                    </div>
                </div>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                <div class="card-panel">
                    <div class="card-panel-icon-wrapper icon-service-feedback">
                        <i class="el-icon-document-checked card-panel-icon"></i>
                    </div>
                    <div class="card-panel-description">
                        <div class="card-panel-text">
                            推出项目
                        </div>
                        <count-to :start-val="0" :end-val="topData.item_total" :duration="3000" class="card-panel-num" />
                    </div>
                </div>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                <div class="card-panel">
                    <div class="card-panel-icon-wrapper icon-service-customer">
                        <i class="el-icon-user-solid card-panel-icon"></i>
                    </div>
                    <div class="card-panel-description">
                        <div class="card-panel-text">
                            会员人数
                        </div>
                        <count-to :start-val="0" :end-val="topData.member_total" :duration="3000" class="card-panel-num" />
                    </div>
                </div>
            </el-col>
        </el-row>

        <!--14 10 线图 饼图-->
        <el-row :gutter="20">
            <el-col :span="24">
                <div class="draw-box" id="line-1">

                </div>
            </el-col>
<!--            <el-col :span="10">-->
<!--                <div class="draw-box" id="pie-1">-->

<!--                </div>-->
<!--            </el-col>-->
        </el-row>

        <!--14 10 条图 线图图-->
        <el-row :gutter="20">
            <el-col :span="14">
                <div class="draw-box" id="bar-1">

                </div>
            </el-col>
            <el-col :span="10">
                <div class="draw-box" id="line-2">

                </div>
            </el-col>
        </el-row>

        <!--饼图-->
<!--        <el-row :gutter="20">-->
<!--            <el-col :span="14">-->
<!--                <div class="draw-box" id="pie-2">-->

<!--                </div>-->
<!--            </el-col>-->
<!--        </el-row>-->
    </div>
</template>

<script>
    import countTo from 'vue-count-to';

    export default {
        name: "OrgData",
        components: { countTo },
        data(){
            return {
                dataLoading: false,
                topData: {

                },
                // 检索年
                searchYear: ''
            }
        },
        mounted() {
            this.$nextTick(()=>{
                let date = new Date();
                this.searchYear = date.getFullYear() + '';
                this.search();

            })
        },
        methods: {
            // 服务次数
            drawLine_1(){
                let myChart = this.$echarts.init(document.getElementById('line-1'));

                let option = {
                    title: {
                        text: '服务次数'
                    },
                    tooltip : {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
                    legend: {
                        data:['服务']
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                            data : ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [
                        {
                            name:'服务',
                            type:'line',
                            stack: '总量',
                            lineStyle:{
                                color: '#4ab6fc'
                            },
                            areaStyle: {
                                color: '#81c8fc'
                            },
                            data:this.topData['service_counts'].map(v => {
                                return v.count;
                            })
                        }
                    ]
                };

                myChart.setOption(option);

            },

            drawPie_1(){
                let myChart = this.$echarts.init(document.getElementById('pie-1'));

                let option = {
                    title: {
                        text: '会员统计',
                        left: 'left'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{b} : {c} ({d}%)"
                    },
                    legend: {
                        bottom: 10,
                        left: 'center',
                        data: ['个人', '企业','助残','养老']
                    },
                    series : [
                        {
                            type: 'pie',
                            radius : ['30%', '50%'],
                            center: ['50%', '50%'],
                            selectedMode: 'single',
                            data:[
                                {value:1548,name: '个人',itemStyle: {color: '#62d3bc'}},
                                {value:535, name: '企业',itemStyle: {color: '#ccc'}},
                                {value:510, name: '助残',itemStyle: {color: '#62d3bc'}},
                                {value:634, name: '养老',itemStyle: {color: '#ccc'}}
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };

                myChart.setOption(option);

            },

            // 服务项目
            drawBar_1(){
                let myChart = this.$echarts.init(document.getElementById('bar-1'));

                let option = {
                    title: {
                        text: 'TOP5 服务项目',
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'value',
                    },
                    yAxis: {
                        type: 'category',
                        data: this.topData['item_counts'].map(v => {
                            return v.name
                        }),
                    },
                    series: [
                        {
                            type: 'bar',
                            data: this.topData['item_counts'].map(v => {
                                return v.count
                            }),
                            itemStyle: {
                                color: '#62d3bc'
                            }
                        }
                    ]
                };

                myChart.setOption(option);

            },

            // 积分统计
            drawLine_2(){
                let myChart = this.$echarts.init(document.getElementById('line-2'));

                let option = {
                    title: {
                        text: '积分统计'
                    },
                    tooltip : {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
                    legend: {
                        data:['积分']
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                            data : ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [
                        {
                            name:'服务',
                            type:'line',
                            stack: '总量',
                            lineStyle:{
                                color: '#4ab6fc'
                            },
                            areaStyle: {
                                color: '#81c8fc'
                            },
                            data:this.topData['integral_counts'].map(v => {
                                return v.count;
                            })
                        }
                    ]
                };

                myChart.setOption(option);

            },

            drawPie_2(){
                let myChart = this.$echarts.init(document.getElementById('pie-2'));

                let option = {
                    title: {
                        text: '设备统计',
                        left: 'left'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{b} : {c} ({d}%)"
                    },
                    legend: {
                        bottom: 10,
                        left: 'center',
                        data: ['红外探头', '床垫','定位器']
                    },
                    series : [
                        {
                            type: 'pie',
                            radius : ['30%', '50%'],
                            center: ['50%', '50%'],
                            selectedMode: 'single',
                            data:[
                                {value:1548,name: '红外探头',itemStyle: {color: '#62d3bc'}},
                                {value:535, name: '床垫',itemStyle: {color: '#ccc'}},
                                {value:510, name: '定位器',itemStyle: {color: '#62d3bc'}},
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };

                myChart.setOption(option);

            },

            async search(){
                if(!this.searchYear){
                    this.$message({
                        type: "warning",
                        message: "请选择要查询的年份"
                    });
                    return false;
                }
                this.dataLoading = true;
                let totalRes = await this.getTopdata();
                this.topData = totalRes['data'];


                this.drawLine_1();
                // this.drawPie_1();
                this.drawBar_1();
                this.drawLine_2();
                // this.drawPie_2();

                this.dataLoading = false;
            },

            getTopdata(){
                return this.axios({
                    method: 'GET',
                    url: '/statistics/branches',
                    params: {
                        search_year: this.searchYear,
                        branches_id: JSON.parse(localStorage.getItem('Auth')).id
                    }
                })
            },

        }
    }
</script>

<style scoped lang="scss">
    .panel-group {
        margin-top: 18px;
        .card-panel-col{
            margin-bottom: 32px;
        }
        .card-panel {
            height: 108px;
            cursor: pointer;
            font-size: 12px;
            position: relative;
            overflow: hidden;
            color: #666;
            background: #fff;
            box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
            border-color: rgba(0, 0, 0, .05);
            &:hover {
                .card-panel-icon-wrapper {
                    color: #fff;
                }
                .icon-service-event {
                    background: #40c9c6;
                }
                .icon-service-order {
                    background: #36a3f7;
                }
                .icon-service-feedback {
                    background: #f4516c;
                }
                .icon-service-customer {
                    background: #34bfa3
                }
            }
            .icon-service-event {
                color: #40c9c6;
            }
            .icon-service-order {
                color: #36a3f7;
            }
            .icon-service-feedback {
                color: #f4516c;
            }
            .icon-service-customer {
                color: #34bfa3
            }
            .card-panel-icon-wrapper {
                float: left;
                margin: 14px 0 0 14px;
                padding: 16px;
                transition: all 0.38s ease-out;
                border-radius: 6px;
            }
            .card-panel-icon {
                float: left;
                font-size: 48px;
            }
            .card-panel-description {
                float: right;
                font-weight: bold;
                margin: 26px 10px 26px 0;
                .card-panel-text {
                    line-height: 18px;
                    color: rgba(0, 0, 0, 0.45);
                    font-size: 16px;
                    margin-bottom: 12px;
                    text-align: right;
                }
                .card-panel-num {
                    font-size: 20px;
                }
            }
        }
    }
    .draw-box{
        height: 300px;
        width: 100%;
        margin-top: 30px;
    }
</style>
