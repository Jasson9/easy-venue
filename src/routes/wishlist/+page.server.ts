import { redirect } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';
import type { Venue, Wishlist } from '@prisma/client';
import { getVenues } from '$lib/venues';
import { getUserWishlist, getVenuesFromWishlistIds } from '$lib/wishlist';
 
export const load: PageServerLoad = async (event) => {
    var session = await event.locals.auth();
    if (!session){
        throw redirect(307,'/');
    }

    let wishlistVenues:Venue[] = [];
    let wishlist: Wishlist[] = [];
    let auth;
    try {
        auth = await event.locals.auth()
        if (auth?.user?.id){
            wishlist = await getUserWishlist(auth.user.id)
            var wishlistIds = wishlist.map(wishlist => wishlist.venueId);
            wishlistVenues = await getVenuesFromWishlistIds(wishlistIds)
        }
    } catch (error) {
        console.log(error)
    }

    return {
        session: session,
        authData: auth,
        wishlist: wishlist,
        wishlistVenues: wishlistVenues
    };
};
