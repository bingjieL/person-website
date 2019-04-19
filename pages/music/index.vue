<template>
    <section class="music-wrap">
       <header class="banner " >
           <div id="music-banner" class="img animated pulse slow">
               <img v-show="bannerImg" src="~/assets/img/banner/entertainment-banner.jpg" alt="music-logo" srcset="">
           </div>
           <h3>Music</h3>
       </header>
       <main class="music-main">
            <h3 class="music-title">
                <span class="icon"><i class="iconfont icon-yinle"></i></span>
               <span class="content">歌单推荐</span> 
            </h3>
            <div class="music-list">
                <article class="music-item" v-for="(item, index) in sheetList" :key="index">
                    <figure class="img-wrap">
                        <img :src="item.sheetImg" alt="">
                    </figure>
                    <p class="title animated pulse slow">{{item.sheetTitle}}</p>
                    <div class="tags">
                        <span class="tag-item">{{item.sheetTag}}</span>
                    </div>
                    <p class="des">
                        <a :href="item.sheetUrl" target="_blank" rel="noopener noreferrer">
                            <template v-if="item.sheetDes.length>10">
                                {{item.sheetDes.substring( 0, (item.sheetDes.length - 10))}}
                                <br>
                                {{item.sheetDes.substring((item.sheetDes.length - 10), item.sheetDes.length)}}
                            </template>
                            <template v-else>
                                {{item.sheetDes}}
                            </template>
                        </a>
                    </p>
                </article>
            </div>
       </main>
    </section>
</template>

<script>
import { ApiGetSheet } from '~/plugins/server/musicSheet'

export default {
    layout: 'hasHeader',
    scrollToTop: true,
    head: {
        title: 'Music Page 音乐列表 || ~~Jay的小栈',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { name: 'description', content: 'Jay的小栈的音乐列表,推荐个人喜欢的音乐,希望你也爱民谣哦' },
            { name: 'Keywords', content: 'Jay的小栈的Music Page, 博客音乐列表'}
        ]
    },
    data() {
        return{
            bannerImg: false,
            sheetList: []
        }
    },
    mounted() {
      this.getSheetList()
    },
    methods: {
       getSheetList() {
           ApiGetSheet({}).then(res => {
               if(res.code == 200 ) {
                   this.sheetList = res.data.rows
               }
           })
       }
    }
}
</script>

<style scoped lang="scss">
@import '~/assets/css/music.scss';
</style>
