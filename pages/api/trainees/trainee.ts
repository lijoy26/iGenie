import db from "../aws/db";
import CONST from '../const'
import { CreateUserDto } from '../interface/user.t';
import { DefaultErrorResponse, DefaultSuccessResponse } from '../interface/response.t';
import shortid from 'shortid';
import { getUserByEmail, getUserId } from "../users/user";

export const addTrainee = async (user: CreateUserDto): Promise<any> => {
    user.id = shortid.generate();
    return new Promise((resolve) => {
        getUserByEmail(user.email, CONST.RECORD_TYPE.TRAINEE).then((data) => {
            if (!data) {
                const params: any = {
                    TableName: process.env.DYNAMODB_TABLE_NAME,
                    Item: user
                };
                db.put(params, (error, data) => {
                    if (error) {
                        DefaultErrorResponse.error = error;
                        resolve(DefaultErrorResponse);
                    } else {
                        DefaultSuccessResponse.data = user;
                        resolve(DefaultSuccessResponse);
                    }
                })
            } else {
                DefaultErrorResponse.error = `Trainee Already exist with email ${user.email}`;
                resolve(DefaultErrorResponse);
            }
        })
    })
}
export const updateTrainee = async (user: CreateUserDto, id: string | any): Promise<any> => {
    return new Promise((resolve) => {
        getUserId(id, CONST.RECORD_TYPE.TRAINEE).then((data) => {
            if (data) {
                const patchObjetc = { ...data, ...user }
                user.id = id;
                user.type = CONST.RECORD_TYPE.TRAINEE;
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
                        DefaultSuccessResponse.data = user;
                        resolve(DefaultSuccessResponse);
                    }
                })
            } else {
                DefaultErrorResponse.error = "User Not Found";
                resolve(DefaultErrorResponse);
            }
        })
    })
}
export const deleteTrainee = async (id: string | any): Promise<any> => {
    return new Promise((resolve) => {
        getUserId(id, CONST.RECORD_TYPE.TRAINEE).then((data) => {
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
                DefaultErrorResponse.error = "User Not Found";
                resolve(DefaultErrorResponse);
            }
        })
    })
}
export const listTrainee = async (): Promise<any> => {
    return new Promise((resolve) => {

        const params: any = {
            TableName: process.env.DYNAMODB_TABLE_NAME,
            FilterExpression: "#type = :recordType",
            ExpressionAttributeNames: {
                "#type": "type"
            },
            ExpressionAttributeValues: {
                ":recordType": CONST.RECORD_TYPE.TRAINEE
            }
        };
        db.scan(params, (error, data) => {
            if (error) {
                DefaultErrorResponse.error = error;
                resolve(DefaultErrorResponse);
            } else {
                DefaultSuccessResponse.data = data.Items;
                resolve(DefaultSuccessResponse);
            }
        })
    })
}