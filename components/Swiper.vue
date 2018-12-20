<template>
  <!-- You can find this swiper instance object in current component by the "mySwiper"  -->
  <div v-swiper:mySwiper="swiperOption" id='certify' v-if="showSwiper">
    <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,index) in swiperList" :key="index" >
            <img :src="item.hotImg" style="width:100%" :id="item.hotId"/>
            <p><a :href="item.hotUrl" target="_blank" rel="noopener noreferrer">{{item.hotTitle}}</a></p>
        </div>
    </div>
    <!-- <div class="title-wrap">
    </div> -->
    <div class="swiper-pagination"></div>
    <!-- <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div> -->
  </div>
</template>

<script>
import cmsLogo from '~/assets/img/home/cms-logo.jpg'
import nodeLogo from '~/assets/img/home/node-logo.jpg'
import nuxtLogo from '~/assets/img/home/nuxt-logo.jpg'
import { ApiGetSwiper } from '~/plugins/server/swiper'
  export default {
    data () {
      let vm = this
      return {
        showSwiper: false,
        swiperList: [
        //   {
        //       hotImg: cmsLogo,
        //       hotTitle: 'CMS - Jay.Blog',
        //       hotId: 'cms',
        //       hotUrl: 'https://github.com/bingjieL/blog-cms'
        //   },
        //   {
        //       hotImg: nodeLogo,
        //       hotTitle: 'NODE.JS - Jay.Blog',
        //       hotId: 'node',
        //       hotUrl: 'https://github.com/bingjieL/blogServer'
        //   },
        //   {
        //       hotImg: nuxtLogo,
        //       hotTitle: 'NUXT.SSR - Jay.Blog',
        //       hotId: 'nuxt',
        //       hotUrl: 'https://github.com/bingjieL/person-website'
        //   }
        ],
        swiperOption: {
            watchSlidesProgress: true,
            slidesPerView: 'auto',
            centeredSlides: true,
            loop: true,
            loopedSlides: 3,      
            slidesPerView: 2, 
            cwidth: 1100,
            observer:true,
            // autoplay: true,
            // navigation: {
            //     nextEl: '.swiper-button-next',
            //     prevEl: '.swiper-button-prev',
            // },
            pagination: {
                el: '.swiper-pagination',
                clickable :true,
            },
            on: {
                click(e) {
                    // let _index = this.realIndex
                    // let id = e.target.id
                    // if(!id) return
                    // let _list = vm.swiperList
                    // _list.forEach(item => {
                    //     if(item.hotId == id){
                    //        window.open(item.hotUrl) 
                    //     }
                    // });
                },
                progress: function(progress) {
                    for (let i = 0; i < this.slides.length; i++) {
                        let slide = this.slides.eq(i);
                        let slideProgress = this.slides[i].progress;
                        let modify = 1;
                        if (Math.abs(slideProgress) > 1) {
                            modify = (Math.abs(slideProgress) - 1) * 0.3 + 1;
                        }
                        let translate = slideProgress * modify * 150 + 'px';
                        let scale = 1 - Math.abs(slideProgress) / 7;
                        let zIndex = 999 - Math.abs(Math.round(10 * slideProgress));
                        slide.transform('translateX(' + translate + ') scale(' + scale + ')');
                        slide.css('zIndex', zIndex);
                        slide.css('opacity', 1);
                        if (Math.abs(slideProgress) > 3) {
                            slide.css('opacity', 0);
                        }
                    }
                },
                setTransition: function(transition) {
                    for (let i = 0; i < this.slides.length; i++) {
                        let slide = this.slides.eq(i)
                        slide.transition(transition);
                    }
                }
            }
        }
      }
    },
    mounted() {
        this.getSwiperList()
    },
    methods: {
        getSwiperList() {
            ApiGetSwiper({}).then(res => {
                if(res.code == 200 && res.data.count>0){
                    this.swiperList = res.data.rows
                    this.showSwiper = true
                }
            })
        }
    }
  }
</script>


<style lang="scss" scoped>
  @charset "utf-8";
/* CSS Document */

#certify {
	position: relative;
	width: 900px;
    margin: 0px auto;
    padding: 5px 0 30px;
}

#certify .swiper-container {
	padding-bottom: 60px;
}
#certify .title-wrap{
    line-height: 120px;
    height: 120px;
}
#certify  .swiper-slide {
	width: 100%;
	// height: 408px;
	background: #fff;
    box-shadow: 0 8px 30px #ddd;

}
#certify  .swiper-slide img{
    display:block;
    width: 450px;
    height: 260px;
}
#certify  .swiper-slide p a{
    cursor: pointer;
    display: block;
	line-height: 98px;
	padding-top: 0;
	text-align: center;
	color: #636363;
	font-size: 1.1em;
	margin: 0;
}

#certify .swiper-pagination {
	width: 100%;
	bottom: 0px;
}

#certify .swiper-pagination-bullets .swiper-pagination-bullet {
	margin: 0 5px;
	border: 3px solid #fff;
	background-color: #d5d5d5;
	width: 10px;
	height: 10px;
	opacity: 1;
}

#certify .swiper-pagination-bullets .swiper-pagination-bullet-active {
	border: 3px solid #00aadc;
	background-color: #fff;
}

#certify .swiper-button-prev {
	left: 0px;
	width: 45px;
	height: 45px;
	background: url(~/assets/img/wm_button_icon.png) no-repeat;
	background-position: 0 0;
	background-size: 100%;
}

#certify .swiper-button-prev:hover {
	background-position: 0 -46px;
	background-size: 100%
}

#certify .swiper-button-next {
	right: 0px;
	width: 45px;
	height: 45px;
	background: url(~/assets/img/wm_button_icon.png) no-repeat;
	background-position: 0 -93px;
	background-size: 100%;
}

#certify .swiper-button-next:hover {
	background-position: 0 -139px;
	background-size: 100%
}
</style>