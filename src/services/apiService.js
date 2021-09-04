import axios from "axios"
// import { notification } from "antd"
import { toast } from "react-toastify";
import { apiUrl } from '../config.json'
// import global from "../globals/Config"
// import history from "../history"

// const state = {
//   baseUrl: process.env.REACT_APP_BASE_URL.endsWith("/")
//     ? process.env.REACT_APP_BASE_URL.substring(
//         0,
//         process.env.REACT_APP_BASE_URL.length - 1
//       )
//     : process.env.REACT_APP_BASE_URL,
// }
const state = {
 baseUrl: apiUrl
} 

export const handleError = (error) => {
  if (!error.response) {
    toast.error("مشکل در اتصال با سرور")
  } else if (error.response.status === 400) {
    global.handle400Errors(error.response)
  } else if (error.response.status > 400 && error.response.status < 500) {
    toast.error("مشکلی پیش آمده است")
  } else {
    toast.error("مشکلی پیش آمده است")
  }
}

const mypirhanAxiosInstance = axios.create({})

mypirhanAxiosInstance.interceptors.request.use(
  (config) => {
    // const token = global.getAccessToken()
    const token = ''
    if (token) config.headers["Authorization"] = "Bearer " + token
    config.headers["Content-Type"] = "application/json"
    return config
  },
  (error) => Promise.reject(error)
)

mypirhanAxiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  function (error) {
    const originalRequest = error.config
    if (
      (originalRequest?.url !== `${state.baseUrl}/jwt/refresh/` &&
        error.response &&
        error.response.status !== 401) ||
      originalRequest?.url === `${state.baseUrl}/jwt/create/`
    ) {
      handleError(error)
    }
    if (
      error.response &&
      error.response.status === 401 &&
      originalRequest?.url === `${state.baseUrl}/jwt/refresh/`
    ) {
      return Promise.reject(error)
    }
    if (
      error.response &&
      error.response.status === 401 &&
      originalRequest?.url !== `${state.baseUrl}/jwt/create/` &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true
      return mypirhanAxiosInstance
        .post(`${state.baseUrl}/jwt/refresh/`, {
          // refresh: global.getRefreshToken(),
        })
        .then((res) => {
          if (res.status === 200) {
            // global.setToken(res.data.access)
            // mypirhanAxiosInstance.defaults.headers.common["Authorization"] =
            //   "Bearer " + global.getAccessToken()
            // return mypirhanAxiosInstance(originalRequest)
          }
        })
        .catch((err) => {
          // global.clearLocalStorage()
          // history.push("/login")
        })
    }
    return Promise.reject(error)
  }
)

export const captcha = () => {
  return new Promise((resolve, reject) => {
    mypirhanAxiosInstance
      .post(state.baseUrl + "/captcha/")
      .then((res) => resolve(res))
      .catch((e) => reject(e))
  })
}

export const upload = (addPath, body, config, headers = {}) => {
  return new Promise((resolve, reject) => {
    mypirhanAxiosInstance
      .post(state.baseUrl + addPath, body, config, { headers })
      .then((res) => resolve(res))
      .catch((e) => reject(e))
  })
}

export const uploadUpdate = (addPath, body, config, headers = {}) => {
  return new Promise((resolve, reject) => {
    mypirhanAxiosInstance
      .patch(state.baseUrl + addPath, body, config, { headers })
      .then((res) => resolve(res))
      .catch((e) => reject(e))
  })
}

export const getAll = (addPath, params = {}, headers = {}) => {
  return new Promise((resolve, reject) => {
    mypirhanAxiosInstance
      .get(state.baseUrl + addPath, { headers, params })
      .then((res) => resolve(res))
      .catch((e) => reject(e))
  })
}

export const getById = (addPath, id, headers = {}) => {
  return new Promise((resolve, reject) => {
    mypirhanAxiosInstance
      .get(state.baseUrl + `${addPath}${id}/`, { headers })
      .then((res) => resolve(res))
      .catch((e) => reject(e))
  })
}

export const create = (addPath, body, params, headers = {}) => {
  return new Promise((resolve, reject) => {
    mypirhanAxiosInstance
      .post(state.baseUrl + addPath, body, { headers, params })
      .then((res) => resolve(res))
      .catch((e) => reject(e))
  })
}

export const update = (addPath, id, body, headers = {}) => {
  return new Promise((resolve, reject) => {
    mypirhanAxiosInstance
      .patch(
        id ? state.baseUrl + `${addPath}${id}/` : state.baseUrl + addPath,
        body,
        { headers }
      )
      .then((res) => resolve(res))
      .catch((e) => reject(e))
  })
}

export const remove = (addPath, id, headers = {}) => {
  return new Promise((resolve, reject) => {
    mypirhanAxiosInstance
      .delete(
        id ? state.baseUrl + `${addPath}${id}/` : state.baseUrl + addPath,
        { headers }
      )
      .then((res) => resolve(res))
      .catch((e) => reject(e))
  })
}

export default mypirhanAxiosInstance