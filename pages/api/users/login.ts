import { NextApiRequest, NextApiResponse } from 'next';
import db from '../aws/db';
import jwt from 'jsonwebtoken';
import CONST from '../const'
import { loginUser } from './user';
const handler = (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        loginUser(req.body).then((data) => {
            if (data.success) {
                return res.status(200).json(data)
            } else {
                return res.status(403).json(data)
            }
        }).catch((error) => {
            return res.status(404).json(error)
        })
    }
}
export default handler;