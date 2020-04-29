// import {http, request , get_req , post_req} from "./network"
import http from './network'

export function login(data){
    return http.post('/login',data)
};
export function getShowInfo(){
    return http.get('./show')
}
export function info_search(data){
    return http.get('/search', {params: data})
}
