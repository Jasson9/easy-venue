import { randomUUID } from 'crypto';
import {client} from './client';

export async function getUserIdFromSession(sessionToken:string){
    let session = await client.session.findUnique({
        where: {
            sessionToken: sessionToken
        }
    });
    return session?.userId;
}

export async function createSession(userId:string, sessionId?:string){
    sessionId = sessionId || randomUUID(); 
    await client.session.create({
        data: {
            userId: userId,
            sessionToken: sessionId,
            expires: new Date(Date.now() + 1000*60*60*24*30),
        }
    });
    return sessionId;
}