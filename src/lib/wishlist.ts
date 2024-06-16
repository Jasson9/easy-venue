import {client} from './client';
import type { User } from '@prisma/client';

export const getUserWishlist = async (userId:string) => {
    return await client.wishlist.findMany({
        where: {
            userId: userId
        }
    });
}

export const addVenueToWishlist = async (userId:string, venueId: string) => {
    return await client.wishlist.create({
        data: {
            userId: userId,
            venueId: venueId
        }
    });
}

export const removeVenueFromWishlist = async (wishlistId:string) => {
    return await client.wishlist.delete({
        where: {
            wishlistId: wishlistId
        }
    });
}