<template>
    <transition name="fade-transform" mode="out-in">
        <router-view id="page-router" />
    </transition>
</template>

<script>
    export default {
        name: "PageRouter"
    }
</script>

<style scoped>
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

    #page-router {
        height: calc(100% - 50px);
    }
</style>
