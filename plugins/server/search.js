import request from './request'
import { hostUrl } from './apiConfig'



export const ApiGetBlog= (params) => {
    return request.post(`${hostUrl}/api/blog/get`, params)
}

export const ApiSearchBlog= (params) => {
    return request.post(`${hostUrl}/api/blog/findBlogSearch`, params)
}