import axios from "axios";
import "./interceptors"
export const getTraineesService = () => {
    return axios.get(`/api/trainees`)

}

export const addTraineeService = (traineeData: any) => {
    return axios.post('/api/trainees', traineeData)
}
export const editTraineeService = (traineeData: any, id: string) => {
    return axios.patch(`/api/trainees?id=${id}`, traineeData)
}
