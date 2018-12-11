import request from './request'
import { hostUrl } from './apiConfig'

export const ApiGetBlogType = (params) => {
    return request.post(`${hostUrl}/api/blogType/get`, params)
}

export const ApiGetBlog= (params) => {
    return request.post(`${hostUrl}/api/blog/get`, params)
}

export const ApiGetBlogByType= (params) => {
    return request.post(`${hostUrl}/api/blog/getByBlogType`, params)
}