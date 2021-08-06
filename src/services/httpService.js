import axios from 'axios'
import logger from './logService'
import { toast } from 'react-toastify'

// axios.interceptors.response.use(success, error)
axios.interceptors.response.use(null, error => {
  const expectedError = 
    error.response &&
    error.response.status >= 400 && 
    error.response.status < 500

  if (!expectedError) {
    logger.log(error)
    toast("An unexpected error occurred")
    // toast.error("An unexpected error occurred")
  }
  return Promise.reject(error) 
})

function setJwt(jwt){
  axios.defaults.headers.common['Authorization'] = jwt
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt
}