import { NextApiRequest, NextApiResponse } from 'next';
import { DefaultErrorResponse } from '../interface/response.t';
import { jwtMiddleware } from '../middleware/jwtMiddleware';
import { addTrainee, deleteTrainee, listTrainee, updateTrainee } from './trainee';
import ValidateTraineeCreationObject from './validator/create.trainee.validator';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    jwtMiddleware(req, res).then((response) => {
        if (response) {
            DefaultErrorResponse.error = 'unauthorized'
            return res.status(401).json(DefaultErrorResponse)
        } else {
            if (req.method === 'GET') {
                listTrainee().then((data) => {
                    return res.status(200).json(data)
                }).catch((error) => {
                    return res.status(200).json(error)
                })
            } else if (req.method === 'POST') {
                ValidateTraineeCreationObject(req.body).then((value) => {
                    if (value.details) {
                        DefaultErrorResponse.error = value.details;
                        return res.status(400).json(DefaultErrorResponse)
                    } else {
                        addTrainee(value).then((data) => {
                            return res.status(200).json(data)
                        }).catch((error) => {
                            return res.status(200).json(error)
                        })
                    }

                }).catch((err) => {
                    DefaultErrorResponse.error = err;
                    return res.status(500).json(DefaultErrorResponse)
                })
            }
            else if (req.method === 'PATCH') {
                if (req.query.id) {
                    ValidateTraineeCreationObject(req.body).then((value) => {
                        if (value.details) {
                            DefaultErrorResponse.error = value.details;
                            return res.status(400).json(DefaultErrorResponse)
                        } else {
                            updateTrainee(value, req.query.id).then((data) => {
                                return res.status(200).json(data)
                            }).catch((error) => {
                                return res.status(200).json(error)
                            })
                        }

                    }).catch((err) => {
                        DefaultErrorResponse.error = err;
                        return res.status(500).json(DefaultErrorResponse)
                    })
                } else {
                    DefaultErrorResponse.error = "Please provide id";
                    return res.status(200).json(DefaultErrorResponse)
                }
            }
            else if (req.method === 'DELETE') {
                if (req.query.id) {
                    deleteTrainee(req.query.id).then((data) => {
                        return res.status(200).json(data)
                    }).catch((error) => {
                        return res.status(200).json(error)
                    })

                } else {
                    DefaultErrorResponse.error = "Please provide id";
                    return res.status(200).json(DefaultErrorResponse)
                }
            }
        }
    })

}
export default handler;