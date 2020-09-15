<template>
    <div v-loading="dataLoading">
        <ptitle title="分支机构列表">
            <el-button v-if="auth.type_id === 1" @click="addOrg()" size="small" type="primary">新增分支机构</el-button>
        </ptitle>

        <el-row style="padding-bottom: 10px;margin-bottom: 10px">
            <el-col :span="3" style="margin-left: 10px;">
                <el-select size="small" v-model="searchOrg" style="width: 100%;" placeholder="请选择机构">
                    <el-option
                            v-for="item in orgOptions"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4" style="margin-left: 10px">
                <el-button type="primary" size="small" @click="search">搜索</el-button>
                <el-button type="default" size="small" @click="searchAll">清空</el-button>
            </el-col>
        </el-row>

        <!--列表-->
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column
                    type="index"
                    align="center"
                    width="50">
            </el-table-column>
            <el-table-column
                    prop="no"
                    align="center"
                    label="机构编号">
            </el-table-column>
            <el-table-column
                    prop="name"
                    align="center"
                    label="机构名称">
            </el-table-column>
            <el-table-column
                    prop="leader"
                    align="center"
                    label="联系人">
            </el-table-column>
            <el-table-column
                    prop="contactsPhone"
                    align="center"
                    label="联系电话">
            </el-table-column>
            <el-table-column
                    prop="mail"
                    align="center"
                    label="邮箱">
            </el-table-column>
            <el-table-column
                    prop="addr"
                    align="center"
                    label="机构地址">
            </el-table-column>
            <el-table-column
                    prop="status"
                    align="center"
                    label="状态">
                <template slot-scope="scope">
                    {{scope.row.status?'已开启':'已关闭'}}
                </template>
            </el-table-column>
            <el-table-column
                    prop="serviceItem"
                    :width="180"
                    :formatter="itemsFormatter"
                    align="center"
                    label="服务项目">
<!--                <template slot-scope="scope">-->
<!--                    {{scope.row.serviceItem.join('，')}}-->
<!--                </template>-->
            </el-table-column>
            <el-table-column
                    prop="registerTime"
                    align="center"
                    label="添加时间">
            </el-table-column>
            <el-table-column
                    v-if="auth.type_id === 1"
                    prop="name"
                    align="center"
                    label="编辑">
                <template slot-scope="scope">
                    <el-button @click="editClick(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button @click="statusClick(scope.row)" type="text" size="small">{{scope.row.status === 1?'停用':'启用'}}</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--分页-->
        <el-pagination
                background
                layout="total, prev, pager, next"
                :page-size="pageSize"
                :total="total"
                @current-change="handleCurrentChange">
        </el-pagination>

        <!--对话框-->
        <el-dialog :title="dialogText" :visible.sync="dialogVisible" width="50%" :before-close="handleClose" :destroy-on-close="true">

            <div class="form-box percent-70" v-loading="formLoading">
                <el-form ref="form" :model="formData" :rules="rules" label-width="120px" size="small">
                    <el-form-item label="机构名称" prop="name">
                        <el-input v-model="formData.name"></el-input>
                    </el-form-item>
                    <el-form-item label="联系人" prop="leader">
                        <el-input v-model="formData.leader"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话" prop="contactsPhone">
                        <el-input v-model="formData.contactsPhone"></el-input>
                    </el-form-item>
                    <el-form-item label="email" prop="mail">
                        <el-input v-model="formData.mail"></el-input>
                    </el-form-item>
                    <el-form-item label="机构地址" prop="addr">
                        <el-input v-model="formData.addr"></el-input>
                    </el-form-item>
                    <el-form-item label="初始密码">
                        123456
                    </el-form-item>
                    <el-form-item label="上传照片" prop="imgFlies">
                        <el-upload
                                :action="this.axios.defaults.baseURL + '/upload/file'"
                                list-type="picture"
                                :name="'file'"
                                :file-list="fileList"
                                :on-preview="handlePictureCardPreview"
                                :on-success="handleUpSuccess"
                                :on-remove="handleRemove">
                            <i class="el-icon-plus" style="font-size: 24px; border: 1px dashed #ccc; padding: 5px; border-radius: 3px"></i>
                        </el-upload>
                    </el-form-item>
