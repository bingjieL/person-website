import request from './request'
import { hostUrl } from './apiConfig'

export const ApiGetMusic = (params) => {
    return request.post(`${hostUrl}/api/music/get`, params)
}

