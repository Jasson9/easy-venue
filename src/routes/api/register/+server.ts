import {json} from '@sveltejs/kit'
import { saltAndHashPassword } from '../../../utils/password';
import { checkUserExists, createUser } from '$lib/account';


export async function POST({request}) {

    try {
        const data = await request.json();
        if(/\S+@\S+\.\S+/.test(data.email) === false){
            return json({retcode: 400 , error: "Invalid email format"}, {status: 400})
        }
        if(data.username.length < 3){
            return json({retcode: 400 , error: "Username must be at least 3 characters"}, {status: 400})
        }
        if(data.password.length < 8){
            return json({retcode: 400 , error: "Password must be at least 8 characters"}, {status: 400})
        }
        if(data.password !== data.confirmPassword){
            return json({retcode: 400 , error: "Password and Re-enter password does not match"}, {status: 400})
        }

        let userExist = await checkUserExists(data.email, data.username);
        if(userExist){
            return json({retcode: 400 , error: userExist}, {status: 400})
        }

        const { hash, salt } = await saltAndHashPassword(data.password);

        let user = await createUser(data.email, hash, salt, data.username, data.phoneNum);
        
        return json({retcode: 200})
    } catch (error) {
        console.log(error)
        return json({retcode: 500 , error: "Server Error"}, {status: 500})
    }
}