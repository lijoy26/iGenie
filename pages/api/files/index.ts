import { NextApiRequest, NextApiResponse } from 'next';
import { DefaultErrorResponse } from '../interface/response.t';
import { jwtMiddleware } from '../middleware/jwtMiddleware';
import { createPresignedURL } from './upload';
import ValidateFileCreationObject from './validator/create.file.validator';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    jwtMiddleware(req, res).then((response) => {
        if (response) {
            DefaultErrorResponse.error = 'unauthorized'
            return res.status(401).json(DefaultErrorResponse)
        } else {
            if (req.method === 'POST') {
                ValidateFileCreationObject(req.body).then((value) => {
                    if (value.details) {
                        DefaultErrorResponse.error = value.details;
                        return res.status(400).json(DefaultErrorResponse)
                    } else {
                        createPresignedURL(value).then((data) => {
                            return res.status(200).json(data)
                        }).catch((error) => {
                            return res.status(400).json(error)
                        })
                    }

                }).catch((err) => {
                    DefaultErrorResponse.error = err;
                    return res.status(500).json(DefaultErrorResponse)
                })
            } else {
                DefaultErrorResponse.error = "Method not allowed";
                return res.status(404).json(DefaultErrorResponse)
            }
        }
    })

}
export default handler;