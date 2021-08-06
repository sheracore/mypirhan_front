import http from './httpService'
import { apiUrl } from '../config.json'


const apiEndpoint = apiUrl + '/billing/designappendcategory/'

function designCategoryUrl(id){
    // return apiEndpoint + '/' + id   Or we can do this:
    return `${apiEndpoint}/${id}`
}

export function getDesignCategories(){
    return http.get(apiEndpoint)
}

export function getDesignCategory(designCategoryId){
    return http.get(designCategoryUrl(designCategoryId))
}

export function saveDesignCategory(category) {
    if(category._id){
        const body = {...category}
        delete body.id
        return http.put(designCategoryUrl(category.id), body)
    }
    return http.post(apiEndpoint, category)
}

export function deleteDesignCategory(designCategoryId){
    return http.delete(designCategoryUrl(designCategoryId))
}
