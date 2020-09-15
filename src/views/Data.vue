<template>
  <div v-loading="pageLoading">
    <ptitle title="数据快报"></ptitle>

    <el-row style="padding-bottom: 10px;margin-bottom: 10px">
      <el-col :span="3" style="margin-left: 10px;">
        <el-date-picker
          style="width: 100%"
          v-model="searchYear"
          value-format="yyyy"
          size="small"
          type="year"
          placeholder="选择年"
        ></el-date-picker>
      </el-col>
      <el-col :span="4" style="margin-left: 10px">
        <el-button type="primary" size="small" @click="search">搜索</el-button>
        <!--                <el-button type="default" size="small" @click="searchAll">清空</el-button>-->
      </el-col>
    </el-row>

    <!--上方table-->
    <table class="data-table">
      <tr>
        <td rowspan="3">
          全部订单(
          <span>{{topData.order_total}}</span>)
        </td>
        <td>
          待分配(
          <span>{{topData.status_0_total}}</span>)
        </td>
        <td>
          已派单(
          <span>{{topData.status_1_total}}</span>)
        </td>
        <td>
          待服务(
          <span>{{topData.status_2_total}}</span>)
        </td>
        <td rowspan="3">
          已过期(
          <span>{{topData.overdu_order_total}}</span>)
        </td>
        <td rowspan="3">
          服务项目(
          <span>{{topData.item_total}}</span>)
        </td>
        <td width="70px">
          <template v-if="topData.service_item[0]">
            {{topData.service_item[0].item_name}}(
            <span>{{topData.service_item[0].count}}</span>)
          </template>
        </td>
        <td width="70px">
          <template v-if="topData.service_item[1]">
            {{topData.service_item[1].item_name}}(
            <span>{{topData.service_item[1].count}}</span>)
          </template>
        </td>
        <td width="70px">
          <template v-if="topData.service_item[2]">
            {{topData.service_item[2].item_name}}(
            <span>{{topData.service_item[2].count}}</span>)
          </template>
        </td>
        <td width="70px">
          <template v-if="topData.service_item[3]">
            {{topData.service_item[3].item_name}}(
            <span>{{topData.service_item[3].count}}</span>)
          </template>
        </td>
      </tr>
      <tr>
        <td>
          服务中(
          <span>{{topData.status_3_total}}</span>)
        </td>
        <td>
          已完成(
          <span>{{topData.status_4_total}}</span>)
        </td>
        <td>
          已评价(
          <span>{{topData.satisfaction_1_total}}</span>)
        </td>
        <td width="70px">
          <template v-if="topData.service_item[4]">
            {{topData.service_item[4].item_name}}(
            <span>{{topData.service_item[4].count}}</span>)
          </template>
        </td>
        <td width="70px">
          <template v-if="topData.service_item[5]">
            {{topData.service_item[5].item_name}}(
            <span>{{topData.service_item[5].count}}</span>)
          </template>
        </td>
        <td width="70px">
          <template v-if="topData.service_item[6]">
            {{topData.service_item[6].item_name}}(
            <span>{{topData.service_item[6].count}}</span>)
          </template>
        </td>
        <td width="70px">
          <template v-if="topData.service_item[7]">
            {{topData.service_item[7].item_name}}(
            <span>{{topData.service_item[7].count}}</span>)
          </template>
        </td>
      </tr>
      <tr>
        <td>
          未评价(
          <span>{{topData.satisfaction_0_total}}</span>)
        </td>
        <td></td>
        <td></td>
        <td width="70px">
          <template v-if="topData.service_item[8]">
            {{topData.service_item[8].item_name}}(
            <span>{{topData.service_item[8].count}}</span>)
          </template>
        </td>
        <td width="70px">
          <template v-if="topData.service_item[9]">
            {{topData.service_item[9].item_name}}(
            <span>{{topData.service_item[9].count}}</span>)
          </template>
        </td>
        <td width="70px">
          <template v-if="topData.service_item[10]">
            {{topData.service_item[10].item_name}}(
            <span>{{topData.service_item[10].count}}</span>)
          </template>
        </td>
        <td width="70px">
          <template v-if="topData.service_item[11]">
            {{topData.service_item[11].item_name}}(
            <span>{{topData.service_item[11].count}}</span>)
          </template>
        </td>
      </tr>
    </table>
    <!--panel-->
    <el-row :gutter="20" class="panel-group">
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-service-event">
            <i class="el-icon-circle-plus-outline card-panel-icon"></i>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">新增服务事件</div>
            <count-to
              :start-val="0"
              :end-val="topData.call_total"
              :duration="3000"
              class="card-panel-num"
            />
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-service-order">
            <i class="el-icon-document-checked card-panel-icon"></i>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">新增服务工单</div>
            <count-to
              :start-val="0"
              :end-val="topData.order_total"
              :duration="3000"
              class="card-panel-num"
            />
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-service-feedback">
            <i class="el-icon-service card-panel-icon"></i>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">新增服务回访</div>
            <count-to
              :start-val="0"
              :end-val="topData.satisfaction_1_total"
              :duration="3000"
              class="card-panel-num"
            />
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-service-customer">
            <i class="el-icon-user-solid card-panel-icon"></i>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">新增客户数量</div>
            <count-to
              :start-val="0"
              :end-val="topData.member_total"
              :duration="3000"
              class="card-panel-num"
            />
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- statistic panel-->
    <el-row :gutter="40">
      <el-col :span="12">
        <ptitle :title="'企业信息统计'"></ptitle>
        <template>
          <div class="data-panel data-panel-blue">
            <div class="data-panel-icon-box">
              <i class="el-icon-s-home"></i>
            </div>
            <div class="data-panel-content-box">
              <p>管理企业数</p>
              <p>
                {{enterPriseData.branch_total||0}}
                <span>家</span>
              </p>
            </div>
          </div>
          <div class="data-panel data-panel-red">
            <div class="data-panel-icon-box">
              <i class="el-icon-s-home"></i>
            </div>
            <div class="data-panel-content-box">
              <p>上门服务人员</p>
              <p>
                {{enterPriseData.branch_person_total}}
                <span>人</span>
              </p>
            </div>
          </div>
          <div class="data-panel data-panel-yellow">
            <div class="data-panel-icon-box">
              <i class="el-icon-s-home"></i>
            </div>
            <div class="data-panel-content-box">
              <p>累计积分</p>
              <p>
                {{enterPriseData.integral}}
                <span>分</span>
              </p>
            </div>
          </div>
          <div class="data-panel data-panel-green">
            <div class="data-panel-icon-box">
              <i class="el-icon-s-home"></i>
            </div>
            <div class="data-panel-content-box">
              <p>服务次数</p>
              <p>
                {{enterPriseData.service_count}}
                <span>次</span>
              </p>
            </div>
          </div>
        </template>
      </el-col>
      <!-- <el-col :span="12">
        <ptitle :title="'累计服务统计'"></ptitle>
        <template>
          <div
            class="statistic-panel"
            v-for="(item,index) in enterPriseData.branches"
            :key="item.name"
          >
            <span
              style="padding-bottom: 5px"
              class="statistic-panel-tag"
              :class="{ 'first': index === 0, 'second': index === 1, 'third': index === 2}"
            >{{index+1}}</span>
            <div>
              <p>{{item.name}}</p>
              <p>
                累计服务
                <span>{{item.count}}</span>次
              </p>
            </div>
          </div>
        </template>
      </el-col>-->
      <!--注释-->
      <template>
        <el-col :span="8">
          <ptitle :title="'企业分布情况'"></ptitle>
          <template>
            <div class="locate-panel">
              <div>
                <span>1</span>
                <p>共乐街道办事处共乐街道办事处共乐街道办事处共乐街道办事处</p>
                <div>18家</div>
              </div>
              <div>
                <span>1</span>
                <p>共乐街道办事共乐街道办事共乐街道办事共乐街道办事处</p>
                <div>18家</div>
              </div>
            </div>
            <div class="locate-panel">
              <div>
                <span>1</span>
                <p>共乐街道办事处</p>
                <div>18家</div>
              </div>
              <div>
                <span>1</span>
                <p>共乐街道办事处共乐街道办事处</p>
                <div>18家</div>
              </div>
            </div>
            <div class="locate-panel">
              <div>
                <span>1</span>
                <p>共乐街道办事处</p>
                <div>18家</div>
              </div>
              <div>
                <span>1</span>
                <p>共乐街道办事处共乐街道办事处</p>
                <div>18家</div>
              </div>
            </div>
            <div class="locate-panel">
              <div>
                <span>1</span>
                <p>共乐街道办事处</p>
                <div>18家</div>
              </div>
              <div>
                <span>1</span>
                <p>共乐街道办事处共乐街道办事处</p>
                <div>18家</div>
              </div>
            </div>
            <div class="locate-panel">
              <div>
                <span>1</span>
                <p>共乐街道办事处</p>
                <div>18家</div>
              </div>
              <div>
                <span>1</span>
                <p>共乐街道办事处共乐街道办事处</p>
                <div>18家</div>
              </div>
            </div>
          </template>
        </el-col>
      </template>
    </el-row>

    <!--注释-->
    <template>
      <!--24 折线-->
      <el-row>
        <el-col :span="24">
          <div class="draw-box" id="line-1"></div>
        </el-col>
      </el-row>
    </template>

    <!--注释-->
    <template>
      <!--6 饼图-->
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="draw-box" id="pie-1"></div>
        </el-col>
        <el-col :span="6">
          <div class="draw-box" id="pie-2"></div>
        </el-col>
        <el-col :span="6">
          <div class="draw-box" id="pie-3"></div>
        </el-col>
        <el-col :span="6">
          <div class="draw-box" id="pie-4"></div>
        </el-col>
      </el-row>
    </template>

    <!--注释-->
    <template>
      <!--16 8 条状图 饼图-->
      <el-row :gutter="20">
        <el-col :span="16">
          <div class="draw-box" id="bar-1"></div>
        </el-col>
        <el-col :span="8">
          <div class="draw-box" id="pie-5"></div>
        </el-col>
      </el-row>
    </template>

    <!--注释-->
    <template>
      <!--24 折线-->
      <el-row>
        <el-col :span="24">
          <div class="draw-box" id="line-2"></div>
        </el-col>
      </el-row>
    </template>

    <!--注释-->
    <template>
      服务人群分析 服务项目分析
      <el-row :gutter="20" style="margin-top: 20px">
        <el-col :span="12">
          <el-table
            :data="tableData_people"
            border
            :header-row-style="{color: '#000', fontSize: '18px'}"
          >
            <el-table-column label="服务人群分析">
              <template slot-scope="scope">
                {{scope.row.name}}: {{scope.row.total}}人
                <span
                  v-for="(item,index) in scope.row.items"
                  :key="index"
                >{{item.name}}{{item.value}}人</span>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="12">
          <el-table
            :data="tableData_people"
            border
            :header-row-style="{color: '#000', fontSize: '18px'}"
          >
            <el-table-column label="服务项目分析">
              <template slot-scope="scope">
                {{scope.row.name}}: {{scope.row.total}}人
                <span
                  v-for="(item,index) in scope.row.items"
                  :key="index"
                >{{item.name}}{{item.value}}人</span>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </template>

    <el-row :gutter="20">
      <el-col :span="12">
        <p style="color: #000;font-size: 18px;font-weight: bold;">财务情况统计</p>
        <div>
          <span style="color: red;font-size: 40px">{{integral.total_integral}}</span>分
        </div>
        <span style="color: #ccc">累计充值积分</span>
        <p>
          已结算
          <span style="float: right; color: #42ce1c">{{integral.settled_integral}}分</span>
        </p>
        <el-progress
          :percentage="integral.settled_integral?integral.settled_integral/integral.total_integral*100:0"
          :color="'#42ce1c'"
        ></el-progress>
        <p style="margin-top: 30px">
          未结算
          <span style="float: right; color: #64c3f8;">{{integral.no_settled_integral}}分</span>
        </p>
        <el-progress
          :percentage="integral.no_settled_integral?integral.no_settled_integral/integral.total_integral*100:0"
          :color="'#64c3f8'"
        ></el-progress>
        <p style="margin-top: 30px">
          总分
          <span style="float: right;">{{integral.total_integral}}分</span>
        </p>
        <el-progress :percentage="100" :color="'red'"></el-progress>
      </el-col>
      <el-col :span="12">
        <p style="color: #000;font-size: 18px;font-weight: bold;">服务机构积分情况</p>
        <el-table :data="integral.branches_integral" border>
          <el-table-column label="名称" prop="name"></el-table-column>
          <el-table-column label="未结算" prop="no_settled_integral"></el-table-column>
          <el-table-column label="已结算" prop="settled_integral"></el-table-column>
          <el-table-column label="总分" prop="total_integral"></el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import countTo from "vue-count-to";

