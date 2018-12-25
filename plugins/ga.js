/*
 *
 * GA 统计服务 只在生成模式的客户端中使用
 *
*/
const isProdcut = process.env.NODE_ENV === 'production'

if (process.client && isProdcut) {
  /*
  ** Google 统计分析脚本
  */
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
  /*
  ** 当前页的访问统计
  */
  ga('create', 'UA-131212595-1', 'auto')
}

export default ({ app: { router }, store }) => {
  /*
  ** 每次路由变更时进行pv统计
  */
  router.afterEach((to, from) => {
    /*
    ** 告诉 GA 增加一个 PV
    */
    if(isProdcut) {
      ga('set', 'page', to.fullPath)
      ga('send', 'pageview')
      try {
        window._hmt = window._hmt || []
        window._hmt.push(['_trackPageview', to.fullPath])
      } catch (e) {}
    }
  })
}
