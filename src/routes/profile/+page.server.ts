import { redirect } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';
 
export const load: PageServerLoad = async (event) => {
    var session = await event.locals.auth();
    if (!session){
        throw redirect(307,'/');
    }
    return {
        session: session
    };
};
