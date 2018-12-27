<template>
    <section class="book-wrap">
       <div class="banner">
           <div class="img animated pulse slow">
           </div>
           <h3>Book</h3>
       </div>
       <main class="book-main">
            <h3 class="book-title">
                <span class="icon"><i class="iconfont icon-shu"></i></span>
               <span class="content">书单推荐</span> 
            </h3>
            <div class="book-list">
                <article class="list-item" v-for="(item, index) in bookList" :key="index">
                    <div class="item-wrap">
                        <figure class="left">
                            <img :src="item.bookPic" alt="">
                        </figure>
                        <div class="right">
                            <h3 class="name">{{item.bookTitle}}</h3>
                            <h3 class="auth">作者: {{item.bookAuthor}}</h3>
                            <p class="des">{{item.bookDes}}</p>
                        </div>
                    </div>
                    <div class="download-wrap">
                        <a target="_blank" :href="item.bookpdfUrl == '无'?'javaScript:;':item.bookpdfUrl " data-value="PDF格式下载"><i class="iconfont icon-pdf"></i>PDF</a>
                        <a target="_blank" :href="item.bookdlUrl == '无'?'javaScript:;':item.bookdlUrl " data-value="kindle格式下载"><i class="iconfont icon-kindle"></i>KDL</a>
                    </div>
                </article>
            </div>
       </main>
    </section>
</template>

<script>
import { 
    ApiGetBook
} from '~/plugins/server/book'

export default {
    layout: 'hasHeader',
    scrollToTop: true,
    head: {
        title: 'Book Page || ~~Jay的小栈',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'Jay的小栈的Book Page' },
            { property: 'og:title', content: 'Book Page'},
            { property: 'og:type', content: 'Book Page'},
            { property: 'og:description', content: 'Book Page'}
        ]
    },
    data() {
        return {
            bookList: []
        }
    },
    mounted() {
      this.getBookList()
    },
    methods: {
       getBookList() {
           ApiGetBook({}).then(res => {
               if(res.code == 200 ) {
                   this.bookList = res.data.rows
               }
           })
       }
    }

}
</script>

<style scoped lang="scss">
    @import '~/assets/css/book.scss';
</style>
