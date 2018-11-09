<template>
    <div class="scroll-progress" ref='scrollProgress'>
        
    </div>
</template>

<script>
export default {
    mounted () {
        this.changeScrollProgressWidth()
        window.onscroll = () => {
            this.changeScrollProgressWidth()
        }
    },
    methods: {
        changeScrollProgressWidth() {
            let _clientHeight = document.documentElement.clientHeight
            let _scrollHeight = document.body.scrollHeight - _clientHeight  
            let _scrollTop = document.documentElement.scrollTop||document.body.scrollTop
            this.$refs.scrollProgress.style.width = `${(_scrollTop/_scrollHeight)*100}%`
        }
    }
}
</script>

<style lang='scss'>
.scroll-progress{
    width: 0%;
    height: 2px;
    background: orange;
    border-radius: 1px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    transition: all .2s ease;
}
</style>
