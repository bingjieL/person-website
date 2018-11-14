<template>
    <div class="mainHeader">
        <div class="scroll-progress" ref='scrollProgress'></div>
        <header ref='header' @mouseover="headerHover"  @mouseout="headerHoverOut($event)">
            <div class="left" >
                <nuxt-link to='/homePage'>
                    <h3><span>JAY</span>~小栈</h3>
                </nuxt-link>
            </div>
            <nav class="right" id='nav-right'>
                <ul ref='nav'>
                    <li @mouseover="setHoverClass('homeIcon', 'flash')" @mouseout="rmHoverClass('homeIcon', 'flash')">
                        <span ref='homeIcon' class="icon animated"><i class="iconfont icon-home"></i></span> 
                        Home
                    </li>
                    <li @mouseover="setHoverClass('aboutIcon', 'shake')" @mouseout="rmHoverClass('aboutIcon', 'shake')">
                        <span ref='aboutIcon' class="icon animated"><i class="iconfont icon-about"></i></span> 
                        About
                    </li>
                    <li @mouseover="setHoverClass('XinIcon', 'rotateIn')" @mouseout="rmHoverClass('XinIcon', 'rotateIn')">
                        <span ref='XinIcon' class="icon animated"><i class="iconfont icon-shenghuoaixinjuanzeng"></i></span> 
                        爱心
                    </li>
                    <li @mouseover="setHoverClass('lockIcon', 'flash')" @mouseout="rmHoverClass('lockIcon', 'flash')">
                        <span ref='lockIcon' class="icon animated"><i class="iconfont icon-ic_vpn_lock"></i></span> 
                        Lock
                    </li>
                     <li @mouseover="setHoverClass('liuyanIcon', 'bounce')" @mouseout="rmHoverClass('liuyanIcon', 'bounce')">
                        <span ref='liuyanIcon' class="icon animated"><i class="iconfont icon-liuyan"></i></span> 
                        留言
                    </li>
                     <li @mouseover="setHoverClass('projectIcon', 'flip')" @mouseout="rmHoverClass('projectIcon', 'flip')">
                        <span ref='projectIcon' class="icon animated"><i class="iconfont icon-project-o"></i></span> 
                        项目
                    </li>
                </ul>
               
            </nav>
            <div class="search-header">
                    <span class="animated search" ><i class="iconfont icon-search"></i></span>
                    <span ref='MineIcon' class="animated mine" @mouseover="setHoverClass('MineIcon', 'swing')" @mouseout="rmHoverClass('MineIcon', 'swing')"><i class="iconfont icon-wode"></i></span>
            </div>
        </header>
        <div class="goTop" ref='goTop' @click="gotop">
            <img  src="~/assets/img/logo/scroll.png" alt="scroll">
        </div>
    </div>
</template>

<script>
export default {
    mounted () {
        this.changeGoToplocation()
        this.changeScrollProgressWidth()
        window.onscroll = () => {
            this.changeGoToplocation()
            this.changeScrollProgressWidth()
        }
    },
    methods: {
        setHoverClass(icon, className) {
            this.$domHover(icon ,className)
        },
        rmHoverClass(icon, className) {
            this.$domRemoveClass(icon, className)
        },
        changeGoToplocation(){
            let scrollTop = document.documentElement.scrollTop||document.body.scrollTop
            if(scrollTop > 200){
                this.$refs.goTop.style.bottom = '15vh'
                this.$refs.header.classList.add('headerHover')
                $('#nav-right').fadeIn();
            }else{
                this.$refs.goTop.style.bottom = '100vh'
                this.$refs.header.classList.remove('headerHover')
                $('#nav-right').hide()
            }
        },
        headerHover() {

        },
        headerHoverOut(e) {
           
            let scrollTop = document.documentElement.scrollTop||document.body.scrollTop
            if(scrollTop > 200){
                
            }else{      
                // $('#nav-right').hide()
            }

        },
        gotop() {
            window.scrollTo(0,0)
        },
        changeScrollProgressWidth() {
            let _clientHeight = document.documentElement.clientHeight
            let _scrollHeight = document.body.scrollHeight - _clientHeight  
            let _scrollTop = document.documentElement.scrollTop||document.body.scrollTop
            this.$refs.scrollProgress.style.width = `${(_scrollTop/_scrollHeight)*100}%`
        }
    }
}
</script>

<style lang="scss">
    @import '~/assets/css/Header.scss';
</style>
