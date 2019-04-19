const isProduct = process.env.NODE_ENV == 'production'

export const hostUrl = isProduct?'https://api.8bjl.cn':'https://api.8bjl.cn'

// http://192.168.2.105:3030  // 家
// http://192.168.3.85:3030
