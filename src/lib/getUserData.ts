import {client} from './client'

export const getUserData = async (userId: string) => {
    return await client.user.findUnique({
        where: {
            id: userId
        }
    });
}