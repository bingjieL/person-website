import request from './request'
import { hostUrl } from './apiConfig'

export const ApiGetBlogDetail= (params) => {
    return request.post(`${hostUrl}/api/blog/getById`, params)
}

export const ApiAddBlogHot= (params) => {
    return request.post(`${hostUrl}/api/blog/addBlogHot`, params)
}

export const ApiAddBlogLikes= (params) => {
    return request.post(`${hostUrl}/api/blog/addBlogLike`, params)
}
