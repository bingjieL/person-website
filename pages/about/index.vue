<template>
    <section class="about-wrap">
       <div class="banner">
           <div class="img animated pulse slow">
           </div>
           <h3>About</h3>
       </div>
       <div class="main">
           <h3>
            每个人心里都有一团火,但路过的人只看到烟
           </h3>
       </div>
    </section>
    
</template>

<script>
export default {
    layout: 'hasHeader',
    head: {
        title: 'About Page || ~~Jay的小栈',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'Jay的小栈的About Page' },
            { property: 'og:title', content: 'About Page'},
            { property: 'og:type', content: 'About Page'},
            { property: 'og:description', content: 'About Page'}
        ]
    },
}
</script>

<style scoped lang="scss">
.about-wrap{
    .banner{
        width: 100%;
        height: 65vh;
        overflow: hidden;
        position: relative;
        text-align: center;
        .img {
            width: 100%;
            height: 65vh;
            background: url("~/assets/img/banner/hand.jpeg") center no-repeat;
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
    .main{
        position: relative;
        min-height: 300px;
        >h3{
            display: inline-block;
            padding: 20px;
            font-size:  28px;
            font-weight: 500;
            text-align: center;
            color: linear-gradient(270deg,#c4987a 33%,#ffd5bf 73%);
            position: absolute;
            top: 10vh;
            left: 50%;
            transition: all 0.5s ease;
            background-image:  linear-gradient(270deg,#c4987a 33%,#ffd5bf 73%);
            background-clip: text;
            -webkit-text-fill-color: transparent; 
            transform: translateX(-50%);
            @media screen and(max-width: 600px) {
                width: 80%;
                line-height: 60px;
            }
        }
       
    }
    
}
</style>
