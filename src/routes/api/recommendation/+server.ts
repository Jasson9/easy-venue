import { addVenueToWishlist } from '$lib/wishlist';
import {json} from '@sveltejs/kit'
import type { RequestHandler } from './$types';
import { get_session_token } from '$lib/header';
import {getVenuesFromIds} from '$lib/venues';
import { getUserIdFromSession } from '$lib/session';

async function getRecommendationFromAI(criteria:string){
    let res = await fetch('https://jasson9--easy-venue-recommendation-system-webapp-recommend.modal.run/',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({criteria: criteria})
    });
    return res.json();
}

export async function POST({request,cookies}){
    try {
        const data = await request.json();
        let criteria = data.criteria;

        let recommendation = await getRecommendationFromAI(criteria);
        console.log(recommendation)
        let venues = await getVenuesFromIds(recommendation);
        console.log(venues)
        return json({venues: venues})
    } catch (error) {
        return json({error: "Server Error"},{status: 500})
    }

}