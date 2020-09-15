<template>
  <div style="height: 100vh;display: flex; justify-content: center; align-items: center;">
    <el-form :model="loginForm" :rules="rules" ref="form" style="width: 30%;">
      <el-form-item label="账号" prop="userName">
        <el-input v-model="loginForm.userName" autocomplete="off" @keyup.enter.native="login()"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="loginForm.password"
          autocomplete="new-password"
          @keyup.enter.native="login()"
        ></el-input>
      </el-form-item>
      <!-- <el-form-item prop="type">
                <el-radio-group v-model="loginForm.type" @keyup.enter.native="login()">
                    <el-radio label="1">服务中心登录</el-radio>
                    <el-radio label="2">服务机构登录</el-radio>
                </el-radio-group>
      </el-form-item>-->
      <el-form-item>
        <el-button type="primary" @click="login()" :loading="onLoading">登录</el-button>
        <el-button type="default" @click="forgotPassword()">忘记密码?</el-button>
      </el-form-item>
    </el-form>

    <!--对话框-->
    <el-dialog
      :title="'找回密码'"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
      :destroy-on-close="true"
    >
      <div class="form-box percent-70" v-loading="formLoading">
        <el-form
          ref="forgotForm"
          :model="forgotForm"
          :rules="forgotRules"
          label-width="120px"
          size="small"
        >
          <el-form-item label="账号" prop="user_name">
            <el-input v-model="forgotForm.user_name"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="e_mail">
            <el-input v-model="forgotForm.e_mail"></el-input>
          </el-form-item>
          <el-form-item prop="type">
            <el-radio-group v-model="forgotForm.type">
              <el-radio label="enterprise">服务中心找回</el-radio>
              <el-radio label="branch">服务机构找回</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="handleClose">取消</el-button>
          <el-button size="small" type="primary" @click="forgotFormSubmit">提交</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      onLoading: false,
      loginForm: {
        userName: "",
        password: "",
        type: "",
      },
      rules: {
        userName: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        type: [
          { required: true, message: "请选择登录类别", trigger: "change" },
        ],
      },

      dialogVisible: false,
      formLoading: false,
      forgotForm: {
        user_name: "",
        e_mail: "",
        type: "",
      },
      forgotRules: {
        user_name: [
          {
            required: true,
            message: "请输入要找回密码的账号",
            trigger: "blur",
          },
        ],
        e_mail: [
          {
            required: true,
            message: "请输入注册时填写的邮箱",
            trigger: "blur",
          },
          { validator: this.emailValid, trigger: "blur" },
        ],
        type: [
          {
            required: true,
            message: "请选择要找回的账号类别",
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    login() {
      // 后端登录没做好暂用此登录代替
      // localStorage.setItem("Auth", this.loginForm.userName);
      // let auth = localStorage.getItem('Auth');
      // this.$router.addRoutes(this.$getAuthRouter(auth))
      // this.$router.push('/1')

      // let url = this.loginForm.type === '1'?'/enterprises/user/login':'/service/branches/info/login';
      // this.$refs['form'].validate( valid => {
      //     if(valid){
      //         this.onLoading = true;

      //         this.axios({
      //             method: 'POST',
      //             url: url,
      //             data: this.loginForm
      //         }).then(res => {
      //             // 成功 提示 跳转 设置store
      //             // 登录后的访问鉴权 区分不同权限Add不同的路由 // [] 准备机构路由
      //             this.onLoading = false;
      //             if(res.code === 'success'){
      //                 this.$message({
      //                     type: 'success',
      //                     message: '登录成功！'
      //                 });
      //                 localStorage.setItem("Auth", JSON.stringify(res.data));
      //                 this.$router.push('/esc');
      //             } else {
      //                 this.$message({
      //                     type: 'warning',
      //                     message: res.errorMsg
      //                 });
      //             }
      //         }).catch(e => {
      //             this.onLoading = false;
      //         })
      //     } else {
      //         return false;
      //     }
      // })
      localStorage.setItem(
        "Auth",
        JSON.stringify({
          cityCode: "230100000000",
          cityName: "哈尔滨市",
          createDate: "2020-05-18 10:02:29",
          districtCode: "230126000000",
          districtName: "巴彦县",
          email: "769@163.com",
          enterpriseId: 11,
          id: 11,
          personalId: 11,
          provinceCode: "230000000000",
          provinceName: "黑龙江省",
          role: 1,
          status: 1,
          statusChangeTime: "2020-05-18 10:02:29",
          type_id: 1,
          userName: "230126000000",
        })
      );
      this.$router.push("/esc");
    },

    forgotPassword() {
      // this.$router.push('/forgotPassword');
      this.dialogVisible = true;
    },

    handleClose() {
      this.$refs["forgotForm"].resetFields();
      this.dialogVisible = false;
    },
    forgotFormSubmit() {
      this.$refs["forgotForm"].validate((valid) => {
        if (valid) {
          this.formLoading = true;
          this.axios({
            method: "POST",
            url: "/mail/back/password",
            data: this.forgotForm,
          }).then((res) => {
            if (res.code === "success") {
              this.$message({
                type: "success",
                message: res.data,
              });
              this.$refs["forgotForm"].resetFields();
            } else {
              this.$message({
                type: "warning",
                message: res.data,
              });
            }

            this.formLoading = false;
          });
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
</style>
