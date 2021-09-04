import http from './httpService'
import { apiUrl } from '../config.json'


const apiEndpoint = apiUrl + '/product/products/'

function productUrl(id){
    // return apiEndpoint + id   Or we can do this:
    return `${apiEndpoint}${id}/`
}

export function getProducts(){
    return http.get(apiEndpoint)
}

export function getProduct(productId){
    console.log(productUrl(productId))
    return http.get(productUrl(productId))
}

export function saveProduc(product) {
    if(product.id){
        const body = {...product}
        delete body.id
        console.log("product serviceeee",product.id,body)
        return http.put(productUrl(product.id), body)
    }

    console.log("product serviceeee",product)
    return http.post(apiEndpoint, product)    
}

export function deleteProduct(productId){
    return http.delete(productUrl(productId))
}


export { apiEndpoint }