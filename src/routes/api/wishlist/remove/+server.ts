import { addVenueToWishlist, removeVenueFromWishlist } from '$lib/wishlist';
import {json} from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export async function POST({request}){
    const data = await request.json();
    console.log(data);
    await removeVenueFromWishlist(data.wishlistId)
    return Response.json({});
}