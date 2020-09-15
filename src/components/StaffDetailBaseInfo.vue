<template>
  <div v-loading="dataLoading">
    <table class="data-table">
      <tr>
        <td>姓名:</td>
        <td>{{data.disableMemberEntity.name}}</td>
        <td>性别:</td>
        <td>{{data.disableMemberEntity.sex === 1?'男':'女'}}</td>
      </tr>
      <tr>
        <td>生日:</td>
        <td>{{data.disableMemberEntity.birthday}}</td>
        <td>民族:</td>
        <td>{{data.disableMemberEntity.nationName}}</td>
      </tr>
      <tr>
        <td>残疾证号:</td>
        <td>{{data.disableMemberEntity.idcode}}</td>
        <td>分值:</td>
        <td>{{data.score}}</td>
      </tr>
      <tr>
        <td>婚姻状况:</td>
        <td>{{data.disableMemberEntity.marryName}}</td>
        <td>人员级别:</td>
        <td>{{data.disableMemberEntity.levelName}}</td>
      </tr>
      <tr>
        <td>政治面貌:</td>
        <td>{{data.disableMemberEntity.politicsName}}</td>
        <td>文化程度:</td>
        <td>{{data.disableMemberEntity.educationName}}</td>
      </tr>
      <tr>
        <td>残疾类别:</td>
        <td>{{data.disableMemberEntity.disableTypeName}}</td>
        <td>残疾等级:</td>
        <td>{{data.disableMemberEntity.disableLevel}}级</td>
      </tr>
      <tr>
        <td>服务需求:</td>
        <td>{{data.disableMemberEntity.serviceRequestName}}</td>
        <td>慢性疾病:</td>
        <td>{{data.disableMemberEntity.chronicIllnessName}}</td>
      </tr>
      <tr>
        <td>地址:</td>
        <td>{{data.disableMemberEntity.address}}</td>
        <td>监护人:</td>
        <td>{{data.disableMemberEntity.guardianName}}</td>
      </tr>
      <tr>
        <td>户籍地址:</td>
        <td colspan="3">{{data.provinceName+data.cityName+data.areaName+data.streetName}}</td>
      </tr>
      <tr>
        <td>经济状况:</td>
        <td>{{data.disableMemberEntity.economicName}}</td>
        <td>兴趣爱好:</td>
        <td>{{data.disableMemberEntity.hobbyName}}</td>
      </tr>
      <tr>
        <td>生存状态:</td>
        <td>{{data.disableMemberEntity.liveName}}</td>
        <td>注销状态:</td>
        <td>{{data.disableMemberEntity.cancellationName}}</td>
      </tr>
      <tr>
        <td>失踪状态:</td>
        <td>{{data.disableMemberEntity.missingName}}</td>
      </tr>
    </table>

    <template>
      <!--            <el-form :label-position="'left'" ref="form" :model="data" label-width="120px" size="small" style="padding: 0 120px">-->
      <!--                <el-row>-->
      <!--                    <el-col :span="12">-->
      <!--                        <el-form-item label="姓名:">-->
      <!--                            {{data.disableMemberEntity.name}}-->
      <!--                        </el-form-item>-->
      <!--                    </el-col>-->
      <!--                    <el-col :span="12">-->
      <!--                        <el-form-item label="性别:">-->
      <!--                            {{data.disableMemberEntity.sex === 1?'男':'女'}}-->
      <!--                        </el-form-item>-->
      <!--                    </el-col>-->
      <!--                </el-row>-->
      <!--                <el-row>-->
      <!--                    <el-col :span="12">-->
      <!--                        <el-form-item label="生日:">-->
      <!--                            {{data.disableMemberEntity.birthday}}-->
      <!--                        </el-form-item>-->
      <!--                    </el-col>-->
      <!--                    <el-col :span="12">-->
      <!--                        <el-form-item label="民族:">-->
      <!--                            {{data.disableMemberEntity.nationName}}-->
      <!--                        </el-form-item>-->
      <!--                    </el-col>-->
      <!--                </el-row>-->
      <!--                <el-row>-->
      <!--                    <el-col :span="12">-->
      <!--                        <el-form-item label="婚姻状况:">-->
      <!--                            {{data.disableMemberEntity.marryName}}-->
      <!--                        </el-form-item>-->
      <!--                    </el-col>-->
      <!--                    <el-col :span="12">-->
      <!--                        <el-form-item label="人员级别:">-->
      <!--                            {{data.disableMemberEntity.levelName}}-->
      <!--                        </el-form-item>-->
      <!--                    </el-col>-->
      <!--                </el-row>-->
      <!--                <el-row>-->
      <!--                    <el-col :span="12">-->
      <!--                        <el-form-item label="政治面貌:">-->
      <!--                            {{data.disableMemberEntity.politicsName}}-->
      <!--                        </el-form-item>-->
      <!--                    </el-col>-->
      <!--                    <el-col :span="12">-->
      <!--                        <el-form-item label="文化程度:">-->
      <!--                            {{data.disableMemberEntity.educationName}}-->
      <!--                        </el-form-item>-->
      <!--                    </el-col>-->
      <!--                </el-row>-->
      <!--                <el-row>-->
      <!--                    <el-col :span="12">-->
      <!--                        <el-form-item label="残疾类别:">-->
      <!--                            {{data.disableMemberEntity.disableTypeName}}-->
      <!--                        </el-form-item>-->
      <!--                    </el-col>-->
      <!--                    <el-col :span="12">-->
      <!--                        <el-form-item label="残疾等级:">-->
      <!--                            {{data.disableMemberEntity.disableLevel}}级-->
      <!--                        </el-form-item>-->
      <!--                    </el-col>-->
      <!--                </el-row>-->
      <!--                <el-row>-->
      <!--                    <el-col :span="12">-->
      <!--                        <el-form-item label="服务需求:">-->
      <!--                            {{data.disableMemberEntity.serviceRequestName}}-->
      <!--                        </el-form-item>-->
      <!--                    </el-col>-->
      <!--                    <el-col :span="12">-->
      <!--                        <el-form-item label="慢性疾病:">-->
      <!--                            {{data.disableMemberEntity.chronicIllnessName}}-->
      <!--                        </el-form-item>-->
      <!--                    </el-col>-->
      <!--                </el-row>-->
      <!--                <el-row>-->
      <!--                    <el-col :span="12">-->
      <!--                        <el-form-item label="地址:">-->
      <!--                            {{data.disableMemberEntity.address}}-->
      <!--                        </el-form-item>-->
      <!--                    </el-col>-->
      <!--                    <el-col :span="12">-->
      <!--                        <el-form-item label="监护人:">-->
      <!--                            {{data.disableMemberEntity.guardianName}}-->
      <!--                        </el-form-item>-->
      <!--                    </el-col>-->
      <!--                </el-row>-->
      <!--                <el-row>-->
      <!--                    <el-col :span="12">-->
      <!--                        <el-form-item label="户籍地址:">-->
      <!--                            {{data.provinceName+data.cityName+data.areaName+data.streetName}}-->
      <!--                        </el-form-item>-->
      <!--                    </el-col>-->
      <!--                </el-row>-->
      <!--                <el-row>-->
      <!--                    <el-col :span="12">-->
      <!--                        <el-form-item label="经济状况:">-->
      <!--                            {{data.disableMemberEntity.economicName}}-->
      <!--                        </el-form-item>-->
      <!--                    </el-col>-->
      <!--                    <el-col :span="12">-->
      <!--                        <el-form-item label="兴趣爱好:">-->
      <!--                            {{data.disableMemberEntity.hobbyName}}-->
      <!--                        </el-form-item>-->
      <!--                    </el-col>-->
      <!--                </el-row>-->
      <!--                <el-row>-->
      <!--                    <el-col :span="12">-->
      <!--                        <el-form-item label="生存状态:">-->
      <!--                            {{data.disableMemberEntity.liveName}}-->
      <!--                        </el-form-item>-->
      <!--                    </el-col>-->
      <!--                    <el-col :span="12">-->
      <!--                        <el-form-item label="注销状态:">-->
      <!--                            {{data.disableMemberEntity.cancellationName}}-->
      <!--                        </el-form-item>-->
      <!--                    </el-col>-->
      <!--                </el-row>-->
      <!--                <el-row>-->
      <!--                    <el-col :span="12">-->
      <!--                        <el-form-item label="失踪状态:">-->
      <!--                            {{data.disableMemberEntity.missingName}}-->
      <!--                        </el-form-item>-->
      <!--                    </el-col>-->
      <!--                </el-row>-->
      <!--            </el-form>-->
    </template>
  </div>
</template>

<script>
export default {
  name: "StaffDetailBaseInfo",
  props: ["id"],
  data() {
    return {
      dataLoading: false,
      data: {
        disableMemberEntity: {}
      }
    };
  },
  watch: {
    id() {
      this.getData();
    }
  },
  mounted: function() {
    this.$nextTick(function() {});
  },
  methods: {
    getData() {
      this.dataLoading = true;
      this.axios({
        method: "GET",
        url:
          "http://39.98.54.35:8083/disable-help-bayan/center/disablememberinfo",
        params: {
          id: this.id
        }
      }).then(res => {
        this.data = res;
        this.dataLoading = false;
      });
    }
  }
};
</script>

<style scoped>
</style>
