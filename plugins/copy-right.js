/*
 *
 * 复制拦截器
 *
*/

if (process.browser) {
 
  const copyText = () => {
    return [ '',
             '著作权归作者所有。',
             '商业转载请联系作者获得授权，非商业转载请注明出处。',
             '作者：Jay',
             '链接：' + location.href,
             '来源：Jay.me',
             ''
           ].join('\n')
  }
  
  // 拼接成html
  const buildText = content => {
    return content + copyText()
  }

  // 拼接成html
  const buildHtml = content => {
    return content + copyText()
  }

  document.addEventListener('copy', e => {
    if(!window.getSelection) return
    if (!window.clickCopy) {
      const content = window.getSelection().toString()
      e.clipboardData.setData('text/plain', buildText(content))
      e.clipboardData.setData('text/html', buildHtml(content))
      e.preventDefault()
    }
  })
}
