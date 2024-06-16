import { addVenueToWishlist } from '$lib/wishlist';
import {json} from '@sveltejs/kit'
import type { RequestHandler } from './$types';

export async function POST({request}){
    const data = await request.json();
    console.log(data);
    let wishlistId = (await addVenueToWishlist(data.userId ,data.venueId)).wishlistId
    return json({wishlistId: wishlistId})
}