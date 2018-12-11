import request from './request'
import { hostUrl } from './apiConfig'

export const ApiGetBanner = (params) => {
    return request.post(`${hostUrl}/api/banner/get`, params)
}

export const ApiGetBlog= (params) => {
    return request.post(`${hostUrl}/api/blog/get`, params)
}
