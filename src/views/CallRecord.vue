<template>
  <div v-loading="dataLoading">
    <ptitle title="来电记录">
      <el-button @click="addCall()" size="small" type="primary">新增来电</el-button>
    </ptitle>

    <el-row style="padding-bottom: 10px;margin-bottom: 10px">
      <el-col :span="4">
        <el-input size="small" placeholder="请输入要搜索的内容" v-model="searchMsg"></el-input>
      </el-col>
      <el-col :span="3" style="margin-left: 10px;">
        <el-select size="small" v-model="searchState" style="width: 100%;" placeholder="请选择">
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="6" style="margin-left: 10px">
        <el-date-picker
          size="small"
          style="width: 100%"
          v-model="searchDate"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-col>
      <el-col :span="4" style="margin-left: 10px">
        <el-button type="primary" size="small" @click="search">搜索</el-button>
        <el-button type="default" size="small" @click="searchAll">清空</el-button>
      </el-col>
    </el-row>

    <!--列表-->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" align="center" width="50"></el-table-column>
      <el-table-column prop="name" align="center" label="姓名"></el-table-column>
      <el-table-column prop="disable_member_id" align="center" label="残疾人号"></el-table-column>
      <el-table-column prop="contacts_phone" align="center" label="类型">
        <template slot-scope="scope">
          <span v-if="scope.row.type === 0">其他</span>
          <span v-if="scope.row.type === 1">有效</span>
        </template>
      </el-table-column>
      <el-table-column prop="order_status" align="center" label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.order_status === 0">待分配</span>
          <span v-if="scope.row.order_status === 1">待派单</span>
          <span v-if="scope.row.order_status === 2">待服务</span>
          <span v-if="scope.row.order_status === 3">服务中</span>
          <span v-if="scope.row.order_status === 4">已完成</span>
        </template>
      </el-table-column>
      <el-table-column prop="service_item_name" align="center" label="服务项目"></el-table-column>
      <el-table-column prop="service_people_name" align="center" label="经办人"></el-table-column>
      <el-table-column prop="create_time" align="center" label="来电时间"></el-table-column>
      <el-table-column prop="comment" align="center" label="备注"></el-table-column>
      <el-table-column prop="name" align="center" label="查看详情">
        <template slot-scope="scope">
          <el-button @click="detailClick(scope.row)" type="text" size="small">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination
      background
      layout="total, prev, pager, next"
      :page-size="pageSize"
      :total="total"
      :current-page="currPage"
      @current-change="handleCurrentChange"
    ></el-pagination>

    <!--对话框-->
    <el-dialog title="新增来电记录" :visible.sync="dialogVisible" width="70%" :before-close="handleClose">
      <!--内部弹出 查看服务记录-->
      <el-dialog width="60%" title="服务记录" :visible.sync="showRecordDialog" append-to-body>
        <el-table
          :data="showRecordsData"
          border
          style="width: 100%"
          v-loading="showRecordDataLoading"
        >
          <el-table-column type="index" align="center" width="50"></el-table-column>
          <el-table-column prop="create_time" align="center" label="来电时间"></el-table-column>
          <el-table-column align="center" label="服务内容">
            <template slot-scope="scope">
              <span v-if="scope.row.service_item_name">{{scope.row.service_item_name}}</span>
              <span v-if="!scope.row.service_item_name">其他</span>
            </template>
          </el-table-column>
          <el-table-column prop="service_people_name" align="center" label="记录人"></el-table-column>
          <el-table-column align="center" label="服务状态">
            <template slot-scope="scope">
              <span v-if="scope.row.order_status === 0">待分配</span>
              <span v-if="scope.row.order_status === 1">已派单</span>
              <span v-if="scope.row.order_status === 2">待服务</span>
              <span v-if="scope.row.order_status === 3">服务中</span>
              <span v-if="scope.row.order_status === 4">已完成</span>
              <span v-if="!scope.row.service_item_name">其他</span>
            </template>
          </el-table-column>
        </el-table>

        <!--分页-->
        <el-pagination
          background
          layout="total, prev, pager, next"
          :page-size="showRecordPageSize"
          :total="showRecordTotal"
          :current-page="showRecordCurrPage"
          @current-change="handleRecordCurrentChange"
        ></el-pagination>
      </el-dialog>

      <div class="form-box" v-loading="formLoading">
        <el-form
          ref="callForm"
          style="padding: 0 10px"
          :model="callData"
          :rules="rules"
          size="small"
          :label-position="'left'"
        >
          <el-row>
            <el-col :span="16">
              <el-form-item label="残疾证号" prop="disable_member_id">
                <el-input v-model="callData.disable_member_id">
                  <el-button slot="append" icon="el-icon-search" @click="getBydisId()"></el-button>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <ptitle title="基本信息">
            <a
              href="javascript:;"
              @click="showRecord"
              style="float: right;text-decoration: none;"
            >服务记录</a>
          </ptitle>
          <el-row>
            <el-col :span="8">
              <el-form-item label="客户姓名:">{{callData.name}}</el-form-item>
            </el-col>
            <el-col :span="7" :offset="1">
              <el-form-item label="性别:">{{callData.sex === 1?'男':callData.sex === 0?'女':''}}</el-form-item>
            </el-col>
            <el-col :span="7" :offset="1">
              <el-form-item label="身份证号:">{{callData.idCode}}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="残疾证号:">{{callData.idCode}}</el-form-item>
            </el-col>
            <el-col :span="7" :offset="1">
              <el-form-item label="残疾类别:">{{callData.disableTypeName}}</el-form-item>
            </el-col>
            <el-col :span="7" :offset="1">
              <el-form-item label="积分:">{{callData.score}}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="电话:">{{callData.phone}}</el-form-item>
            </el-col>
            <el-col :span="7" :offset="1">
              <el-form-item label="地址:">{{callData.addr}}</el-form-item>
            </el-col>
            <el-col :span="7" :offset="1">
              <el-form-item label="所属社区:">{{callData.committeeName}}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="社区负责人:">{{callData.committeeCare}}</el-form-item>
            </el-col>
            <el-col :span="7" :offset="1">
              <el-form-item label="社区负责人电话:">{{callData.committeeCarePhone}}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="服务项目:" prop="service_item_id">
                <el-select v-model="callData.service_item_id" style="width: 100%" placeholder="请选择">
                  <!--返回字段全是null 暂用唯一有的serviceItem id-->
                  <el-option
                    v-for="item in serviceOptions"
                    :disabled="item.times === 0"
                    :key="item.serviceItem"
                    :label="item.serviceItemName+'/' + item.times + '次'"
                    :value="item.serviceItem"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10" :offset="2">
              <el-form-item label="紧急程度:" prop="urgency">
                <el-select v-model="callData.urgency" style="width: 100%" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="服务日期:" prop="service_time">
                <el-date-picker
                  style="width: 100%"
                  v-model="callData.service_time"
                  :picker-options="expireTimeOption"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="22">
              <el-form-item label="备注:" prop="comment">
                <el-input style="width: 100%" type="textarea" v-model="callData.comment"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="handleClose">取消</el-button>
          <el-button size="small" type="primary" @click="formSubmit">提交</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "CallRecord",
  data() {
    return {
      dialogVisible: false,
      dataLoading: false,
      formLoading: false,
      userData: JSON.parse(localStorage.getItem("Auth")),

      tableData: [],
      options: [
        { value: "0", label: "普通" },
        { value: "1", label: "一般" },
        { value: "2", label: "急迫" },
        { value: "3", label: "紧急" }
      ],
      // 要外部接口获取可做的项目列表
      serviceOptions: [],
      // 提交表单信息
      callData: {
        disable_member_id: "",
        phone: "",
        name: "",
        comment: "",
        service_time: "",
        begin_time: "",
        end_time: "",
        urgency: "",
        service_people_id: JSON.parse(localStorage.getItem("Auth")).personalId,
        service_item_id: "",
        service_enprise_id: JSON.parse(localStorage.getItem("Auth"))
          .enterpriseId,
        addr: "",

        sex: "",
        idCode: "",
        disableTypeName: "",
        disableType: "",
        committeeName: "",
        committeeCare: "",
        committeeCarePhone: "",
        score: "",

        orderInfo: {
          service_item_id: "",
          service_enprise_id: JSON.parse(localStorage.getItem("Auth"))
            .enterpriseId,
          service_addr: ""
        }
      },
      // 验证规则
      rules: {
        disable_member_id: [
          { required: true, message: "请输入残疾证号", trigger: "blur" }
        ],
        service_time: [
          { required: true, message: "请选择服务日期", trigger: "change" }
        ],
        urgency: [
          { required: true, message: "请选择紧急程度", trigger: "change" }
        ]
        // service_item_id: [
        //     { required: true, message: '请选择服务项目', trigger: 'change' },
        // ]
      },
      // 列表和分页获取相关
      currPage: 1,
      pageSize: 10,
      order: "DESC",
      total: 0,

      // 检索的相关字段
      searchMsg: "",
      searchDate: "",
      searchState: "",
      statusOptions: [
        {
          label: "待分配",
          value: 0
        },
        {
          label: "待派单",
          value: 1
        },
        {
          label: "待服务",
          value: 2
        },
        {
          label: "服务中",
          value: 3
        },
        {
          label: "已完成",
          value: 4
        }
      ],

      // 服务记录弹出框
      showRecordDialog: false,
      showRecordDataLoading: false,

      showRecordsData: [],

      // 服务记录 列表和分页获取相关
      showRecordCurrPage: 1,
      showRecordPageSize: 10,
      showRecordOrder: "DESC",
      showRecordTotal: 0,

      expireTimeOption: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      }
    };
  },
  mounted: function() {
    this.$nextTick(function() {
      this.getDataList();
    });
  },
  methods: {
    showRecord() {
      if (!this.callData.name) {
        this.$message({
          type: "warning",
          message: "请先查询残疾人信息"
        });
        return false;
      }
      this.showRecordDialog = true;

      this.getServiceRecords();
    },

    // 根据残疾人号获取服务记录
    async getServiceRecords() {
      this.showRecordDataLoading = true;

      let res = await this.axios({
        method: "GET",
        url: "/service_info/" + this.callData.idCode + "/call/records",
        params: {
          currPage: this.showRecordCurrPage,
          pageSize: this.showRecordPageSize,
          order: this.showRecordOrder
        }
      });

      this.showRecordsData = res["dataList"];
      this.showRecordTotal = res["total"];

      this.showRecordDataLoading = false;
    },

    addCall() {
      this.dialogVisible = true;
    },
    handleClose() {
      this.dialogVisible = false;
      this.$refs["callForm"].resetFields();
    },
    formSubmit() {
      if (!this.callData.name) {
        this.$message({
          type: "warning",
          message: "没有残疾人信息,无法提交"
        });
        return false;
      }
      this.$refs["callForm"].validate(valid => {
        if (valid) {
          this.formLoading = true;
          this.callData.begin_time = this.callData.service_time[0];
          this.callData.end_time = this.callData.service_time[1];
          this.callData.orderInfo.service_item_id = this.callData.service_item_id;
          this.callData.orderInfo.service_enprise_id = this.callData.service_enprise_id;

          this.axios({
            url: "/service_info/call/records",
            method: "POST",
            data: this.callData
          })
            .then(res => {
              this.formLoading = false;
              this.dialogVisible = false;
              if (res.code === "success") {
                this.$message({
                  type: "success",
                  message: "新增来电记录"
                });
                // 新增记录后更新获取列表
                this.getDataList();
                this.$refs["callForm"].resetFields();

                // 清空信息
                this.callData.disable_member_id = "";
                this.callData.name = "";
                this.callData.sex = "";
                this.callData.idCode = "";
                this.callData.disableType = "";
                this.callData.disableTypeName = "";
                this.callData.addr = "";
                this.callData.phone = "";
                this.callData.committeeName = "";
                // 社区负责人 社区负责人电话
                this.callData.phone = "";
                this.callData.phone = "";
                this.callData.committeeCare = "";
                this.callData.committeeCarePhone = "";
                this.callData.score = "";

                this.callData.orderInfo.service_addr = "";
                this.serviceOptions = "";
              } else {
                this.$message({
                  type: "warning",
                  message: "信息提交错误"
                });
              }
            })
            .catch(e => {
              this.$message({
                type: "warning",
                message: e
              });
              this.formLoading = false;
            });
        } else {
          return false;
        }
      });
    },
    detailClick(row) {
      this.$router.push({
        path: "/esc/center/2/2-1/2-1-1",
        query: { id: row.id }
      });
    },
    //根据id获取残疾人信息
    getBydisId() {
      this.$refs["callForm"].validateField("disable_member_id", error => {
        if (!error) {
          this.formLoading = true;
          this.axios({
            method: "GET",
            url:
              "http://39.98.54.35:8083/disable-help-bayan/center/getByIdCode",
            params: {
              idCode: this.callData.disable_member_id,
              province: this.userData.provinceCode,
              city: this.userData.cityCode,
              area: this.userData.districtCode
            }
          }).then(res => {
            this.formLoading = false;
            if (res.msg === "success") {
              this.callData.name = res["disableMemberVO"]["name"];
              this.callData.sex = res["disableMemberVO"]["sex"] === 1 ? 1 : 0;
              this.callData.idCode = res["disableMemberVO"]["idCode"];
              this.callData.disableType = res["disableMemberVO"]["disableType"];
              this.callData.disableTypeName =
                res["disableMemberVO"]["disableTypeName"];
              this.callData.addr = res["disableMemberVO"]["address"];
              this.callData.phone = res["disableMemberVO"]["mobile"];
              this.callData.committeeName = res["committee"]["name"];
              // 社区负责人 社区负责人电环
              this.callData.committeeCare = res["committeeUser"]
                ? res["committeeUser"]["realName"]
                : "";
              this.callData.committeeCarePhone = res["committeeUser"]
                ? res["committeeUser"]["mobile"]
                : "";
              this.callData.score = res["score"];
              this.callData.orderInfo.service_addr =
                res["disableMemberVO"]["address"];
              this.serviceOptions = res["financialRechargeEntityList"].filter(
                v => v !== null
              );
            } else {
              this.$message({
                type: "warning",
                message: "信息获取失败"
              });

              this.callData.name = "";
              this.callData.sex = "";
              this.callData.idCode = "";
              this.callData.disableType = "";
              this.callData.disableTypeName = "";
              this.callData.addr = "";
              this.callData.phone = "";
              this.callData.committeeName = "";
              // 社区负责人 社区负责人电话
              this.callData.phone = "";
              this.callData.phone = "";
              this.callData.committeeCare = "";
              this.callData.committeeCarePhone = "";
              this.callData.score = "";

              this.callData.orderInfo.service_addr = "";
              this.serviceOptions = "";
            }
          });
        } else {
          return false;
        }
      });
    },

    // 检索
    search() {
      this.currPage = 1;
      this.getDataList();
    },

    // 清空搜索
    searchAll() {
      this.currPage = 1;

      this.searchDate = "";
      this.searchMsg = "";
      this.searchState = "";

      this.getDataList();
    },

    getDataList() {
      this.dataLoading = true;
      this.axios({
        method: "GET",
        url: "/service_info/call/records",
        params: {
          currPage: this.currPage,
          pageSize: this.pageSize,
          order: this.order,
          start_date: this.searchDate ? this.searchDate[0] : "",
          end_date: this.searchDate ? this.searchDate[1] : "",
          status: this.searchState,
          search_msg: this.searchMsg
        }
      })
        .then(res => {
          this.dataLoading = false;
          if (res.code === "list") {
            this.tableData = res.dataList;
            this.total = res.total;
          }
        })
        .catch(e => {
          this.dataLoading = false;
        });
    },

    handleCurrentChange(val) {
      this.currPage = val;
      this.getDataList();
    },

    handleRecordCurrentChange(val) {
      this.showRecordCurrPage = val;
      this.getServiceRecords();
    }
  }
};
</script>

<style scoped>
</style>
