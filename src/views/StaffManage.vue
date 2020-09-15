<template>
  <div v-loading="dataLoading">
    <ptitle title="人员管理"></ptitle>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" align="center" width="50"></el-table-column>
      <el-table-column prop="name" align="center" label="姓名"></el-table-column>
      <el-table-column prop="sexName" align="center" label="性别"></el-table-column>
      <el-table-column prop="age" align="center" label="年龄"></el-table-column>
      <el-table-column prop="serviceNum" align="center" label="服务次数"></el-table-column>
      <el-table-column prop="address" align="center" label="住址"></el-table-column>
      <el-table-column prop="mobile" align="center" label="电话"></el-table-column>
      <el-table-column prop="level" align="center" label="人员级别"></el-table-column>
      <el-table-column align="center" label="查看详情">
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
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "StaffManage",
  data() {
    return {
      dataLoading: false,
      tableData: [],
      userData: JSON.parse(localStorage.getItem("Auth")),

      // 列表和分页获取相关
      currPage: 1,
      pageSize: 10,
      order: "DESC",
      total: 0
    };
  },
  mounted: function() {
    this.$nextTick(function() {
      this.getDataList();
    });
  },
  methods: {
    // 查看详情
    detailClick(row) {
      this.$router.push({
        path: "/esc/center/3-1",
        query: { id: row.id, idCode: row.idCode }
      });
    },
    // 获取人员列表调用的外部接口
    getDataList() {
      this.dataLoading = true;
      this.axios({
        method: "GET",
        url:
          "http://39.98.54.35:8083/disable-help-bayan/center/disablememberpage",
        params: {
          limit: this.pageSize,
          page: this.currPage,
          province: this.userData.provinceCode,
          city: this.userData.cityCode,
          area: this.userData.districtCode
        }
      }).then(res => {
        this.dataLoading = false;
        if (res.code === 0) {
          this.tableData = res["page"]["list"];
          this.total = res["page"]["totalCount"];
        } else {
          this.$message({
            type: "warning",
            message: "数据获取失败"
          });
        }
      });
    },
    // 分页
    handleCurrentChange(val) {
      this.currPage = val;
      this.getDataList();
    }
  }
};
</script>

<style scoped>
</style>
