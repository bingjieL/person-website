import axios from 'axios'
import { Message } from 'element-ui'
import Router from '@/router'

const service = axios.create({
    headers:{
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
    timeout: 10000,
})

service.interceptors.request.use(
  config => {
    // let token = ''
    // if (!process.server) {
    // token = localStorage.getItem('token') || '' 
    // }
    // if (token) {
    //   config.headers.auth = token 
    // }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// 返回结果处理
service.interceptors.response.use(
  res => {
    let { code, message } = res.data
    if(code != 200){
        Message.error({ message: message })
    }
    return res.data
  },
  error => {
    // let url = error.response && error.response.config.url
    console.log('---> error', error.response)
    if (error.response) {
      switch (error.response.status) {
        case 401:
          Router.push('/login')
          break
        case 404:
        case 500:
        case 502:
          console.log('接口异常:' + error.response.status)
          Message.error({ message: '~~ 网络异常!!' })
          break
      }
    }
    return Promise.reject(error)
  }
)

/**
 * get 请求方法
 * @param url
 * @param params
 * @returns {Promise}
 */
export function get (url, params = {}, option = {}) {
  return new Promise((resolve, reject) => {
    service
      .get(url, {
        params: params,
        ...option
      })
      .then(response => {
        resolve(response)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * post 请求方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post (url, data = {}, option = {}) {
  return new Promise((resolve, reject) => {
    service.post(url, data, { ...option }).then(
      response => {
        resolve(response)
      },
      err => {
        reject(err)
      }
    )
  })
}

/**
 * delete 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function del (url, data = {}, option = {}) {
  return new Promise((resolve, reject) => {
    service.delete(url, { data, ...option }).then(
      response => {
        resolve(response)
      },
      err => {
        reject(err)
      }
    )
  })
}

/**
 * put 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function put (url, data = {}, option = {}) {
  console.log(data)
  return new Promise((resolve, reject) => {
    service.put(url, data, { ...option }).then(
      response => {
        resolve(response)
      },
      err => {
        reject(err)
      }
    )
  })
}

/**
 * all 并发请求封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function all (arr) {
  const _arr = arr.map((item, i) => {
    if (typeof item === 'string') {
      return service.get(item)
    } else {
      if (item.method) {
        return service[item.method](item.url)
      }
    }
  })
  return new Promise((resolve, reject) => {
    axios
      .all(_arr)
      .then(
        axios.spread(function () {
          const resultArr = [...arguments]
          resolve(resultArr)
        })
      )
      .catch(err => {
        reject(err)
      })
  })
}

export default {
  get,
  post,
  put,
  delete: del,
  all
}