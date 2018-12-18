import request from './request'
import { hostUrl } from './apiConfig'

export const ApiGetSwiper= (params) => {
    return request.post(`${hostUrl}/api/hotSwiper/get`, params)
}
