import request from './request'
import { hostUrl } from './apiConfig'


export const ApiGetBook= (params) => {
    return request.post(`${hostUrl}/api/book/get`, params)
}