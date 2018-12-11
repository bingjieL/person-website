<template>
    <section class="blog-wrap">
       <div class="banner" id="banner">
           <div class="img animated pulse slow">
           </div>
           <h3>Blog</h3>
       </div>
       <main class="blog-main">
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
           <aside class="tags-aside">
               <div class="tags-wrap" id="tags-wrap">
                   <div class="header">
                       <div class="icon"> <i class="iconfont icon-biaoqian"></i></div> 
                       <div class="content">Tags</div>
                   </div>
                   <ul class="tags-list">
                        <li class="tag-item" @click="searchGetAll()">All</li>
                        <li class="tag-item" v-for="(item, index) in blogTypeList" :key="index" @click="searchByType(item.blogTypeId)">{{item.blogTypeTitle}}</li>
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
                    <li class="tag-item" v-for="(item, index) in blogTypeList" :key="index" @click="searchByType(item.blogTypeId)">{{item.blogTypeTitle}}</li>
                </ul>
            </div>
       </main>
    </section>
</template>

<script>
import { ApiGetBlogType, ApiGetBlog, ApiGetBlogByType } from '~/plugins/server/blog'

export default {
    layout: 'hasHeader',
    scrollToTop: true,
    isloading: true,
    head: {
        title: 'Blog Page || ~~Jay的小栈',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'Jay的小栈的Blog Page' },
            { property: 'og:title', content: 'Blog Page'},
            { property: 'og:type', content: 'Blog Page'},
            { property: 'og:description', content: 'Blog Page'}
        ]
    },
    data() {
        return {
            isloading: true,
            blogList: [],
            blogTypeList: [],
            showAsideHeight:0,
            form: {
                pageSize: 10,
                pageNumber: 1
            }
        }
    },
    mounted() {
        this.getBlogType()
        let {_btId} = this.$route.query
        if(_btId) {
            this.searchByType(_btId)
        }else{
            this.getBlog(this.form)
        }
        this.changeAsideShow()
    },
    methods: {
        changeAsideShow() {
            this.showAsideHeight = $('#banner').height() + $('#tags-wrap').height() 
            $(window).resize(()=> {
                this.showAsideHeight = $('#banner').height() + $('#tags-wrap').height()
            })
            $(window).scroll(()=>{ 
                let scrollTop = $(window).scrollTop()
                if(scrollTop > this.showAsideHeight){
                    $('#fixed-tag').fadeIn();
                }else{
                    $('#fixed-tag').hide();
                }
            });
        },
        goBlogDetail(blogDetail) {
            let _title = blogDetail.blogTitle.replace(/\n/g, '_')
            let blogId = blogDetail.blogId
            this.$router.push({path: `/blogDetail/${_title}`, query: { bid: blogId}})
        },
        getBlogType() {
            ApiGetBlogType({}).then(res => {
                if(res.code == 200 && res.data.count>0) {
                    this.blogTypeList = res.data.rows
                }
            })
        },
        getBlog(params) {
            ApiGetBlog().then(res => {
                this.isloading = false
                if(res.code == 200 && res.data.count>0) {
                    this.blogList = res.data.rows
                }
                $('#blog-list-wrap').addClass('animated fadeInUp slow');
            })
        },
        getBlogByType(params) {
            ApiGetBlogByType(params).then(res => {
                this.isloading = false
                if(res.code == 200 && res.data) {
                    this.blogList = res.data.rows
                }
                $('#blog-list-wrap').addClass('animated fadeInUp slow');
            })
        },
        searchGetAll() {
            this.isloading = true
            $('#blog-list-wrap').removeClass('animated fadeInUp slow');
            this.getBlog(this.form)
            $('html,body').animate({scrollTop: '0px'}, 800)
            this.$router.push({path: '/blog'})
        },
        searchByType(blogTypeId) {
            this.isloading = true
            $('#blog-list-wrap').removeClass('animated fadeInUp slow');
            let params = {
                blogTypeId: blogTypeId,
                pageSize: 10,
                pageNumber: 1
            }
            $('html,body').animate({scrollTop: '0px'}, 800)
            this.$router.push({path: '/blog',query: {_btId: blogTypeId}})
            this.getBlogByType(params)
        }
    }

}
</script>

<style scoped lang="scss">
    @import '~/assets/css/blog.scss';
</style>
