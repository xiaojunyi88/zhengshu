<template>
    <div class="Ptitle">
        <span class="title">{{title}}</span>
        <span class="info" v-if="title === '分支机构列表'">(提示: 登录账号为机构编号，初始密码123456)</span>
        <span class="info" v-if="title === '员工管理'">(提示: 登录账号为员工编号，初始密码123456)</span>
        <div class="slot-box">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Ptitle",
        props: ['title']
    }
</script>

<style scoped lang="scss">
    div.Ptitle{
        span.title{
            border-left: 5px solid #10a8ae;
            font-size: 16px;
            padding-left: 10px;
            height: 24px;
        }
        span.info{
            font-size: 14px;
            margin-left: 10px;
        }
        text-align: left;
        margin: 0 0 15px;
        height: 32px;
        line-height: 32px;
        .slot-box{
            float: right;
        }
    }
</style>
