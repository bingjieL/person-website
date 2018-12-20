import request from './request'
import { hostUrl } from './apiConfig'


export const ApiGetSheet= (params) => {
    return request.post(`${hostUrl}/api/sheet/get`, params)
}