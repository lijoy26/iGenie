import shortid from 'shortid';
import { DefaultErrorResponse, DefaultSuccessResponse } from "../interface/response.t";
import db from "../aws/db";
import CONST from '../const'
import { CreateProjectDto } from "../interface/project.t";

export const addProject = async (project: CreateProjectDto): Promise<any> => {
    project.id = shortid.generate();
    return new Promise((resolve) => {
        getProjectByCode(project.code, CONST.RECORD_TYPE.PROJECT).then((data) => {
            if (!data) {
                const params: any = {
                    TableName: process.env.DYNAMODB_TABLE_NAME,
                    Item: project
                };
                db.put(params, (error, data) => {
                    if (error) {
                        DefaultErrorResponse.error = error;
                        resolve(DefaultErrorResponse);
                    } else {
                        DefaultSuccessResponse.data = project;
                        resolve(DefaultSuccessResponse);
                    }
                })
            } else {
                DefaultErrorResponse.error = "Project Already exist";
                resolve(DefaultErrorResponse);
            }
        })
    })
}
export const updateProject = async (project: CreateProjectDto, id: any): Promise<any> => {

    return new Promise((resolve) => {
        getProjectById(id, CONST.RECORD_TYPE.PROJECT).then((data) => {
            if (data) {
                const patchObjetc = { ...data, ...project }
                project.id = id;
                project.type = CONST.RECORD_TYPE.PROJECT;
                const params: any = {
                    TableName: process.env.DYNAMODB_TABLE_NAME,
                    Key: {
                        id
                    },
                    Item: patchObjetc
                };
                db.put(params, (error, data) => {
                    if (error) {
                        DefaultErrorResponse.error = error;
                        resolve(DefaultErrorResponse);
                    } else {
                        DefaultSuccessResponse.data = project;
                        resolve(DefaultSuccessResponse);
                    }
                })
            } else {
                DefaultErrorResponse.error = "Project Not Found";
                resolve(DefaultErrorResponse);
            }
        })
    })
}
export const deleteProject = async (id: string | any): Promise<any> => {
    return new Promise((resolve) => {
        getProjectById(id, CONST.RECORD_TYPE.PROJECT).then((data) => {
            if (data) {
                const params: any = {
                    TableName: process.env.DYNAMODB_TABLE_NAME,
                    Key: {
                        id
                    }
                };
                db.delete(params, (error, data) => {
                    if (error) {
                        DefaultErrorResponse.error = error;
                        resolve(DefaultErrorResponse);
                    } else {
                        DefaultSuccessResponse.data = id;
                        resolve(DefaultSuccessResponse);
                    }
                })
            } else {
                DefaultErrorResponse.error = "Project Not Found";
                resolve(DefaultErrorResponse);
            }
        })
    })
}
export const listProject = async (): Promise<any> => {
    return new Promise((resolve) => {

        const params: any = {
            TableName: process.env.DYNAMODB_TABLE_NAME,
            FilterExpression: "#type = :recordType",
            ExpressionAttributeNames: {
                "#type": "type"
            },
            ExpressionAttributeValues: {
                ":recordType": CONST.RECORD_TYPE.PROJECT
            }
        };
        db.scan(params, (error, data) => {
            if (error) {
                DefaultErrorResponse.error = error;
                resolve(DefaultErrorResponse);
            } else {
                DefaultSuccessResponse.data = {
                    projects: data.Items
                };
                resolve(DefaultSuccessResponse);
            }
        })
    })
}

export const getProjectByCode = async (code: string, type: string): Promise<any> => {
    return new Promise((resolve) => {

        const params: any = {
            TableName: process.env.DYNAMODB_TABLE_NAME,
            FilterExpression: "#pcode = :projectCode",
            ExpressionAttributeNames: {
                "#pcode": "code"
            },
            ExpressionAttributeValues: {
                ":projectCode": code
            }
        };
        db.scan(params, (error, data: any) => {
            if (error) {
                DefaultErrorResponse.error = error;
                resolve(DefaultErrorResponse);
            } else {
                if (data.Items.length && data.Items[0].type === type) {
                    resolve(data.Items[0]);
                } else {

                    resolve(false);
                }
            }
        })
    })
}

export const getProjectById = async (id: string, type: string): Promise<any> => {
    return new Promise((resolve) => {

        const params: any = {
            TableName: process.env.DYNAMODB_TABLE_NAME,
            Key: {
                id
            }
        };
        db.get(params, (error, data: any) => {
            if (error) {
                DefaultErrorResponse.error = error;
                resolve(DefaultErrorResponse);
            } else {
                if (data.Item && data.Item.type == type) {
                    resolve(data.Item);
                } else {

                    resolve(false);
                }
            }
        })
    })
}