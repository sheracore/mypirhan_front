import http from './httpService'
import { apiUrl } from '../config.json'


const apiEndpoint = apiUrl + '/billing/designappend/'

function designUrl(id){
    // return apiEndpoint + id   Or we can do this:
    return `${apiEndpoint}${id}/`
}

export function getDesigns(){
    return http.get(apiEndpoint)
}

export function getDesign(designId){
    console.log(designUrl(designId))
    return http.get(designUrl(designId))
}

export function saveDesign(design) {
    if(design.id){
        const body = {...design}
        delete body.id
        console.log("design serviceeee",design.id,body)
        return http.put(designUrl(design.id), body)
    }

    console.log("design serviceeee",design)
    return http.post(apiEndpoint, design)    
}

export function deleteDesign(designId){
    return http.delete(designUrl(designId))
}


export { apiEndpoint }