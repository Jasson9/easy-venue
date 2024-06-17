import {client} from './client';

export async function getUserIdFromSession(sessionToken:string){
    let session = await client.session.findUnique({
        where: {
            sessionToken: sessionToken
        }
    });
    return session?.userId;
}