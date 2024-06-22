
import { getEmailCredentialsFromEmail, getUserFromId } from '$lib/account'
import {json} from '@sveltejs/kit'
import { comparePassword } from '../../../utils/password'
import { createSession } from '$lib/session'

export async function POST({ request }) {
    try{
        const credentials = await request.json()
        // console.log("credentials", credentials)
        if(credentials?.email == null)
          return json({error: "Email is required."}, {status: 400})
        if(credentials?.password == null)
            return json({error: "Password is required."}, {status: 400})
        const userEmail = await getEmailCredentialsFromEmail(credentials.email as string)
        if(userEmail == null)
            return json({error: "User not found."}, {status: 400})
    
        const comparison = await comparePassword(credentials.password as string, userEmail.password)
        if(comparison == false)
            return json({error: "Invalid password."}, {status: 400})
        const user = await getUserFromId(userEmail.userId)
        if(user == null)
            return json({error: "User not found."}, {status: 400})
        // return json object with the user data
        let accessToken = await createSession(user.id)
        return json({
          sessionToken: accessToken
        }, {status: 200});
    }catch(e){
        console.log(e)
        return json({error: e}, {status: 500})
    }


//   const response = await resolve(request)
//   return response
}