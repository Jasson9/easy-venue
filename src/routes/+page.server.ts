import type { PageServerLoad } from './$types.js'
import { getVenues } from '$lib/venues.js'
import { getUserWishlist } from '$lib/wishlist.js'
import type { Venue, Wishlist } from '@prisma/client';

export async function load(event){
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
        venues: venues,
        authData: auth,
        wishlist: wishlist
    }
}