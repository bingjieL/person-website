<template>
    <div>
        <Header></Header>
        <main>
            <nuxt></nuxt>
        </main>
        <no-ssr>
            <Aplayer></Aplayer>
        </no-ssr>
        <!-- <Footer></Footer> -->
    </div>
</template>

<script>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import Aplayer from '~/components/Aplayer.vue'
export default {
    components: {
        Header,
        Aplayer,
        Footer
    }
}
</script>

<style>
    main{
        min-height: 50vh;
    }
</style>

