import * as admin from 'firebase-admin'
const timestamp: string = Date.now().toString();
const adminApp = admin.initializeApp({
    credential: admin.credential.cert({
        "project_id": process.env.FIREBASE_PROJECT_ID,
        "private_key": process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        "client_email": process.env.FIREBASE_CLIENT_EMAIL
    } as any),
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL
}, `freshbee-admin${timestamp}`)

export { adminApp };