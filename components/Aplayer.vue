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
import { ApiGetMusic } from '~/plugins/server/header'

export default {
    components: {
        Aplayer
    },
    created () {
        this.getmusic()
        
    },
    mounted () {
        $('.aplayer').eq(0).css({width:'0px'})
        $('.aplayer').eq(0).hide()
        this.changeMusicListLoca(this.musicList.length)
    },
    watch: {
     musicList:function(val){
         let length = val.length
         this.changeMusicListLoca(length)
     }   
    },
    data() {
        return {
            isAplayerShow:true,
            musicOptions: {
                title: '浪子回头',
                artist: '茄子蛋',
                src: 'http://www.170mv.com/kw/sc.sycdn.kuwo.cn/resource/n1/66/15/2796814273.mp3',
                pic: 'http://blog.8bjl.cn/upload/music/%E6%B5%AA%E5%AD%90%E5%9B%9E%E5%A4%B4%20.jpg'
            },
            musicList: [
                {
                    title: '浪子回头',
                    artist: '茄子蛋',
                    src: 'http://www.170mv.com/kw/sc.sycdn.kuwo.cn/resource/n1/66/15/2796814273.mp3',
                    pic: 'http://blog.8bjl.cn/upload/music/%E6%B5%AA%E5%AD%90%E5%9B%9E%E5%A4%B4%20.jpg'
                },
                {
                    title: 'Oh Father',
                    artist: 'Bodhi Jones',
                    src: 'http://other.web.rc01.sycdn.kuwo.cn/resource/n3/96/7/1453412824.mp3',
                    pic: 'http://blog.8bjl.cn/upload/music/oh%20Father.jpg'
                },
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
        },
        getmusic() {
            ApiGetMusic({}).then(res => {
                if(res.code == 200 && res.data.count> 0) {
                    let _rows =  res.data.rows
                    let arr = []
                    _rows.forEach((item,index) => {
                        let obj ={}
                        obj.title = item.musicTitle
                        obj.artist = item.musicAuthor
                        obj.src = item.musicUrl   
                        obj.pic = item.musicPic
                       
                        arr.push(obj)
                    })
                    this.musicList = arr
                }
            })
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
