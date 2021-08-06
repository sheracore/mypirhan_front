import http from './httpService'
import { apiUrl } from '../config.json'

const apiEndpoint = apiUrl + '/billing/designupload/'

function designUploadUrl(id){
    // return apiEndpoint + id   Or we can do this:
    return `${apiEndpoint}${id}/`
}

export function getDesignUploads(){
    return http.get(apiEndpoint)
}

export function getDesign(designId){
    console.log(designUploadUrl(designId))
    return http.get(designUploadUrl(designId))
}

export function saveDesignUpload(design) {
    if(design.id){
        const body = {...design}
        delete body.id
        console.log("design serviceeee",design.id,body)
        return http.put(designUploadUrl(design.id), body)
    }

    console.log("design serviceeee",design)
    return http.post(apiEndpoint, design)    
}

export function deleteDesignUpload(designId){
    return http.delete(designUploadUrl(designId))
}


export { apiEndpoint }