<template>
    <main class="homePage">
        <section class="homePage-header">
            <figure class="homePage-bg"></figure>
        </section>
        <section class="homePage-content">
            <div class="homePage-content-list">
                <Swiper></Swiper>
            </div>
        </section>
       
    </main>
</template>

<script>

import Swiper from '~/components/Swiper.vue'

export default {
    layout: 'hasHeader',
    components: {
        Swiper
    }
}
</script>

<style lang='scss' scoped>
    @import '~/assets/css/homepage.scss';
</style>
