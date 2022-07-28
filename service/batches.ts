import axios from "axios";
import "./interceptors"
export const getBatchesService = () => {
    return axios.get(`/api/batches`).then((reponse) => reponse.data)

}

export const addBatchService = (batchData: any) => {
    return axios.post('/api/batches', batchData)
}
export const editBatchService = (traineeData: any, id: string) => {
    return axios.patch(`/api/batches?id=${id}`, traineeData)
}
