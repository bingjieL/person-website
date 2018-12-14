import request from './request'
import { hostUrl } from './apiConfig'

export const ApiGetBlogDetail= (params) => {
    return request.post(`${hostUrl}/api/blog/getById`, params)
}
