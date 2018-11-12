<template>
    <div class="aplayer-wrap" id='aplayer-wrap' @mouseover="aplayerBtnHover" @mouseout="aplayerBtnHoverOut">
        <aplayer :music="musicOptions"/>
        <div class="aplayer-btn" @click="showPlayer" >
            <span class="aplayer-iconWrap" id='icon-zhankai'><i id='icon-zhankai' class="iconfont icon-zhankai"></i></span>
        </div>
    </div>
</template>

<script>
import Aplayer from 'vue-aplayer'
export default {
    components: {
        Aplayer
    },
    mounted () {
        $('.aplayer').eq(0).css({width:'0px'})
    },
    data() {
        return {
            musicOptions: {
                title: 'secret base~君がくれたもの~',
                artist: 'Silent Siren',
                src: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.mp3',
                pic: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.jpg'
            },
            showPlayerStatus: false
        }
    },
    methods: {
        showPlayer(){
            if(this.showPlayerStatus){
                $('.aplayer').eq(0).css({width:'0px'})
                $('#icon-zhankai').css({transform: 'rotate(0deg)'})
            }else{
                $('.aplayer').eq(0).css({width:'361px'})
                $('#icon-zhankai').css({transform: 'rotate(180deg)'})
            }
            this.showPlayerStatus = !this.showPlayerStatus
        },
        aplayerBtnHover(){
            if(!this.showPlayerStatus){
                $('.aplayer').eq(0).css({width:'66px'})
            }
        },
        aplayerBtnHoverOut(){
            if(!this.showPlayerStatus){
                $('.aplayer').eq(0).css({width:'0px'})
            }
        }
    }
}
</script>

<style lang='scss'>
.aplayer-wrap{
    position: fixed;
    left: 0px;
    display: flex;
    bottom: 0;
    z-index: 999999999;
    transition: all 0.5s ease;
    .aplayer{
        margin: 5px 0;
        transition: all 0.5s ease;
    }
    .aplayer-btn{
        cursor: pointer;
        width: 20px;
        line-height: 66px;
        text-align: center;
        height: 66px;
        margin: 5px 0;
        background: #ddd;
        border-radius: 0px 2px 2px 0; 
        color: #ccc;
        box-shadow: 0 2px 2px 0 rgba(0,0,0,.07), 0 1px 5px 0 rgba(0,0,0,.1);
        .aplayer-iconWrap{
            display: inline-block;
            transition: all 0.3s ease;
            i{
                font-size: 14px;
                color: #666;
            } 
        }   
        &:hover{
            color: #000;
        }
    }
}
</style>