export default {
  name: "Data",
  components: { countTo },
  data() {
    return {
      pageLoading: false,

      // 服务人群data
      tableData_people: [
        {
          name: "视力残疾",
          total: "500",
          items: [
            { name: "这个项目1", value: "500" },
            { name: "这个项目2", value: "500" },
            { name: "这个项目3", value: "500" },
          ],
        },
        {
          name: "视力残疾",
          total: "500人",
          items: [
            { name: "这个项目1", value: "500" },
            { name: "这个项目2", value: "500" },
            { name: "这个项目3", value: "500" },
          ],
        },
        {
          name: "视力残疾",
          total: "500人",
          items: [
            { name: "这个项目1", value: "500" },
            { name: "这个项目2", value: "500" },
            { name: "这个项目3", value: "500" },
          ],
        },
        {
          name: "视力残疾",
          total: "500人",
          items: [
            { name: "这个项目1", value: "500" },
            { name: "这个项目2", value: "500" },
            { name: "这个项目3", value: "500" },
          ],
        },
        {
          name: "视力残疾",
          total: "500人",
          items: [
            { name: "这个项目1", value: "500" },
            { name: "这个项目2", value: "500" },
            { name: "这个项目3", value: "500" },
          ],
        },
      ],

      // 服务人群data
      tableData_items: [
        {
          name: "视力残疾",
          total: "500",
          items: [
            { name: "这个项目1", value: "500" },
            { name: "这个项目2", value: "500" },
            { name: "这个项目3", value: "500" },
          ],
        },
        {
          name: "视力残疾",
          total: "500人",
          items: [
            { name: "这个项目1", value: "500" },
            { name: "这个项目2", value: "500" },
            { name: "这个项目3", value: "500" },
          ],
        },
        {
          name: "视力残疾",
          total: "500人",
          items: [
            { name: "这个项目1", value: "500" },
            { name: "这个项目2", value: "500" },
            { name: "这个项目3", value: "500" },
          ],
        },
        {
          name: "视力残疾",
          total: "500人",
          items: [
            { name: "这个项目1", value: "500" },
            { name: "这个项目2", value: "500" },
            { name: "这个项目3", value: "500" },
          ],
        },
        {
          name: "视力残疾",
          total: "500人",
          items: [
            { name: "这个项目1", value: "500" },
            { name: "这个项目2", value: "500" },
            { name: "这个项目3", value: "500" },
          ],
        },
      ],

      // 最下数据
      tabledata_last: [
        {
          name: "共乐街道办事处",
          field_1: "0.00",
          field_2: "0.00",
          field_3: "0.00",
        },
        {
          name: "共乐街道办事处",
          field_1: "0.00",
          field_2: "0.00",
          field_3: "0.00",
        },
        {
          name: "共乐街道办事处",
          field_1: "0.00",
          field_2: "0.00",
          field_3: "0.00",
        },
        {
          name: "共乐街道办事处",
          field_1: "0.00",
          field_2: "0.00",
          field_3: "0.00",
        },
        {
          name: "共乐街道办事处",
          field_1: "0.00",
          field_2: "0.00",
          field_3: "0.00",
        },
      ],

      // 检索年
      searchYear: "",

      topData: {
        service_item: [],
      },
      enterPriseData: {},
      integral: {},
    };
  },
  mounted() {
    this.$nextTick(() => {
      let date = new Date();
      this.searchYear = date.getFullYear() + "";
      this.drawLine_1();
      this.search();
      this.drawPie_1();
      this.drawPie_2();
      this.drawPie_3();
      this.drawPie_4();
      this.drawPie_5();
      this.drawBar_1();
      this.drawLine_2();
    });
  },
  methods: {
    drawLine_1() {
      let myChart = this.$echarts.init(document.getElementById("line-1"));

      let option = {
        title: {
          text: "工单类型月度分布",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["汇总", "工单类型一", "工单类型二", "工单类型三"],
          bottom: 0,
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "10%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            // saveAsImage: {}
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十一月",
            "十二月",
          ],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "汇总",
            type: "line",
            stack: "总量",
            data: [120, 132, 101, 134, 90, 230, 210, 101, 134, 90, 230, 210],
            itemStyle: { color: "#62d3bc" },
          },
          {
            name: "工单类型一",
            type: "line",
            stack: "总量",
            data: [220, 182, 191, 234, 290, 330, 310, 101, 134, 90, 230, 210],
            itemStyle: { color: "#ccc" },
          },
          {
            name: "工单类型二",
            type: "line",
            stack: "总量",
            data: [150, 232, 201, 154, 190, 330, 410, 101, 134, 90, 230, 210],
            itemStyle: { color: "#62d3bc" },
          },
          {
            name: "工单类型三",
            type: "line",
            stack: "总量",
            data: [320, 332, 301, 334, 390, 330, 320, 101, 134, 90, 230, 210],
            itemStyle: { color: "#ccc" },
          },
        ],
      };

      myChart.setOption(option);
    },

    drawPie_1() {
      let myChart = this.$echarts.init(document.getElementById("pie-1"));

      let option = {
        title: {
          text: "服务产品占比",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c} ({d}%)",
        },
        legend: {
          bottom: 10,
          left: "center",
          data: ["产品1", "产品2", "产品3", "产品4"],
        },
        series: [
          {
            type: "pie",
            radius: "50%",
            center: ["50%", "50%"],
            selectedMode: "single",
            data: [
              { value: 1548, name: "产品1", itemStyle: { color: "#62d3bc" } },
              { value: 10, name: "产品2", itemStyle: { color: "#ccc" } },
              { value: 510, name: "产品3", itemStyle: { color: "#62d3bc" } },
              { value: 1, name: "产品4", itemStyle: { color: "#ccc" } },
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };

      myChart.setOption(option);
    },

    drawPie_2() {
      let myChart = this.$echarts.init(document.getElementById("pie-2"));

      let option = {
        title: {
          text: "服务金额占比",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c} ({d}%)",
        },
        legend: {
          bottom: 10,
          left: "center",
          data: ["产品1", "产品2", "产品3", "产品4"],
        },
        series: [
          {
            type: "pie",
            radius: ["40%", "50%"],
            center: ["50%", "50%"],
            selectedMode: "single",
            data: [
              { value: 1548, name: "产品1", itemStyle: { color: "#62d3bc" } },
              { value: 535, name: "产品2", itemStyle: { color: "#ccc" } },
              { value: 510, name: "产品3", itemStyle: { color: "#62d3bc" } },
              { value: 634, name: "产品4", itemStyle: { color: "#ccc" } },
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };

      myChart.setOption(option);
    },

    drawPie_3() {
      let myChart = this.$echarts.init(document.getElementById("pie-3"));

      let option = {
        title: {
          text: "产品数量占比",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c} ({d}%)",
        },
        legend: {
          bottom: 10,
          left: "center",
          data: ["产品1", "产品2", "产品3", "产品4"],
        },
        series: [
          {
            type: "pie",
            radius: "50%",
            center: ["50%", "50%"],
            selectedMode: "single",
            data: [
              { value: 700, name: "产品1", itemStyle: { color: "#62d3bc" } },
              { value: 500, name: "产品2", itemStyle: { color: "#ccc" } },
              { value: 200, name: "产品3", itemStyle: { color: "#62d3bc" } },
              { value: 800, name: "产品4", itemStyle: { color: "#ccc" } },
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };

      myChart.setOption(option);
    },

    drawPie_4() {
      let myChart = this.$echarts.init(document.getElementById("pie-4"));

      let option = {
        title: {
          text: "满意度占比",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c} ({d}%)",
        },
        legend: {
          bottom: 10,
          left: "center",
          data: ["产品1", "产品2", "产品3", "产品4"],
        },
        series: [
          {
            type: "pie",
            radius: ["40%", "50%"],
            center: ["50%", "50%"],
            selectedMode: "single",
            data: [
              { value: 1548, name: "产品1", itemStyle: { color: "#62d3bc" } },
              { value: 535, name: "产品2", itemStyle: { color: "#ccc" } },
              { value: 510, name: "产品3", itemStyle: { color: "#62d3bc" } },
              { value: 634, name: "产品4", itemStyle: { color: "#ccc" } },
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };

      myChart.setOption(option);
    },

    drawPie_5() {
      let myChart = this.$echarts.init(document.getElementById("pie-5"));

      let option = {
        title: {
          text: "工单状态数量分布",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c} ({d}%)",
        },
        legend: {
          bottom: 10,
          left: "center",
          data: ["产品1", "产品2", "产品3", "产品4"],
        },
        series: [
          {
            type: "pie",
            radius: "50%",
            center: ["50%", "50%"],
            selectedMode: "single",
            data: [
              { value: 700, name: "产品1", itemStyle: { color: "#62d3bc" } },
              { value: 500, name: "产品2", itemStyle: { color: "#ccc" } },
              { value: 200, name: "产品3", itemStyle: { color: "#62d3bc" } },
              { value: 800, name: "产品4", itemStyle: { color: "#ccc" } },
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };

      myChart.setOption(option);
    },

    drawBar_1() {
      let myChart = this.$echarts.init(document.getElementById("bar-1"));

      let option = {
        title: {
          text: "人员月度服务单数汇总",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        legend: {
          data: ["装配式建筑工程施工员培训", "互联网营销师"],
          bottom: 0,
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "10%",
          containLabel: true,
        },
        yAxis: {
          type: "value",
        },
        xAxis: {
          type: "category",
          data: [
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十一月",
            "十二月",
          ],
        },
        // barWidth: 40,
        series: [
          {
            name: "装配式建筑工程施工员培训",
            type: "bar",

            data: [
              { value: 320 },
              { value: 220 },
              { value: 120 },
              { value: 520 },
            ],
          },
          {
            name: "互联网营销师",
            type: "bar",

            data: [
              { value: 120 },
              { value: 120 },
              { value: 120 },
              { value: 120 },
            ],
          },
        ],
      };

      myChart.setOption(option);
    },

    drawLine_2() {
      let myChart = this.$echarts.init(document.getElementById("line-2"));

      let option = {
        title: {
          text: "客户地域分布占比分析",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["道里", "南岗", "香坊", "道外"],
          bottom: 0,
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "10%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            // saveAsImage: {}
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十一月",
            "十二月",
          ],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "道里",
            type: "line",
            stack: "总量",
            data: [120, 132, 101, 134, 90, 230, 210, 101, 134, 90, 230, 210],
            itemStyle: { color: "#62d3bc" },
          },
          {
            name: "南岗",
            type: "line",
            stack: "总量",
            data: [220, 182, 191, 234, 290, 330, 310, 101, 134, 90, 230, 210],
            itemStyle: { color: "#ccc" },
          },
          {
            name: "香坊",
            type: "line",
            stack: "总量",
            data: [150, 232, 201, 154, 190, 330, 410, 101, 134, 90, 230, 210],
            itemStyle: { color: "#62d3bc" },
          },
          {
            name: "道外",
            type: "line",
            stack: "总量",
            data: [320, 332, 301, 334, 390, 330, 320, 101, 134, 90, 230, 210],
            itemStyle: { color: "#ccc" },
          },
        ],
      };

      myChart.setOption(option);
    },

    async search() {
      if (!this.searchYear) {
        this.$message({
          type: "warning",
          message: "请选择要查询的年份",
        });
        return false;
      }
      this.dataLoading = true;
      let totalRes = await this.getTopdata();
      this.topData = totalRes["data"];
      let EnterRes = await this.getEnterpriseStatistics();
      this.enterPriseData = EnterRes["data"];
      let intergalRes = await this.getIntegral();
      this.integral = intergalRes["data"];
      this.dataLoading = false;
    },

    getTopdata() {
      return this.axios({
        method: "GET",
        url: "/statistics",
        params: {
          search_year: this.searchYear,
        },
      });
    },

    getEnterpriseStatistics() {
      return this.axios({
        method: "GET",
        url: "/statistics/enterprise",
        params: {
          search_year: this.searchYear,
        },
      });
    },

    getIntegral() {
      return this.axios({
        method: "GET",
        url: "/statistics/integral",
        params: {
          search_year: this.searchYear,
        },
      });
    },
  },
};
</script>

<style scoped lang="scss">
.data-table {
  border-collapse: collapse;
  text-align: center;
  width: 100%;
  font-size: 14px;
  td {
    border: 1px solid #ccc;
    padding: 15px;
  }
}

.panel-group {
  margin-top: 18px;
  .card-panel-col {
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
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);
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
        background: #34bfa3;
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
      color: #34bfa3;
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

.data-panel {
  width: 95%;
  margin: 0 auto 10px;
  padding: 10px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #fff;
  position: relative;
  &:after,
  &:before {
    content: "";
    display: block;
    width: 30px;
    height: 30px;
    background: #fff;
    border-radius: 50%;
    top: 50%;
    margin-top: -15px;
    position: absolute;
  }
  &:before {
    left: -15px;
  }
  &:after {
    right: -15px;
  }
  .data-panel-icon-box {
    font-size: 40px;
    padding: 10px 15px 10px 20px;
    margin-right: 10px;
    border-right: 1px solid #fff;
  }
  .data-panel-content-box {
    p {
      margin: 5px 0;
      span {
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        margin-left: 5px;
        border-radius: 50%;
        background: #fff;
        display: inline-block;
      }
    }
  }
  &.data-panel-blue {
    background: #64c3f8;
    span {
      color: #64c3f8;
    }
  }
  &.data-panel-red {
    background: #f04e57;
    span {
      color: #f04e57;
    }
  }
  &.data-panel-yellow {
    background: #ffdc46;
    span {
      color: #ffdc46;
    }
  }
  &.data-panel-green {
    background: #5cd40c;
    span {
      color: #5cd40c;
    }
  }
}

.statistic-panel {
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid #ccc;
  border-bottom: none;
  padding-left: 20px;
  &:last-of-type {
    border: 1px solid #ccc;
  }
  & > span {
    display: block;
    font-size: 30px;
    width: 30px;
    height: 30px;
    text-align: center;
    font-style: italic;
    border-radius: 4px;
    margin-right: 20px;
    &.first {
      background: #f04e57;
      color: #fff;
    }
    &.second {
      background: #64c3f8;
      color: #fff;
    }
    &.third {
      background: #fff;
      border: 1px solid #64c3f8;
    }
  }
  div {
    padding: 5px 0;
    p {
      margin: 10px 0;
      span {
        font-size: 30px;
      }
    }
  }
}

.locate-panel {
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-bottom: 10px;
  & > div {
    width: 50%;
    box-sizing: border-box;
    margin: 0 5px;
    display: flex;
    flex-direction: row;
    border-radius: 4px;
    background: #64c3f8;
    align-items: center;
    font-size: 14px;
    padding: 0 10px;
    p {
      width: calc(100% - 35px - 40px);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    span {
      display: block;
      width: 30px;
      height: 30px;
      background: #fff;
      border-radius: 50%;
      text-align: center;
      line-height: 30px;
      margin-right: 5px;
    }
    div {
      width: 40px;
    }
  }
}

.draw-box {
  height: 300px;
  width: 100%;
  margin-top: 30px;
}
</style>
