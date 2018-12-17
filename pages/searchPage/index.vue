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
            { hid: 'description', name: 'description', content: 'Jay的小栈的Search Page' },
            { property: 'og:title', content: 'Search Page'},
            { property: 'og:type', content: 'Search Page'},
            { property: 'og:description', content: 'Search Page'}
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
            this.$router.push({path: `/blogDetail/${_title}`, query: { bid: blogId}})
        }
    }  

}
</script>

<style scoped lang="scss">
.blog-wrap{
    margin-bottom: 50px;  
    .banner{
        width: 100%;
        height: 50vh;
        overflow: hidden;
        position: relative;
        text-align: center;
        .img {
            width: 100%;
            height: 50vh;
            background: url("~/assets/img/banner/timg.jpg") center no-repeat;
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
            top: 10vh;
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
    .search-page{
        width: 800px;
        margin: 0 auto;
        .searchList {
            .search-item {
                // box-shadow: 0 1px 20px -6px rgba(0,0,0,.5);
                display: flex;
                flex-direction:row;
                height: auto;
                border-radius: 10px; 
                margin-bottom: 50px; 
                border-bottom: 1px dashed #ddd;
                cursor: pointer;
                .list-content{
                    flex: 1;
                    padding: 20px 20px;
                    position: relative;
                    .list-date{
                        position: absolute;
                        right: 20px;
                        top: 20px;
                        font-size: 12px;
                        color: #888;
                        .date-icon{
                            i{
                            font-size: 18px;
                            padding-right: 5px; 
                            } 
                        }
                    }
                    .list-title{
                        margin: 20px 0;
                        font-weight: 600;
                        font-size: 18px;
                        height: 20px;
                        &:hover{
                            color: orange;
                        }
                    }
                    .list-des{
                        line-height:  25px;
                        font-size: 14px;
                        color: rgba(0,0,0,.66);
                        margin: 20px 0;
                        max-height: 100px;
                        overflow: hidden;
                    }
                }
                .img-wrap{
                    width: 100px;
                    height: 100px;
                    overflow: hidden;
                    border-radius: 100%;
                    display: flex;
                    align-items: center;
                    margin: 20px;
                    padding: 5px;
                    border: 1px solid #ddd;
                    img{
                        width: 100px;
                        height: 100px;
                        border-radius: 100%;
                        transition: all .5s linear;
                        &:hover{
                            transform: rotate( 360deg );
                        }
                    }
                }
            }
        }
        .input-wrap {
            border: 1px dashed #ddd;
            padding: 20px 50px;
            margin-bottom: 50px; 
            border-radius: 5px; 
            .input{
                border: 1px solid #ccc;
                color: #666;
                height: 40px;
                border-radius: 25px;
                display: flex;
                >i{
                    display: block;
                    width: 60px;
                    height: 100%;
                    line-height: 40px;
                    font-size: 26px;
                    text-align: center;
                    cursor: pointer;
                }
                >input{
                    flex: 1;
                    height: 100%;
                    background: none;
                    border: 0;
                    font-size: 16px;
                    text-indent: 15px;
                    &:focus{
                        border: none;
                        outline:none;
                    }
                }
            }
        }
        .recom{
            .recomTitle{
                color: #8c8c8c;
                font-size: 16px;
                line-height: 40px;
                text-indent: 10px;
                margin-bottom: 20px; 
            }
            .recomList{
                border: 1px solid #ddd;
                border-radius: 5px;
                padding: 40px;
                .recom-item{
                    border-bottom: 1px dashed #ddd;
                    line-height: 50px;
                    &:last-child{
                        border: 0;
                    }
                    .number{
                        font-size: 16px;
                        padding: 0 15px;
                    }
                    .title{
                        cursor: pointer;
                        &:hover{
                             color: orange;
                        }
                    }
                }
            }
           
        }
        .noblog{
            line-height: 50px;
            text-align: center;
            font-size: 16px;
            margin-bottom: 50px; 
        }
        
    }
    
}
</style>
