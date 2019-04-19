<template>
    <section class="blog-wrap">
       <div class="banner">
           <div class="img animated pulse slow">
           </div>
           <h3>Search Page</h3>
       </div>
       <main class="search-page">
           <div class="input-wrap" @keydown.enter="search">
                <div class="input">
                    <i class="iconfont icon-search" @click="search"></i>
                    <input type="text" v-model.trim="searchStr" required placeholder="Input the key words about Blog ">
                </div>   
           </div>
           <div class="searchList">
               <article class="search-item" v-for="(item, index) in searchList" :key="index" @click="goBlogDetail(item)">
                    <figure class="img-wrap">
                        <img :src="item.blogImg" alt="list-logo">
                    </figure>
                    <div class="list-content">
                        <p class="list-date">
                            <span class="date-icon"><i class="iconfont icon-shijian"></i></span> 
                            <span class="date-title">发布时间{{item.updated_time.substring(0, 10)}}</span>
                        </p>
                        <h4 class="line-clamp1 list-title">{{item.blogTitle}} </h4>
                        <p class="list-des line-clamp4">
                            {{item.blogDes}}
                        </p>
                    </div>
                </article>
           </div>
           <p class="noblog" v-if="isShowRecomList">~~~ 别找了找不到的 , 上帝已如此忙碌！</p>
           <div class="recom" v-if="isShowRecomList">
               <p class="recomTitle">小主, 其他的更精彩哦！！</p>
               <ul class="recomList">
                   <li class="recom-item" v-for="(item, index) in recomList" :key="index">
                       <span class="number">{{index+1}}、</span>
                       <span class="title" @click="goBlogDetail(item)">{{item.blogTitle}}</span>
                   </li>
               </ul>
           </div>
       </main>
    </section>
</template>

<script>
import { ApiGetBlog, ApiSearchBlog} from '~/plugins/server/search'


export default {
    asyncData(context) {
        let {_s=''} = context.route.query
        return {
            searchStr: _s
        }
    },
    layout: 'hasHeader',
    scrollToTop: true,
    head: {
        title: 'Search Page || ~~Jay的小栈',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { name: 'description', content: '欢迎来搜索你想要的blog，如果未找到你想要的知识。这里还会推荐热度高的blog哦' },
            { name: 'Keywords', content: 'Jay的小栈的Search Page, 博客搜索页面'}
        ]
    },
    data() {
        return {
            searchList: [],
            recomList: [],
            isShowRecomList: false
        }
    },
    mounted() {
        this.getblogList()
        if(this.searchStr) { 
            this.getSearchBlogList()
        }
    },
    methods: {
        search() {
            if(!this.searchStr) return
            this.getSearchBlogList()
        },
        getSearchBlogList() {
            this.$router.push({path: '/searchPage?', query:{_s: this.searchStr}})
            ApiSearchBlog({searchStr: this.searchStr}).then(res => {
                if(res.code == 200) {
                    this.searchList = res.data
                }
                if(this.searchList.length == 0) {
                    this.isShowRecomList = true
                }else{
                    this.isShowRecomList = false
                }
            })
        },
        getblogList() {
            ApiGetBlog({pageSize: 10, pageNuber: 1}).then(res => {
                if(res.code == 200 && res.data.count>0) {
                    this.recomList = res.data.rows
                }
                if(!this.searchStr) {
                    this.isShowRecomList = true
                }
            })
        },
        goBlogDetail(blogDetail) {
            let _title = blogDetail.blogTitle.replace(/\s/g, '_')
            let blogId = blogDetail.blogId
            let url = this.$router.resolve({path: `/blogDetail/${_title}`, query: { bid: blogId}})
            window.open(url.href, '_blank')
        }
    }  

}
</script>

<style scoped lang="scss">
    @import '~/assets/css/search.scss';
</style>
