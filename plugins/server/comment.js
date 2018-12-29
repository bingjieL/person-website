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

export const ApiAddReplayPraise= (params) => {
    return request.post(`${hostUrl}/api/comment/replayAddPraise`, params)
}

export const ApiAddCommentPraise= (params) => {
    return request.post(`${hostUrl}/api/comment/commentAddPraise`, params)
}

export const ApiReplayDelete= (params) => {
    return request.post(`${hostUrl}/api/comment/replayDelete`, params)
}

export const ApiCommentDelete= (params) => {
    return request.post(`${hostUrl}/api/comment/commentDelete`, params)
}

