import http from './httpService'
import { apiUrl } from '../config.json'


// const apiEndpoint = apiUrl + "/users"
// const apiUrl_test = "http://localhost:8000"
const apiEndpoint = apiUrl + "/user/create/"

export function register(user) {
    return http.post(apiEndpoint, {
        email: user.username,
        password: user.password,
        name: user.name
    })
}