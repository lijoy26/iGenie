import { error } from 'console';
import { NextApiRequest, NextApiResponse } from 'next';
import { DefaultErrorResponse, DefaultSuccessResponse } from '../interface/response.t';
import { jwtMiddleware } from '../middleware/jwtMiddleware';
import { addProject, deleteProject, listProject, updateProject } from './project';
import ValidateProjectCreationObject from './validator/create.project.validator';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    jwtMiddleware(req, res).then((response) => {
        if (response) {
            DefaultErrorResponse.error = 'unauthorized'
            return res.status(401).json(DefaultErrorResponse)
        } else {
            if (req.method === 'GET') {
                listProject().then((data) => {
                    return res.status(200).json(data)
                }).catch((error) => {
                    return res.status(404).json(error)
                })
            } else if (req.method === 'POST') {
                ValidateProjectCreationObject(req.body).then((value) => {
                    if (value.details) {
                        DefaultErrorResponse.error = value.details;
                        return res.status(400).json(DefaultErrorResponse)
                    } else {
                        addProject(value).then((data) => {
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
                    updateProject(req.body, req.query.id).then((data) => {
                        return res.status(200).json(data)
                    }).catch((error) => {
                        return res.status(200).json(error)
                    })
                } else {
                    DefaultErrorResponse.error = "Please provide id";
                    return res.status(200).json(DefaultErrorResponse)
                }

            } else if (req.method === 'DELETE') {
                if (req.query.id) {
                    deleteProject(req.query.id).then((data) => {
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