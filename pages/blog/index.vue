<template>
    <section class="blog-wrap">
       <div class="banner" id="banner">
           <div class="img animated pulse slow">
           </div>
           <h3>Blog</h3>
       </div>
       <main class="blog-main" id="blog-main">
           <div class="blog-list-wrap" id="blog-list-wrap">
                <template v-for="(item,index) in blogList">
                    <article v-if="index%2 == 0" :key="index" class="blogList-left" @click="goBlogDetail(item)">
                        <figure class="img-wrap">
                            <img :src="item.blogImg" alt="list-logo">
                        </figure>
                        <div class="list-content">
                            <p class="list-date">
                                <span class="date-icon"><i class="iconfont icon-shijian"></i></span> 
                                <span class="date-title">发布时间{{item.updated_time.substring(0, 10)}}</span>
                            </p>
                            <h4 class="line-clamp1 list-title">{{item.blogTitle}} </h4>
                            <div class="list-tag">
                                <div class="tag-see">
                                    <span class="see-icon"><i class="iconfont icon-chakan"></i></span> 
                                    <span class="see-title">{{item.blogHot}} 热度</span>
                                </div>
                                <div class="tag-see">
                                    <span class="see-icon"><i class="iconfont icon-liuyan1"></i></span> 
                                    <span class="see-title">{{item.blogLikes}} Likes</span>
                                </div>
                                <div class="tag-see">
                                    <span class="see-icon"><i class="iconfont icon-leixing"></i></span> 
                                    <span class="see-title">{{item.blog_type?item.blog_type.blogTypeTitle: 'no Setting'}}</span>
                                </div>
                            </div>
                            <p class="list-des line-clamp4">
                                {{item.blogDes}}
                            </p>
                            <p class="list-more"><i data-value='more' class="iconfont icon-more"></i></p>
                        </div>
                    </article>
                    <article v-if="index%2 != 0" :key="index" class="blogList-right" @click="goBlogDetail(item)">
                        <div class="list-content">
                            <p class="list-date">
                                <span class="date-icon"><i class="iconfont icon-shijian"></i></span> 
                                <span class="date-title">发布时间{{item.updated_time.substring(0, 10)}}</span>
                            </p>
                            <h4 class="line-clamp1 list-title">{{item.blogTitle}} </h4>
                            <div class="list-tag">
                                <div class="tag-see">
                                    <span class="see-icon"><i class="iconfont icon-chakan"></i></span> 
                                    <span class="see-title">{{item.blogHot}} 热度</span>
                                </div>
                                <div class="tag-see">
                                    <span class="see-icon"><i class="iconfont icon-liuyan1"></i></span> 
                                    <span class="see-title">{{item.blogLikes}} Likes</span>
                                </div>
                                <div class="tag-see">
                                    <span class="see-icon"><i class="iconfont icon-leixing"></i></span> 
                                    <span class="see-title">{{item.blog_type?item.blog_type.blogTypeTitle: 'no Setting'}}</span>
                                </div>
                            </div>
                            <p class="list-des line-clamp4">
                                {{item.blogDes}}
                            </p>
                            <p class="list-more"><i data-value='more' class="iconfont icon-more"></i></p>
                        </div>
                        <figure class="img-wrap">
                            <img :src="item.blogImg" alt="list-logo">
                        </figure>
                    </article>
                </template>
                 <p class="noBlogTip" v-if="blogList.length == 0 && !isloading">
                    ~~ 亲爱的小主大人, 没有找到相关Blog。 换个姿势再来一次哦！！！
                </p>
           </div>
           <aside class="tags-aside" id="tags-aside">
               <div class="tags-wrap" id="tags-wrap">
                   <div class="header">
                       <div class="icon"> <i class="iconfont icon-biaoqian"></i></div> 
                       <div class="content">Tags</div>
                   </div>
                   <ul class="tags-list">
                        <li class="tag-item" @click="searchGetAll()">All</li>
                        <li class="tag-item" v-for="(item, index) in blogTypeList" :key="index" @click="searchByTypeBtn(item.blogTypeId)">{{item.blogTypeTitle}}</li>
                   </ul>
               </div>
           </aside>
            <div class="tags-wrap-fixed" id="fixed-tag">
                <div class="header">
                    <div class="icon"> <i class="iconfont icon-biaoqian"></i></div> 
                    <div class="content">Tags</div>
                </div>
                <ul class="tags-list">
                    <li class="tag-item" @click="searchGetAll()">All</li>
                    <li class="tag-item" v-for="(item, index) in blogTypeList" :key="index" @click="searchByTypeBtn(item.blogTypeId)">{{item.blogTypeTitle}}</li>
                </ul>
            </div>
       </main>
       <p class="sumTips" v-show="showBottomTip && count != 0"> ~~ 小鬼我可是有底线 ~~</p>
    </section>
</template>

