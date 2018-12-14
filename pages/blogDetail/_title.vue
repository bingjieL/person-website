<template>
    <section class="blog-wrap">
       <div class="banner">
           <div class="img animated pulse slow">
           </div>
           <h3>Blog Detail</h3>
       </div>
       <main class="detail-main">
           
       </main>
    </section>
</template>

<script>
import { ApiGetBlogDetail } from '~/plugins/server/blogDetail'

export default {
    asyncData(context) {
        return {
            bid: context.query.bid,
            pagetitle: context.params.title
        }
    },
    validate({ params, query }) {
      if(!params.title){
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

    },
    mounted() {
        console.log('---> this.bid', this.bid)
        this.getBlogDetail({blogId: this.bid})
    },
    methods: {
        getBlogDetail(params) {
            ApiGetBlogDetail(params).then(res => {
                console.log('----> blog detail res', res);
            })
        }
    }

}
</script>

<style scoped lang="scss">
.blog-wrap{
    .banner{
        width: 100%;
        height: 65vh;
        overflow: hidden;
        position: relative;
        text-align: center;
        .img {
            width: 100%;
            height: 65vh;
            background: url("~/assets/img/banner/writing.jpg") center no-repeat;
            background-size: cover; 
            transition: all 0.5s ease;
        }
        h3{
            display: inline-block;
            padding: 20px;
            font-size:  50px;
            font-weight: 500;
            text-align: center;
            color: linear-gradient(270deg,#c4987a 33%,#ffd5bf 73%);
            position: absolute;
            top: 30vh;
            transition: all 0.5s ease;
            background-image:  linear-gradient(270deg,#c4987a 33%,#ffd5bf 73%);
            background-clip: text;
            -webkit-text-fill-color: transparent;
            transform: translateX(-50%)
        }
        &::after{
            content: '';
            width: 150%;
            position: absolute;
            border-radius: 100%;
            left: -25%;
            background: #fff;
            height: 100px;
            bottom: -20px;
        }
    }
    
}
</style>
