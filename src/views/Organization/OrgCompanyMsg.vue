<template>
    <div v-loading="dataLoading">
        <ptitle title="机构信息"></ptitle>
        <el-form ref="form" :model="data" label-width="120px" size="small" :label-position="'left'" style="padding: 0 120px;">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="机构名称:">
                        {{data.name}}
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="编号/账号:">
                        {{data.no}}
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="联系电话:">
                        {{data.contactsPhone}}
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="负责人:">
                        {{data.leader}}
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="地址:">
                        {{data.addr}}
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="邮箱:">
                        {{data.mail}}
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="注册时间:">
                        {{data.registerTime}}
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <ptitle title="机构照片" v-if="data.branchImageList.length !== 0"></ptitle>
        <div class="image-box" v-if="data.branchImageList.length !== 0">
            <el-image :fit="'cover'" v-for="(item, index) in data.branchImageList" :src="item | imgBaseUrl" :key="item.imageUrl" :preview-src-list="data.branchImageList | imgList(index)">
                <div slot="placeholder" class="image-slot">
                    加载中<span class="dot">...</span>
                </div>
            </el-image>
        </div>
    </div>
</template>

<script>
    export default {
        name: "OrgCompanyMsg",
        data(){
            return {
                dataLoading: false,
                data: {
                    branchImageList: []
                },
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
                    url: '/service/branches/info/getById',
                    params: {
                        id: JSON.parse(localStorage.getItem('Auth')).id
                    }
                }).then(res => {
                    this.data = res['data'];
                    this.dataLoading = false;

                })
            }

        }
    }
</script>

<style scoped>

</style>