<script>
import { ApiGetBlogType, ApiGetBlog, ApiGetBlogByType } from '~/plugins/server/blog'

export default {
    layout: 'hasHeader',
    scrollToTop: true,
    head: {
        title: 'Blog Page 博客列表 || ~~Jay的小栈',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { name: 'description', content: 'Jay的小栈的Blog的列表,包括博客的分类,让小主快速的查看到想要blog。' },
            { name: 'Keywords', content: 'Jay的小栈的Blog Page, 博客列表' }
        ]
    },
    data() {
        return {
            isloading: true,
            blogList: [],
            blogTypeList: [],
            showAsideHeight:0,
            count: 0,
            showBottomTip: false,
            form: {
                pageSize: 5,
                pageNumber: 1,
                blogTypeId: null
            }
        }
    },
    mounted() {
        this.getBlogType()
        let {_btId} = this.$route.query
        if(_btId) {
            this.form.blogTypeId = _btId
            this.searchByType(this.form.blogTypeId)
        }else{
            this.getBlog(this.form)
        }
        let width = document.documentElement.clientWidth
        console.log('----> width', width)
        if(width > 600) {
            this.changeAsideShow()
            window.addEventListener('scroll', this.changeAsideShow)
            window.addEventListener('resize', this.changeAsideShow)
        }

    },
    destroyed() {
        window.removeEventListener('scroll', this.changeAsideShow)
        window.removeEventListener('resize', this.changeAsideShow)
    },
    methods: {
        changeAsideShow() {
            let showAsideHeight =$('#blog-main').offset().top
            let scrollTop = $(window).scrollTop()
            let Height = $(document).height()
            let windowHeight = $(window).height()
            if(windowHeight + scrollTop + 20 > Height){
                if(this.count> this.blogList.length) {
                    if(this.isloading) return 
                    this.isloading = true
                    this.form.pageNumber = this.form.pageNumber + 1
                    if(this.form.blogTypeId){
                        this.searchByType(this.form.blogTypeId)
                    }else{
                        this.getBlog(this.form)
                    }
                }
            }
            if(scrollTop > showAsideHeight + 50){
                $('#fixed-tag').show();
                $('#tags-aside').hide()
            }else {
                    $('#fixed-tag').hide();
                $('#tags-aside').show()
            }
        },
        goBlogDetail(blogDetail) {
            let _title = blogDetail.blogTitle.replace(/\n/g, '_')
            let blogId = blogDetail.blogId
            let url = this.$router.resolve({path: `/blogDetail/${_title}`, query: { bid: blogId}})
            window.open(url.href, '_blank')
        },
        getBlogType() {
            ApiGetBlogType({}).then(res => {
                if(res.code == 200 && res.data.count>0) {
                    this.blogTypeList = res.data.rows
                }
            })
        },
        getBlog(params) {
            ApiGetBlog(params).then(res => {
                if(res.code == 200) {
                    this.count = res.data.count
                    let _blogList  = res.data.rows
                    this.blogList = this.blogList.concat(_blogList)
                    if(this.blogList.length == res.data.count && res.data.count!==0) {
                        this.showBottomTip = true
                    }
                }
                if(this.form.pageNumber == 1 ){
                    $('#blog-list-wrap').addClass('animated fadeInUp slow');
                }
                this.isloading = false
            })
        },
        getBlogByType(params) {
            ApiGetBlogByType(params).then(res => {
                if(res.code == 200 && res.data) {
                    this.count = res.data.count
                    let _blogList  = res.data.rows
                    this.blogList =this.blogList.concat(_blogList)
                    if(this.blogList.length == res.data.count && res.data.count!==0) {
                        this.showBottomTip = true
                    }
                }
                if(this.form.pageNumber == 1){
                    $('#blog-list-wrap').addClass('animated fadeInUp slow');
                }
                this.isloading = false
            })
        },
        searchGetAll() {
            this.isloading = true
            $('#blog-list-wrap').removeClass('animated fadeInUp slow');
            $('html,body').animate({scrollTop: '0px'}, 800)
            this.form.blogTypeId = null
            this.form.pageNumber = 1
            this.blogList = []
            this.getBlog(this.form)
            this.$router.push({path: '/blog'})
        },
        searchByTypeBtn( blogTypeId ) {
            this.form.pageNumber = 1
            this.blogList = []
            this.searchByType( blogTypeId )
        },
        searchByType( blogTypeId ) {
            this.isloading = true
            $('#blog-list-wrap').removeClass('animated fadeInUp slow');
            if(this.form.pageNumber == 1){
                $('html,body').animate({scrollTop: '0px'}, 800)
            }
            this.form.blogTypeId = blogTypeId
            this.$router.push({path: '/blog',query: {_btId: blogTypeId}})
            this.getBlogByType(this.form)
        }
    }
}
</script>

<style scoped lang="scss">
    @import '~/assets/css/blog.scss';
</style>
