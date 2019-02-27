import axios from 'axios'
// import envconfig from '../envconfig/envconfig'
import Cookie from 'js-cookie'
import { HashRouter } from 'react-router-dom'
import { message } from 'antd';
import { getDataType } from './common'
// import qs from 'qs'
const token = Cookie.get('token') || 'order'
const router = new HashRouter()
const ERROK = 200
// const SERVERURL = envconfig.baseURL

let instance = axios.create({
  // baseURL: SERVERURL,
  withCredentials: true,
  secure: false,
  
})

instance.interceptors.request.use(config => {
  if (!token) {
    router.history.push('/Login')
  } else {
    config.headers.token = token
    config.headers['Content-Type'] = 'application/json;charset=utf-8'
  }
  return config
})

instance.interceptors.response.use(function (res) {
  return res
}, (error) => {
  let response = error.response
  if (response.data.code === 401) {
    router.history.push('/Login')
  } else {
    console.log(response)
  }
  return Promise.reject(error)
})
global.router = router
const ORDERSIGN = '/loanentry'

global.fetch = {
  ERROK: ERROK,
  get: (url, params, config) => {
    url = setSystem(config, url)
    url = appendUrl(url, params);
    return new Promise((resolve, reject) => {
      instance.get(url).then((res) => {
        if(config && config.mock) {
          resolve(res.data)
        } else {
          if (res.data.code === ERROK ) {
            resolve(res.data)
          } else {
            reject(res)
            message.error(res.data.message)
          }
        }
      }).catch((e) => {
        reject(e)
        console.log(JSON.stringify(e))
      })
    })
  },
  post: (url, params, config) => {
    url = setSystem(config, url)
    return new Promise((resolve, reject) => {
      instance.post(url, params, config).then((res) => {
        if(config && config.mock) {
          resolve(res.data)
        } else {
          if (res.data.code === ERROK) {
            resolve(res.data)
          } else {
            reject(res)
            message.error(res.data.message)
          }
        }
      }).catch((e) => {
        reject(e)
        console.log(e)
      })
    })
  },
  delete: (url, config) => {
    url = setSystem(config, url)
    return new Promise((resolve, reject) => {
      instance.delete(url).then((res) => {
        if(config && config.mock) {
          resolve(res.data)
        } else {
          if (res.data.code === ERROK) {
            resolve(res.data)
          } else {
            reject(res)
            message.error(res.data.message)
          }
        }
      }).catch((e) => {
        reject(e)
        console.log(e)
      })
    })
  },
  appendUrl: (url, params) => {
    return appendUrl(url, params);
  }
}

function appendUrl(url, params) {
  if (params) {
    // get请求query带参
    if (getDataType(params) === 'Object') {
      url += (url.indexOf('?') < 0 ? '?' : '&') + setparams(params)
    // get请求params带参
    } else if (getDataType(params) === 'Array') {
      url += params.join('/')
    }
  }
  return url;
}

/**
 * @param {Object} data
 */
function setparams (data) {
  let paramStr = ''
  for (var k in data) {
    var value = data[k] !== undefined ? data[k] : ''
    paramStr += `&${k}=${encodeURIComponent(value)}` // encodeURIComponent   把字符串作为 URI 组件进行编码。
  };
  return paramStr ? paramStr.substring(1) : ''
}
// 设置系统接口标识
function setSystem (config, url) {
  if (config && config.sign) {
    url = config.sign + url
  } else {
    if (process.env.NODE_ENV === 'development') {
      if(config && config.mock) {
        url = url;
      } else {
        url = ORDERSIGN + url
      }
    } else {
      url = '/apis' + ORDERSIGN + url
    }
  }
  return url
}
