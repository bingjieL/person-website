
const Webpack = require('webpack')
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: '~~Jay的小栈 || Home Page',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Meta description' },
      { property: 'og:title', content: 'website'},
      { property: 'og:type', content: 'website'},
      { property: 'og:image', content: 'www.baidu.com/img/bd_logo1.png'},
      { property: 'og:description', content: 'website'}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    noscript: [
      { innerHTML: '~~~~~~ 小主删库跑路咯!   ~~~ (꒦_꒦) (꒦_꒦) ~~~' }
    ]
  },
  css:[
    '~/assets/css/common/main.css',
    '~/static/icon/iconfont.css'
  ],
  // 配置页面过渡效果
  transition: {
    name: 'page',
    mode: 'out-in',
    beforeEnter (el) {
      // console.log('Before enter...')
    }
  },
  router: {
    base: '/',
    scrollBehavior: function (to, from, savedPosition) {
      // 所有页面跳转后滚动至顶部
      return { x: 0, y: 0 }
    },
    // middleware: ['default', 'check-bower']
  },
 
  plugins: [
     { src: '~/plugins/router', ssr: true },
     { src: '~/plugins/animate', ssr: false},
     { src: '~/plugins/scroll-progress', ssr: false},
     { src: '~/plugins/copy-right', ssr: false},
     { src: '~/plugins/ga', ssr: false},
     { src: '~/plugins/mixin', ssr: false}
     
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    /**
     * 引入jq
     */
    plugins: [
      new Webpack.ProvidePlugin({
        '$': 'jquery'
      })
    ],
    vendor: ['axios', 'element-ui', 'babel-polyfill'],
    babel: {
      presets: ['es2015', 'stage-0'],
      plugins: ['transform-runtime']
    },
    postcss: [
      require('autoprefixer')({
        browsers: ['last 3 versions']
      })
    ],
    // styleResources: {
    //   scss: './assets/css/common/color.scss',
    //   options:{}
    // }, 
    loaders: [
      {
        test: /\.(png|jpe?g|gif|svg|cur|ico)$/,
        loader: 'url-loader',
        query: {
          limit: 1000, // 1KO
          name: 'img/[name].[hash].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 1000, // 1 KO
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  modules: [
    '@nuxtjs/proxy',
    'bootstrap-vue/nuxt',
    ['bootstrap-vue/nuxt', { css: false }]
  ],
  proxy: [
      ['/v1', { 
        context: ["/v1"],
        secure: false,  
        target: 'http://specials.3tichina.com'
       }
      ]
  ]
}

