import { CreateUserDto, LoginUserT } from "../interface/user.t";
import shortid from 'shortid';
import { DefaultErrorResponse, DefaultSuccessResponse, ResponseDto } from "../interface/response.t";
import db from "../aws/db";
import CONST from '../const'
import jwt from 'jsonwebtoken';

export const addUser = async (user: CreateUserDto): Promise<any> => {
    user.id = shortid.generate();
    return new Promise((resolve) => {
        getUserByEmail(user.email, CONST.RECORD_TYPE.USER).then((data) => {
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
                DefaultErrorResponse.error = "User Already exist";
                resolve(DefaultErrorResponse);
            }
        })
    })
}
export const updateUser = async (user: CreateUserDto, id: any): Promise<any> => {

    return new Promise((resolve) => {
        getUserId(id, CONST.RECORD_TYPE.USER).then((data) => {
            if (data) {
                const patchObjetc = { ...data, ...user }
                user.id = id;
                user.type = CONST.RECORD_TYPE.USER;
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
export const deleteUser = async (id: string | any): Promise<any> => {
    return new Promise((resolve) => {
        getUserId(id, CONST.RECORD_TYPE.USER).then((data) => {
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
export const listUser = async (): Promise<any> => {
    return new Promise((resolve) => {

        const params: any = {
            TableName: process.env.DYNAMODB_TABLE_NAME,
            FilterExpression: "#type = :recordType",
            ExpressionAttributeNames: {
                "#type": "type"
            },
            ExpressionAttributeValues: {
                ":recordType": CONST.RECORD_TYPE.USER
            }
        };
        db.scan(params, (error, data) => {
            if (error) {
                DefaultErrorResponse.error = error;
                resolve(DefaultErrorResponse);
            } else {
                DefaultSuccessResponse.data = {
                    users: data.Items
                };
                resolve(DefaultSuccessResponse);
            }
        })
    })
}
export const loginUser = async (user: LoginUserT): Promise<any> => {
    return new Promise((resolve) => {

        getUserByEmail(user.email, CONST.RECORD_TYPE.USER).then((data) => {
            if (data && data.type === CONST.RECORD_TYPE.USER && data.password && data.password === user.password) {
                delete data.password;
                jwt.sign({
                    exp: CONST.TOKEN_EXP.ONE_HR,
                    data: data
                }, process.env.JWT_TOKEN_KEY as any, (error: any, token: any) => {
                    if (error) {
                        DefaultErrorResponse.error = 'Invalid Email/Password';
                        resolve(DefaultErrorResponse);
                    }
                    else {
                        DefaultSuccessResponse.data = {
                            token
                        }
                        resolve(DefaultSuccessResponse);
                    }
                })
            } else {
                DefaultErrorResponse.error = 'Invalid Email/Password';
                resolve(DefaultErrorResponse);
            }
        })
    })
}
export const getUserByEmail = async (email: string, type: string): Promise<any> => {
    return new Promise((resolve) => {

        const params: any = {
            TableName: process.env.DYNAMODB_TABLE_NAME,
            FilterExpression: "#mail = :userEmail",
            ExpressionAttributeNames: {
                "#mail": "email"
            },
            ExpressionAttributeValues: {
                ":userEmail": email
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

export const getUserId = async (id: string, type: string): Promise<any> => {
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