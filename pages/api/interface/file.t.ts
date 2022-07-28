export interface CreateFileDto {
    name: string;
    type: string;
    id: string;
    operation: string;
}
export interface S3Params {
    Bucket: string | undefined;
    Key: string;
    Expires: number | undefined;
    ContentType?: string;
}