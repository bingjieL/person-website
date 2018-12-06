<template>
    <div class="aplayer-wrap" id='aplayer-wrap' @mouseover="aplayerBtnHover" @mouseout="aplayerBtnHoverOut">
        <aplayer :music="musicOptions" :list="musicList"/>
        <div class="aplayer-btn" @click="showPlayer">
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
        $('.aplayer').eq(0).hide()
        this.changeMusicListLoca(this.musicList.length)
    },
    watch: {
     musicList:function(val){
         let length = val.length
     }   
    },
    data() {
        return {
            
            musicOptions: {
                title: 'secret base~君がくれたもの~',
                artist: 'Silent Siren',
                src: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.mp3',
                pic: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.jpg'
            },
            musicList: [
                {
                    title: '浪子回头',
                    artist: '茄子蛋',
                    src: 'http://www.170mv.com/kw/sc.sycdn.kuwo.cn/resource/n1/66/15/2796814273.mp3',
                    pic: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.jpg'
                },
                {
                    title: 'Oh Father',
                    artist: 'Bodhi Jones',
                    src: 'http://other.web.rc01.sycdn.kuwo.cn/resource/n3/96/7/1453412824.mp3',
                    pic: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.jpg'
                },
                {
                    title: '十七岁',
                    artist: '刘德华',
                    src: 'http://dl.stream.qqmusic.qq.com/M8000021YedA15ctea.mp3?vkey=29EB778802A5207F8A77C6D1E4E906C1628BB98E1CC63F872FB1B05F9176D332A7EFEF7428676DA6BBAC1CBCA58830C4C2FC2932920E2B74&guid=5150825362&fromtag=1',
                    pic: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.jpg'
                },
                {
                    title: 'secret base~君がくれたもの~',
                    artist: 'Silent Siren',
                    src: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.mp3',
                    pic: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.jpg'
                }
            ],
            showPlayerStatus: false
        }
    },
    methods: {
        changeMusicListLoca(length){
            if(length<5){
                $('.aplayer-list').eq(0).css({height:`${length*32+(length-1)}px`, top: `-${length*32+(length)}px`})
            }else{
                $('.aplayer-list').eq(0).css({height:`164px`, top: "-165px"})
            }
        },
        showPlayer(){
            if(this.showPlayerStatus){
                $('.aplayer-list').eq(0).css({width:'0px'})
                $('.aplayer').eq(0).css({width:'0px'})
                $('#icon-zhankai').css({transform: 'rotate(0deg)'})
            }else{
                $('.aplayer').eq(0).css({width:'361px'})
                $('.aplayer-list').eq(0).css({width:'361px'})
                $('#icon-zhankai').css({transform: 'rotate(180deg)'})
            }
            this.showPlayerStatus = !this.showPlayerStatus
        },
        aplayerBtnHover(){
            if(!this.showPlayerStatus){
                $('.aplayer').eq(0).show()
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
        position: relative;
        overflow: inherit!important;
    }
    .aplayer-list{
        position: absolute;
        top: -161px;
        z-index: 99999;
        width: 0px;
        background: #fff;
        transition: all 0.5s ease;
        // height: 160px!important;
        overflow-y:auto; 
        box-shadow: 0 -2px 2px 0 rgba(0,0,0,.07), 0 1px 5px 0 rgba(0,0,0,.1);
    }
    .aplayer-body{
        overflow: hidden;
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
