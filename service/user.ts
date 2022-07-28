import axios from "axios";
import "./interceptors"
export const getUsers = (limiTo: number, pageToken = null) => {
    if (pageToken) {
        return axios.get(`/api/users?limit=${limiTo}&&pageToken=${pageToken}`)
    } else {
        return axios.get(`/api/users?limit=${limiTo}`)
    }
}

export const adduserService = (userData: any) => {
    return axios.post('/api/users', userData)
}
export const edituserService = (userData: any, id: string) => {
    return axios.patch(`/api/users?id=${id}`, userData)
}

export const userLogin = (email: string, password: string): Promise<any> => {
    return axios.post(`/api/users/login`, { email, password })
}