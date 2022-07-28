import axios from "axios";
import { CreateFileDto } from "../pages/api/interface/file.t";
export const getPresignedURL = (file: CreateFileDto) => {
    return axios.post(`/api/files`, file).then((reponse) => reponse.data)

}

export const uploadFile = async (file: File, presignedUrl: string, updateUploadProgress?: any) => {

    const uninterceptedAxiosInstance = axios.create();
    const axiosResponse = await uninterceptedAxiosInstance({
        method: "put",
        url: presignedUrl,
        data: file,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        headers: {
            "Content-Type": "application/octet-stream",
        }/*,
        onUploadProgress: (ev: ProgressEvent) => {
            const progress = (ev.loaded / ev.total) * 100;
            updateUploadProgress(
                Math.round(progress) === 100 ? 99 : Math.round(progress)
            );
        },*/
    })
        .then((response: any) => {
            if (response.status == 200) {
                // setUploadId(presignedResponse.data.uploadId);
                // updateUploadProgress(100);
            }
            return response;
        })
        .catch((error: any) => {
            //   logger("File upload-Error:", error);
            //   setUploadId(undefined);
            return error;
        });
    return axiosResponse;
}

export const editTraineeService = (traineeData: any, id: string) => {
    return axios.patch(`/api/trainees?id=${id}`, traineeData)
}
