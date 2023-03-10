<template>
    <div class="text-center">
        <img src="@/assets/images/Error/404.svg" style="max-height:calc(100vh - var(--navHeight) - var(--footerHeight));">
        <br>
        <button class="btn btn-primary center" type="button" @click="NotFoundBack">回首頁</button>
    </div>
</template>

<script>
export default {
    name: 'errorPage',
    methods: {
        NotFoundBack() {
            this.$router.push('/')
        },
    },
}
</script>