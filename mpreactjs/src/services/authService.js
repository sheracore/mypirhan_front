import jwtDecode from 'jwt-decode'
import http from './httpService'
import { apiUrl } from '../config.json'


// const apiEndpoint = apiUrl + "/auth"
const apiUrl_test = "http://localhost:8000"
const apiEndpoint = apiUrl_test + "/api/user/api-token-auth/"
const tokenKey = "token"

http.setJwt(getJwt())

export async function login(email, password){
    const { data } = await http.post(apiEndpoint, {email, password})
    localStorage.setItem(tokenKey, data.token)
}

export function loginWithJwt(jwt){
    localStorage.setItem(tokenKey, jwt)
}

export function logout(){
    localStorage.removeItem(tokenKey)
}

export function getCurrentUser(){
    try {
        const jwt = localStorage.getItem(tokenKey)
        return jwtDecode(jwt)
      } catch (ex) {
          return null
      }
}

export function getJwt(){
    return localStorage.getItem(tokenKey)
}

export default {
    login,
    logout,
    getCurrentUser,
    loginWithJwt,
    getJwt
}