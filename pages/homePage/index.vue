<template>
    <section class="homePage">
        <section class="homePage-header">
            <figure class="homePage-bg "></figure>
            <h1 class="header-title animated pulse slow" data-value="HI, JAY.BOY!">
                HI, JAY.BOY!
            </h1>
            <div class="header-tip">
                <span class="up">
                </span>
                <p class="like-word">
                    <i class="iconfont icon-shuangyinhao"></i>
                        Be The Change You Wish To See In The World
                    <i class="iconfont icon-shuangyinhao1"></i>
                </p>
                <ul class="header-recom">
                    <li class="lt" data-value='~~ 召唤魔法 ~~'><i class="iconfont icon-xiangzuoxiangyou-copy-copy"></i></li>
                    <li class="github" data-value='github'>
                        <a href="" target="_blank">
                            <i class="iconfont icon-github"></i>
                        </a>
                    </li>
                    <li class="zhihu" data-value='知乎'>
                        <a href="" target="_blank">
                            <i class="iconfont icon-zhihu1"></i>
                        </a>
                    </li>
                    <li class="weibo" data-value='微博'>
                        <a href="" target="_blank">
                            <i class="iconfont icon-weibo"></i>
                        </a>
                    </li>
                    <li class="weixin" data-value='WeChat'>
                        <a href="" target="_blank">
                            <i class="iconfont icon-weixin"></i>
                        </a>
                    </li>
                    <li class="twitter" data-value='Twitter'>
                        <a href="" target="_blank">
                            <i class="iconfont icon-twiter"></i>
                        </a>
                    </li>
                    <li class="cloudMusic" data-value='CloudMusic'>
                        <a href="" target="_blank">
                            <i class="iconfont icon-wangyiyunyinleclick"></i>
                        </a>
                    </li>
                    <li class="email" data-value='Email'>
                        <a href="" target="_blank">
                            <i class="iconfont icon-email"></i>
                        </a>
                    </li>
                    <li class="gt" data-value='~~ 召唤魔法 ~~'><i class="iconfont icon-gt"></i></li>
                </ul>
            </div>
        </section>
        <section class="homePage-content">
            <div class="homePage-content-list">
                <div class="content-notice">
                    <div class="noticeIcon">
                        <i class="iconfont icon-guangbo"></i>
                    </div>
                    <div class="noticeContent animated bounceInRight infinite slower">
                        Jay.Blog 正式上线咯！ ~~~~ (*^▽^*) ~~~~  ！！！
                    </div>
                </div>
                <div class="content-hot">
                    <div class="hot-header">
                        <span class="hot-header-icon">
                            <i class="iconfont icon-remen"></i>
                        </span>
                        <h3 class="hot-header-title">
                            New Release!
                        </h3>
                    </div>
                    <div class="content-hot-main">
                        <Swiper></Swiper>
                    </div>
                </div>
                <div class="content-discover">
                    <div class="discover-header">
                        <span class="discover-header-icon">
                            <i class="iconfont icon-faxian"></i>
                        </span>
                        <h3 class="discover-header-title">
                            New Release!
                        </h3>
                    </div>
                    <main class="content-discover-main">
                        <template v-for="(item,index) in discoverList">
                            <article v-if="index%2 == 0" :key="index" class="content-discover-list-left">
                                <figure class="img-wrap">
                                    <img src="~/assets/img/home/cms-logo.jpg" alt="list-logo">
                                </figure>
                                <div class="list-content">
                                    <p class="list-date">
                                        <span class="date-icon"><i class="iconfont icon-shijian"></i></span> 
                                        <span class="date-title">发布时间{{'2018-09-07'}}</span>
                                    </p>
                                    <h4 class="line-clamp1 list-title">JavaScript + imgur API 上传图片 </h4>
                                    <div class="list-tag">
                                        <div class="tag-see">
                                            <span class="see-icon"><i class="iconfont icon-chakan"></i></span> 
                                            <span class="see-title">21热度</span>
                                        </div>
                                        <div class="tag-see">
                                            <span class="see-icon"><i class="iconfont icon-liuyan1"></i></span> 
                                            <span class="see-title">100 Likes</span>
                                        </div>
                                        <div class="tag-see">
                                            <span class="see-icon"><i class="iconfont icon-leixing"></i></span> 
                                            <span class="see-title">Css</span>
                                        </div>
                                    </div>
                                    <p class="list-des line-clamp4">
                                        css优先级需要关注两个维度：一个是样式距离，分别是内联样式、内部样式、外联样式；另一个则是根据属性的权重来判断。前者不用多说，这里详细分析一下后者。
                                    </p>
                                    <p class="list-more"><i data-value='more' class="iconfont icon-more"></i></p>
                                </div>
                            </article>
                         <article v-if="index%2 != 0" :key="index" class="content-discover-list-right">
                            <div class="list-content">
                                <p class="list-date">
                                    <span class="date-icon"><i class="iconfont icon-shijian"></i></span> 
                                    <span class="date-title">发布时间{{'2018-09-07'}}</span>
                                </p>
                                <h4 class="line-clamp1 list-title">JavaScript + imgur API 上传图片 </h4>
                                <div class="list-tag">
                                    <div class="tag-see">
                                        <span class="see-icon"><i class="iconfont icon-chakan"></i></span> 
                                        <span class="see-title">21热度</span>
                                    </div>
                                    <div class="tag-see">
                                        <span class="see-icon"><i class="iconfont icon-liuyan1"></i></span> 
                                        <span class="see-title">100 Likes</span>
                                    </div>
                                    <div class="tag-see">
                                        <span class="see-icon"><i class="iconfont icon-leixing"></i></span> 
                                        <span class="see-title">Css</span>
                                    </div>
                                </div>
                                <p class="list-des line-clamp4">
                                    css优先级需要关注两个维度：一个是样式距离，分别是内联样式、内部样式、外联样式；另一个则是根据属性的权重来判断。前者不用多说，这里详细分析一下后者。
                                </p>
                                <p class="list-more"><i data-value='more' class="iconfont icon-more"></i></p>
                            </div>
                             <figure class="img-wrap">
                                <img src="~/assets/img/home/cms-logo.jpg" alt="list-logo">
                            </figure>
                        </article>
                        </template>
                      
                    </main>
                </div>
            </div>
        </section>
    </section>
</template>

<script>

import Swiper from '~/components/Swiper.vue'

export default {
    layout: 'hasHeader',
    scrollToTop: true,
    components: {
        Swiper
    },
    data() {
        return{
           discoverList:[1,2,3,4,5,7] 
        }
    }
}
</script>

<style lang='scss' scoped>
    @import '~/assets/css/homepage.scss';
</style>
