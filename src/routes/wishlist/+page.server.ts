import { redirect } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';
import type { Venue, Wishlist } from '@prisma/client';
import { getVenues } from '$lib/venues';
import { getUserWishlist } from '$lib/wishlist';
 
export const load: PageServerLoad = async (event) => {
    var session = await event.locals.auth();
    if (!session){
        throw redirect(307,'/');
    }

    let venues:Venue[] = [];
    let wishlist: Wishlist[] = [];
    let auth;
    try {
        venues = await getVenues()
        auth = await event.locals.auth()
        if (auth?.user?.id){
            wishlist = await getUserWishlist(auth.user.id)
        }
    } catch (error) {
        console.log(error)
    }

    return {
        session: session,
        venues: venues,
        authData: auth,
        wishlist: wishlist
    };
};
