import request from './request'
import { hostUrl } from './apiConfig'

export const ApiGetCommentList= (params) => {
    return request.post(`${hostUrl}/api/comment/getCommentList`, params)
}

export const ApiAddComment= (params) => {
    return request.post(`${hostUrl}/api/comment/addComment`, params)
}

export const ApiAddReplay= (params) => {
    return request.post(`${hostUrl}/api/comment/addReplay`, params)
}