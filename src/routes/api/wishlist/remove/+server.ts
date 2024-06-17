import { addVenueToWishlist, removeVenueFromWishlist } from '$lib/wishlist';
import {json} from '@sveltejs/kit'
import type { RequestHandler } from './$types';
import { get_session_token } from '$lib/header';
import { getUserIdFromSession } from '$lib/session';

export async function POST({request}){
    try {
        // console.log(request.headers.get('Authorization'))
        let authHeader = request.headers.get('Authorization');
        if (!authHeader){
            return json({error: "No authorization header"},{status: 401})
        }
        const data = await request.json();
        const token = get_session_token(authHeader);

        if (!token){
            return json({error: "No token"},{status: 401})
        }
        
        let userId = await getUserIdFromSession(token);
        if(userId == null){
            return json({error: "Invalid token"},{status: 401})
        }
        console.log(data);
        await removeVenueFromWishlist(data.wishlistId,userId)
        return json({})
    } catch (error) {
        
        return json({error: "Server Error"},{status: 500})
    }

}