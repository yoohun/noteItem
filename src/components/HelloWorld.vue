<template>
    <div class='content'>
        <router-link to='./layout.vue' class='link'>链接到layout页面</router-link>
    </div>
</template>
<script>
    export default {
        data () {
            return {
            }
        }
    }
</script>
<style lang='less' scoped>
    .content{
        padding: 40px;
        .link{
            color: black;
            font-size: 18px;
            &:hover{
                color: blue;
            }
        }
    }

</style>
