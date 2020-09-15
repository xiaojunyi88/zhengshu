<template>
  <div v-loading="dataLoading">
    <ptitle title="账号管理"></ptitle>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" align="center" width="50"></el-table-column>

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
  name: "AccountManage",
  data() {
    return {
      dataLoading: false,
      tableData: [],

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
      this.$router.push({ path: "/esc/center/9-1", query: { id: row.id } });
    },

    getDataList() {
      this.dataLoading = true;
      this.axios({
        method: "GET",
        url:
          "http://39.98.54.35:8083/disable-help-bayan/center/disablememberpage",
        params: {
          limit: this.pageSize,
          page: this.currPage
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
