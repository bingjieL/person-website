<template>
    <section class="blog-wrap">
       <div class="banner">
           <div class="img animated pulse slow">
           </div>
           <h3>{{blogDetail.blogTitle}}</h3>
       </div>
       <main class="detail-main">
           <header class="blog-des">
               <h3>
                   <span class="first-des">{{blogDetail.blogDes?blogDetail.blogDes.substring(0,1): ''}}</span>
                   <span class="des">{{blogDetail.blogDes?blogDetail.blogDes.substring(1, blogDetail.blogDes.length): ''}}</span>
                </h3>
           </header>
           <div class="main-content" v-html="blogDetail.blogContent"></div>
           <div class="main-footer">
               <div class="left">
                   <img src="~/assets/img/min-banner/header-logo.jpg" alt="logo">
               </div>
                <div class="tips">
                   <p>~~~ 小主人,  别忘记 戳下小心心哦!</p> 
                </div>
               <div class="right">
                    <p class="date">
                       <span class="date-icon"><i class="iconfont icon-shijian"></i></span>
                       <span class="date-title">发布时间{{blogDetail.updated_time?blogDetail.updated_time.substring(0, 10): ''}}</span> 
                    </p>
                    <p class="dis" v-if="!isAddLikes"> 
                        <i  class="iconfont icon-aixin_fuzhi"></i>
                    </p>
                    <p class="no-dis">
                        <i v-if="isAddLikes" @click="addLikes" class="iconfont icon-aixin"></i>
                    </p>
               </div>
           </div>
       </main>
    </section>
</template>

<script>
import { ApiGetBlogDetail, ApiAddBlogHot, ApiAddBlogLikes} from '~/plugins/server/blogDetail'
// import Tocbot from 'tocbot'

export default {
    asyncData(context) {
        return {
            bid: context.query.bid,
            pagetitle: context.params.title
        }
    },
    validate({ params, query }) {
      if(!params.title || !query.bid){
          return false
      }else{
          return true
      }
    },
    layout: 'hasHeader',
    scrollToTop: true,
    head() {
        return {
            title: 'Blog Detail Page || ~~Jay的小栈',
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { hid: 'description', name: 'description', content: 'Jay的小栈的Blog Detail Page' },
                { property: 'og:title', content: `${this.pagetitle} Jay的小栈`},
                { property: 'og:type', content: `${this.pagetitle} Jay的小栈`},
                { property: 'og:description', content: `${this.pagetitle} Jay的小栈`}
            ]
        }
    },
    data() {
        return{
            blogDetail: {},
            isAddLikes: true
        }
    },
    mounted() {
        this.getBlogDetail({blogId: this.bid})
        this.addBlogHot({blogId: this.bid})
    },
    methods: {
        getBlogDetail(params) {
            ApiGetBlogDetail(params).then(res => {
                if(res.code == 200) {
                    this.blogDetail = res.data
                }
            })
        },
        addBlogHot(params) {
            ApiAddBlogHot(params).then(res => {})
        },
        addLikes() {
            this.addBlogLikes({blogId: this.bid})
        },
        addBlogLikes(params) {
            ApiAddBlogLikes(params).then(res => {
                if(res.code == 200) {
                    this.isAddLikes = false
                }
            })
        }
        
    }

}
</script>




<style lang="scss" scoped>
    @import '~/assets/css/blogDetail.scss';
</style>
<style>

    .main-content >h2 {
        /* height: 50px; */
        border-bottom: 1px dashed #ddd;
        margin: 20px 0;
        position: relative;
        font-size: 16px;
        color: #666;
        padding-left: 30px;
        line-height: 50px;
        font-size: 22px; 
        font-weight: 500;
    } 
    .main-content p {
        color: #404040;
        margin: 10px 0 0 15px;
    }
    .main-content >h2::after {
        content: '#';
        position: absolute;
        height: 50px;
        width: 30px;
        color: #ff6d6d;
        left: 0;
        text-align: center;
        line-height: 50px;
    }
</style>
