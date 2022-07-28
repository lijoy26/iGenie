import { DefaultErrorResponse, DefaultSuccessResponse } from "../interface/response.t";
import { CreateFileDto, S3Params } from '../interface/file.t';
import s3 from "../aws/s3";
export const createPresignedURL = async (requestBody: CreateFileDto): Promise<any> => {
    // const s3 = await getS3Object();
    let s3Params: S3Params;
    if (requestBody.operation == 'putObject') {
        s3Params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: `resume/${requestBody.id}/${requestBody.name}`,
            Expires: 60 * 60,
            ContentType: "application/octet-stream"
        };
    } else {
        s3Params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: `resume/${requestBody.id}/${requestBody.name}`,
            Expires: 60 * 60
        };
    }

    return new Promise(async (resolve) => {

        await s3.getSignedUrl(requestBody.operation, s3Params, function (err, data) {
            if (err) {
                DefaultErrorResponse.error = err;
                resolve(DefaultErrorResponse);
            } else {
                DefaultSuccessResponse.data = { "preSingedURL": data };
                resolve(DefaultSuccessResponse);
            }

        });
    })
}