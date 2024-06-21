import type { PageServerLoad } from './$types.js'
import { getVenues, searchVenueByKeyword} from '$lib/venues.js'
import { getUserWishlist } from '$lib/wishlist.js'
import type { Venue, Wishlist } from '@prisma/client';
import { redirect } from '@sveltejs/kit';

export async function load(event){
    let wishlist: Wishlist[] = [];
    let auth;
    try {
        auth = await event.locals.auth()
        if (auth?.user?.id){
            wishlist = await getUserWishlist(auth.user.id)
        }
    } catch (error) {
        console.log(error)
    }
    
    return {
        authData: auth,
        wishlist: wishlist,
    }
}