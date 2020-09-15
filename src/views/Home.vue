<template>
    <div id="main">
        <header>
            <div class="header-left">
                <i class="el-icon-office-building"></i>
                <span>服务{{auth.role === 2?'机构':'中心'}}</span>
            </div>
            <div class="header-right">
<!--                <el-input size="small" v-model="searchInput" placeholder="请输入要搜索的内容">-->
<!--                    <i class="el-icon-search el-input__icon" slot="suffix" @click="handleIconClick"-->
<!--                       style="cursor: pointer"></i>-->
<!--                </el-input>-->
                <el-badge is-dot class="item">
                    <i class="el-icon-bell"></i>
                </el-badge>
                <el-badge is-dot class="item">
                    <i class="el-icon-service"></i>
                </el-badge>
                <el-badge class="item">
                    <el-dropdown trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        <i class="el-icon-s-tools" style="color: #fff;font-size: 20px"></i>
                    </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item icon="el-icon-lock"  command="goSetPassword">修改密码</el-dropdown-item>
                            <el-dropdown-item icon="el-icon-switch-button" command="logout">退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-badge>

            </div>
        </header>
        <div class="main">
            <div class="main-left">
                <div class="user-info">
                    <div>
                        <i class="el-icon-cloudy"></i>
                        {{auth.role === 2?auth.name:auth.userName}}
                    </div>
                    <template v-if="auth.role === 1">
                        {{(auth.provinceName + auth.cityName + auth.districtName)||''}}
                    </template><br />
                    {{'超级管理员/管理员'}}
                </div>
                <el-menu
                        v-if="auth"
                        class="el-menu-vertical-demo"
                        :default-active="activeIndex"
                        :router="true"
                        :unique-opened="true"
                        @open="handleOpen"
                        @close="handleClose">

                    <template v-for="item in routerNav">
                        <!-- 没有children的路由 并且不是伪子路由的路由 和不是admin显示的路由  12-30 修改 admin只显示区域管理-->
                        <!--item.hasOwnProperty('children') 父路由-->
                        <!--item.meta.isChild 伪路由-->
                        <!--item.meta.isAdmin admin显示导航-->

                        <el-menu-item v-if="!item.hasOwnProperty('children')&&!item.meta.isChild&&!item.meta.isAdmin&&auth.userName !=='admin'" :index="navMainPath + '/' + item.path" :key="item.path">
                            <i :class="item.icon"></i>
                            <span slot="title">{{item.name}}</span>
                        </el-menu-item>
                        <!-- 有children的路由 并且不是伪子路由的路由 和不是admin显示的路由 12-30 修改 admin只显示区域管理-->
                        <el-submenu v-else-if="!item.meta.isChild&&!item.meta.isAdmin&&auth.userName !=='admin'" :index="item.path" :key="item.path">
                            <template slot="title">
                                <i :class="item.icon"></i>
                                <span>{{item.hasChildName}}</span>
                                <!--父路由nav上的待审批-->
                                <el-tag size="mini"
                                        style="margin-left: 4px"
                                        v-if="item.path === '5'&&$store.state.approveNumber!==0"
                                        type="danger">
                                    {{$store.state.approveNumber}}
                                </el-tag>
                            </template>
                            <template v-for="child in item.children">
                                <el-menu-item v-if="!child.hasOwnProperty('redirect')" :index="navMainPath + '/' + item.path + '/' + child.path" :key="child.path">
                                    {{child.name||child.hasChildName}}

                                    <!--子路由nav上的待审批-->
                                    <el-tag size="mini"
                                            style="margin-top: -2px"
                                            v-if="child.path === '5-2'&&$store.state.approveNumber!==0"
                                            type="danger">
                                        {{$store.state.approveNumber}}
                                    </el-tag>
                                </el-menu-item>
                            </template>
                        </el-submenu>
                        <!--meta信息里 isAdmin true 并且 登录账号为admin 此路由显示-->
                        <el-menu-item v-if="item.meta.isAdmin&&auth.userName ==='admin'" :index="navMainPath + '/' + item.path" :key="item.path">
                            <i :class="item.icon"></i>
                            <span slot="title">{{item.name}}</span>
                        </el-menu-item>
                    </template>
                </el-menu>
            </div>
            <div class="main-right">
                <div class="bread">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item v-for="(item, index) in routerArr" :key="index" :to="item.path" >{{item.name}}</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <transition name="fade-transform" mode="out-in">
                    <router-view id="router-view" />
                </transition>
            </div>
        </div>

        <el-dialog title="修改密码" :visible.sync="dialogVisible" width="50%" :before-close="handleDialogClose">
            <div class="form-box" v-loading="formLoading">
                <el-form :model="formData" :rules="rules" style="padding: 0 10px"  size="small" ref="form" label-width="100px"
                         class="demo-ruleForm">
                    <el-form-item label="账号" prop="userName">
                        <el-input type="text" disabled v-model="formData.userName" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="旧密码" prop="oldPassword">
                        <el-input type="password" v-model="formData.oldPassword" autocomplete="new-password"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="newPassword">
                        <el-input type="password" v-model="formData.newPassword" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="newPasswordConfirm">
                        <el-input type="password" v-model="formData.newPasswordConfirm" autocomplete="off"></el-input>
                    </el-form-item>
                    <!--                <el-form-item prop="type">-->
                    <!--                    <el-radio-group v-model="formData.type">-->
                    <!--                        <el-radio label="1">修改服务中心密码</el-radio>-->
                    <!--                        <el-radio label="2">修改服务机构密码</el-radio>-->
                    <!--                    </el-radio-group>-->
                    <!--                </el-form-item>-->
                    <el-form-item>
                        <el-button type="primary" @click="setPassword()">确认修改</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    // @ is an alias to /src

    export default {
        name: 'home',
        components: {},
        data() {
            return {
                // 修改密码相关
                dialogVisible: false,
                formLoading: false,
                formData: {
                    userName: JSON.parse(localStorage.getItem('Auth')).userName,
                    oldPassword: '',
                    newPassword: '',
                    newPasswordConfirm: '',
                    type: JSON.parse(localStorage.getItem('Auth')).role
                },
                rules: {
                    oldPassword: [
                        {required: true, message: '请输入旧密码', trigger: 'blur'}
                    ],
                    newPassword: [
                        {required: true, message: '请输入新密码', trigger: 'blur'},
                        {validator: this.validatePass, trigger: 'blur'}
                    ],
                    newPasswordConfirm: [
                        {required: true, message: '请输入确认密码', trigger: 'blur'},
                        {validator: this.validateCheckPass, trigger: 'blur'}
                    ]
                },

                auth: JSON.parse(localStorage.getItem('Auth')),
                navMainPath: '/esc/' + (JSON.parse(localStorage.getItem('Auth')).role === 1? 'center':'org'),
                searchInput: '',
                webSocket: {},
            }
        },
        computed: {
            routerArr() {
                return this.$route.meta.bread;
            },
            routerNav(){
                // 新增路由时要注意此处索引获取的index
                let navArr = this.auth.role === 1?this.$router.options.routes[1].children[0]:this.$router.options.routes[1].children[1];
                return navArr.children.filter(v => {
                    return !v.hasOwnProperty('redirect');
                });
            },
            activeIndex(){
                // 含有isChild(在外的伪子路由) 截取伪父层path做active-index
                return this.$route.meta.isChild?this.$route.meta.bread[1].path.split('-')[0]:(this.$route.meta.bread.length>1?this.$route.meta.bread[1].path:this.$route.meta.bread[0].path);
            }
        },
        created: function(){
        },
        destroyed: function(){
            if(this.webSocket.hasOwnProperty('close')){
                this.webSocket.close();
            }
        },
        mounted: function () {
            this.$nextTick(() => {
                if(this.auth.role !== 2){
                    this.getApprove();
                } else {
                    this.$store.commit('setApproveNumber', 0);
                    let url;
                    if(this.axios.defaults.baseURL === '/enterprise_service_center'){
                        url = 'ws://47.104.161.160:8081/enterprise_service_center'
                    } else {
                        url = 'ws://' + this.axios.defaults.baseURL.split('://')[1]
                    }
                    this.webSocket = new WebSocket(url+'/websocket')
                    this.webSocket.onmessage =  res => {
                        if(JSON.parse(res.data).branches_id == this.auth.id){
                            this.$notify.info({
                                title: '消息',
                                message: '服务中心有新的派单!'
                            });
                        }
                    };
                    this.webSocket.onerror =  e => {
                        console.log(e)
                    };
                }
            })
        },
        methods: {

            initSocket(){

            },

            // 获取待审批活动数
            getApprove(){
                this.axios({
                    method: 'GET',
                    url: '/activities/total?status=0'
                }).then(res => {
                    if(res.code === 'single'){
                        this.$store.commit('setApproveNumber', res.total);
                    }
                })
            },

            handleIconClick() {

            },
            handleOpen() {
            },
            handleClose() {
            },

            // 左上角点击dropdown 处理
            handleCommand(command) {
                // Method method = this.class.getMethod(command);
                // method.invoke(this.class.newInstance());
                if(command === 'logout'){
                    this.logout();
                } else if(command === 'goSetPassword'){
                    this.goSetPassword();
                }
            },

            // 登录后 this.$store.commit("setAuth", 1)
            logout() {
                this.$confirm('确定要退出登录吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '退出!'
                    });
                    localStorage.removeItem('Auth');
                    // 同样path 在不同权限下注册不同组件，切换账号会出现组件已经注册的问题 后续解决（除了不同路径的路由 应该还有其他方法）
                    this.$router.push('/login');
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消退出'
                    });
                });
            },

            // 修改密码弹出层
            goSetPassword(){
                // this.$router.push("/setPassword");
                this.dialogVisible = true;
            },

            handleDialogClose(){
                this.dialogVisible = false;
                this.$refs['form'].resetFields();
            },

            setPassword() {
                this.$refs['form'].validate(valid => {

                    let url = this.formData.type === 1?'/enterprises/user/changePassword':'/service/branches/info/changePassword';
                    if (valid) {
                        this.formLoading = true;

                        this.axios({
                            method: 'PUT',
                            url: url,
                            data: this.formData
                        }).then(res => {
                            this.formLoading = false;
                            if(res.code === 'success'){
                                this.$message({
                                    type: 'success',
                                    message: '修改成功！'
                                });
                                this.$refs['form'].resetFields();
                                // 修改成功返回登录页重新登录
                                localStorage.removeItem('Auth');
                                this.$router.push('/login');
                            } else {
                                this.$message({
                                    type: 'warning',
                                    message: res.errorMsg
                                });
                            }
                        }).catch(e => {
                            this.formLoading = false;
                        })
                    } else {
                        return false;
                    }
                })
            },
            validatePass(rule, value, callback) {
                if (this.formData.newPasswordConfirm !== ''&&value !== this.formData.newPasswordConfirm) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    this.$refs['form'].clearValidate('newPasswordConfirm');
                    callback();
                }
            },
            validateCheckPass(rule, value, callback) {
                if (value !== this.formData.newPassword) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    this.$refs['form'].clearValidate('newPassword');
                    callback();
                }
            }
        }
    }
</script>
<style scoped lang="scss">
    .fade-transform-leave-active,
    .fade-transform-enter-active {
        transition: all .3s;
    }

    .fade-transform-enter {
        opacity: 0;
        transform: translateX(20px);
    }

    .fade-transform-leave-to {
        opacity: 0;
        transform: translateX(-20px);
    }

    #router-view {
        height: calc(100% - 60px);
        box-sizing: border-box;
        padding: 15px;
        margin: 5px;
    }

    .el-dropdown-menu{
        width: 140px;
    }
</style>
