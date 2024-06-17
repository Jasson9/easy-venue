import {client} from './client';
import type { User } from '@prisma/client';

export const getUserWishlist = async (userId:string) => {
    return await client.wishlist.findMany({
        where: {
            userId: userId
        }
    });
}

export const getVenuesFromWishlistIds = async (wishlistIds:string[]) => {
    return await client.venue.findMany({
        where: {
            venueId: {
                in: wishlistIds
            }
        }
    });
}

export const getUserWishlistVenues = async (userId:string) => {
    var wishlists = await client.wishlist.findMany({
        where: {
            userId: userId
        }
    });

    var venueIds = wishlists.map(wishlist => wishlist.venueId);
    return await client.venue.findMany({
        where: {
            venueId: {
                in: venueIds
            }
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

export const removeVenueFromWishlist = async (wishlistId:string, userId:string) => {
    return await client.wishlist.delete({
        where: {
            wishlistId: wishlistId,
            userId: userId
        }
    });
}