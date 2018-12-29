import request from './request'
import { hostUrl } from './apiConfig'

export const ApiUserLogin= (params) => {
    return request.post(`${hostUrl}/api/commnetUser/userLogin`, params)
}

export const ApiUserRegister= (params) => {
    return request.post(`${hostUrl}/api/commnetUser/userRegister`, params)
}

export const ApiUserBasicChange= (params) => {
    return request.post(`${hostUrl}/api/commnetUser/userBasicChange`, params)
}

export const ApiUserChangePwd= (params) => {
    return request.post(`${hostUrl}/api/commnetUser/userBasicPassword`, params)
}

