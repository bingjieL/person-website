import axios from '~/plugins/axios'

const baseUrl = '/v1'

export const testIndexAdd = ({commit, state}, preload)=>{
    console.log('---> 增加')
    commit('TEST_INDEX_ADD')
}

export const testIndexReduce = ({commit, state}, preload) => {
    console.log('---> 减少')
    commit('TEST_INDEX_REDUCE')
}


export const testAxios = ({commit, state}, preload) => {
    return axios.get(`${baseUrl}/cms/issuerProducts/17640`,preload)
}