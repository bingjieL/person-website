<template>
    <div>
        <Header></Header>
        <nuxt></nuxt>
        <no-ssr>
            <Aplayer></Aplayer>
        </no-ssr>
    </div>
</template>

<script>
import Header from '~/components/Header.vue'
import Aplayer from '~/components/Aplayer.vue'
export default {
    components: {
        Header,
        Aplayer
    }
}
</script>

<style>

</style>