<!--                    <el-form-item label="密码" prop="password">-->
<!--                        <el-input type="password" v-model="formData.password" autocomplete="new-password"></el-input>-->
<!--                    </el-form-item>-->
                    <el-form-item label="服务项目" prop="serviceItem">
                        <el-cascader
                                style="width: 100%"
                                v-model="formData.serviceItem"
                                :options="serviceItemList"
                                :props="{ expandTrigger: 'hover' , multiple: true, value: 'id', label: 'name'}"
                                clearable
                                @change="handleCascaderChange">
                        </el-cascader>
                    </el-form-item>
                    <!--<el-form-item label="当前账户状态">-->
                        <!--<el-switch v-model="formData.status"-->
                                   <!--:active-value="1"-->
                                   <!--:inactive-value="0"-->
                                   <!--active-text="开启"-->
                                   <!--inactive-text="关闭">-->

                        <!--</el-switch>-->
                    <!--</el-form-item>-->
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button size="small" @click="handleClose">取消</el-button>
                    <el-button size="small" type="primary" @click="formSubmit">提交</el-button>
                    <el-button size="small" type="primary" @click="initPassword" v-if="!isAdd">初始化密码</el-button>
                </span>
            </div>

        </el-dialog>

        <el-dialog :visible.sync="imgDialogVisible">
            <img width="100%" :src="imgDialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "BranchOrg",
        components: {},
        data() {
            return {

                dialogText: '',
                dialogVisible: false,
                dataLoading: false,
                formLoading: false,
                isAdd: true,
                currId: '',
                auth: JSON.parse(localStorage.getItem("Auth")),

                tableData: [],

                // 提交表单信息
                serviceItemList: [],
                fileList: [],
                formData: {
                    id: '',
                    no: '',
                    name: '',
                    leader: '',
                    contactsPhone: '',
                    addr: '',
                    mail: '',
                    registerTime: '',
                    imgFiles: '',
                    // userName: '',
                    // password: '',
                    // status: 1,
                    statusChangeTime: '',
                    serviceItem: []
                },
                // 验证规则
                rules: {
                    name: [
                        {required: true, message: '请输入机构名称', trigger: 'blur'},
                        {min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur'}
                    ],
                    leader: [
                        {required: true, message: '请输入联系人名称', trigger: 'blur'},
                        {min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur'}
                    ],
                    contactsPhone: [
                        {required: true, message: '请输入联系电话', trigger: 'blur'},
                        {validator: this.phoneValid, trigger: 'blur'}
                    ],
                    mail: [
                        {required: true, message: '请输入邮箱地址', trigger: 'blur'},
                        {validator: this.emailValid, trigger: 'blur'}
                    ],
                    addr: [
                        {required: true, message: '请输入机构地址', trigger: 'blur'},
                    ],
                    // userName: [
                    //     {required: true, message: '请输入登录账户', trigger: 'blur'},
                    // ],
                    // password: [
                    //     {required: true, message: '请输入密码', trigger: 'blur'},
                    //     {min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur'}
                    // ],
                    serviceItem: [
                        {required: true, message: '请选择项目', trigger: 'change'},
                    ],
                },

                // 检索的相关字段
                searchOrg: '',
                orgOptions: [],

                // 列表和分页获取相关
                currPage: 1,
                pageSize: 10,
                order: 'DESC',
                total: 0,

                imgDialogImageUrl: '',
                imgDialogVisible: false
            }
        },
        mounted: function () {
            this.$nextTick(async function () {
                this.getDataList();
                let branchRes = await this.getBranchesList();
                this.orgOptions = branchRes['dataList'];
            })
        },
        methods: {

            // 获取机构列表 下拉用
            getBranchesList(){
                return this.axios({
                    method: 'GET',
                    url: '/service/branches/info/getListSelectUse'
                })
            },

            // 获取可提供的服务项目
            async getServiceItemList(){
                return  this.axios({
                    method: 'GET',
                    url: '/service_info/type/group'
                });
            },

            // 新增dialog
            async addOrg() {
                this.dialogVisible = true;
                this.dialogText = '新增分支机构';
                this.formLoading = true;
                this.isAdd = true;

                let res = await this.getServiceItemList();
                this.serviceItemList = res['dataList'];

                this.formLoading = false;

            },
            // 编辑修改dialog
            async editClick(row) {
                this.dialogVisible = true;
                this.dialogText = '修改分支机构';
                this.formLoading = true;
                this.isAdd = false;

                let res = await this.getServiceItemList();
                this.serviceItemList = res['dataList'];

                this.currId = row.id;
                this.formData.name = row.name;
                this.formData.leader = row.leader;
                this.formData.mail = row.mail;
                this.formData.contactsPhone = row.contactsPhone;
                this.formData.addr = row.addr;
                // this.formData.userName = row.userName;
                this.formData.serviceItem = row.serviceItemIdList;
                // this.formData.status = row.status;

                // 取出机构的对应图片，存入图片上传组件用的fileList中
                this.fileList = row.branchImageList.map(v => {
                    return {name: v.imageUrl.split("/")[2], url: this.axios.defaults.baseURL + '/' + v.imageUrl}
                })

                this.formLoading = false;

            },
            // 停用启用
            statusClick(row) {
                let statusText = row.status === 1?'停用':'启用';
                this.$confirm('确认要'+statusText+'此机构吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.axios({
                        method: 'PUT',
                        url: '/service/branches/info/changeUsing',
                        data: {
                            ids: [row.id],
                            status: row.status === 1?0:1
                        }
                    }).then(res => {
                        if(res.code === 'success'){
                            this.$message({
                                type: 'success',
                                message: statusText+'成功!'
                            });
                        }
                        this.getDataList();
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消' + statusText
                    });
                });
            },
            handleClose() {
                this.dialogVisible = false;
                this.fileList = [];
                this.$refs['form'].resetFields();
            },

            handleCascaderChange(){

            },

            // dialog 提交
            formSubmit() {
                this.$refs['form'].validate( valid => {
                    if(valid){
                        let method = this.isAdd?'POST':'PUT';
                        let url = this.isAdd?'/service/branches/info/insert':'/service/branches/info/update';
                        this.formLoading = true;

                        // img fileList内的url 变为数组放入上传的formData中
                        this.formData.imgFiles = this.fileList.map(v => {
                            return v.hasOwnProperty("response")?v.response.data:v.url.split("/enterprise_service_center/")[1]
                        })

                        this.axios({
                            method: method,
                            url: url,
                            data: this.isAdd?this.formData:{...this.formData, id: this.currId}
                        }).then(res => {
                            this.formLoading = false;
                            if(res.code === 'success'){
                                this.$message({
                                    type: 'success',
                                    message: (this.isAdd?'新增':'修改') + '分支机构成功！'
                                });

                                this.fileList = [];
                                this.dialogVisible = false;
                                this.$refs['form'].resetFields();
                                this.getDataList();
                            } else {
                                this.$message({
                                    type: 'warning',
                                    message: (this.isAdd?'新增':'修改') + '分支机构失败！' + (res.errorMsg||'')
                                });
                            }
                        }).catch(e => {
                            this.$message({
                                type: 'warning',
                                message: e
                            });
                            this.formLoading = false;
                        })
                    } else {
                        return false;
                    }
                })
            },

            // 初始化密码
            initPassword(){

                this.$confirm('确认要初始化密码吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.formLoading = true;
                    this.axios({
                        method: 'PUT',
                        url: '/service/branches/info/resetPassword',
                        params: {
                            id: this.currId
                        }
                    }).then(res => {
                        if(res.code === 'success'){
                            this.$message({
                                type: 'success',
                                message: '初始化密码成功!'
                            });
                        } else {
                            this.$message({
                                type: 'warning',
                                message: '初始化密码失败!'
                            });
                        }
                        this.formLoading = false;
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消初始化密码'
                    });
                });
            },

            // 检索
            search(){
                this.currPage = 1;
                this.getDataList();
            },

            // 清空搜索
            searchAll(){
                this.currPage = 1;

                this.searchOrg = '';

                this.getDataList();
            },


            // 获取列表信息
            getDataList() {
                this.dataLoading = true;
                this.axios({
                    method: 'GET',
                    url: '/service/branches/info/getList',
                    params: {
                        currPage: this.currPage,
                        pageSize: this.pageSize,
                        order: this.order,
                        search_branches: this.searchOrg
                    }
                }).then(res => {
                    this.dataLoading = false;
                    if (res.code === 'list') {
                        this.tableData = res.dataList;
                        this.total = res.total;
                    }
                }).catch(e => {
                    this.dataLoading = false;
                })
            },
            // 分页控制
            handleCurrentChange(val) {
                this.currPage = val;
                this.getDataList();
            },

            // 服务项目显示过长的处理
            itemsFormatter(row){
                let text = row.serviceItem.join('，');
                if(text.length > 10){
                    text = text.substr(0, 10) + '...'
                }
                return text;
            },

            // 上传图片相关
            handleRemove(file, fileList) {
                this.fileList = fileList;
            },
            handleUpSuccess(response, file, fileList){
                this.fileList = fileList;
            },
            handlePictureCardPreview(file){
                this.imgDialogImageUrl = file.url;
                this.imgDialogVisible = true;
            }
        }
    }
</script>

<style scoped>

</style>
