import type { NextApiRequest, NextApiResponse } from 'next'
import { adminApp } from './firebase-admin/admin';
import { auth } from 'firebase-admin';
const adminAuth = auth(adminApp);

const getUsers = (maxResults: any, pageToken: any) => {
    if (pageToken) {
        return adminAuth.listUsers(parseInt(maxResults), pageToken)
    } else {
        return adminAuth.listUsers(parseInt(maxResults))
    }

}
const createUser = (userData: any) => {
    if (userData.photoURL) {
        return adminAuth.createUser({
            email: userData.email,
            emailVerified: true,
            password: userData.password,
            displayName: userData.name,
            photoURL: userData.photoURL,
            disabled: false,
        })
    } else {
        return adminAuth.createUser({
            email: userData.email,
            emailVerified: true,
            password: userData.password,
            displayName: userData.name,
            disabled: false,
        })
    }
}
const editUser = (userData: any) => {
    if (userData.photoURL) {
        return adminAuth.updateUser(userData.uid, {
            email: userData.email,
            emailVerified: true,
            password: userData.password,
            displayName: userData.name,
            photoURL: userData.photoURL,
            disabled: false,
        })
    } else {
        return adminAuth.updateUser(userData.uid, {
            email: userData.email,
            emailVerified: true,
            password: userData.password,
            displayName: userData.name,
            disabled: false,
        })
    }

}
const handler = (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        // Process a POST request
        return getUsers(req.query.limit, req.query.pageToken).then((data) => {
            return res.status(200).json(
                {
                    "success": true,
                    "data": data,
                    "error": {}
                }
            )
        }).catch((error) => {
            return res.status(500).json(
                {
                    "success": false,
                    "data": {},
                    "error": {
                        "msg": "Internal Server Error",
                        "error": error
                    }
                }
            )
        })

    } else if (req.method === 'POST') {
        // Handle any other HTTP method

        return createUser(req.body).then((data) => {
            return res.status(200).json(
                {
                    "success": true,
                    "data": data,
                    "error": {}
                }
            )
        }).catch((error) => {
            return res.status(500).json(
                {
                    "success": false,
                    "data": {},
                    "error": {
                        "msg": "Internal Server Error",
                        "error": error
                    }
                }
            )
        })
    } else if (req.method === 'PATCH') {
        // Handle any other HTTP method

        return editUser(req.body).then((data) => {
            return res.status(200).json(
                {
                    "success": true,
                    "data": data,
                    "error": {}
                }
            )
        }).catch((error) => {
            return res.status(500).json(
                {
                    "success": false,
                    "data": {},
                    "error": {
                        "msg": "Internal Server Error",
                        "error": error
                    }
                }
            )
        })
    }
    else {

    }
}
export default handler;