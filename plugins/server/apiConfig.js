const isProduct = process.env.NODE_ENV == 'production'

export const hostUrl = isProduct?'http://api.8bjl.cn':'http://192.168.3.78:3030'

// http://192.168.2.105:3030  // 家
// http://192.168.3.78:3030
