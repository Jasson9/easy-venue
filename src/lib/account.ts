import { client } from './client';


export async function getEmailCredentialsFromEmail(email: string) {
  return await client.emailCredentials.findUnique({
    where: {
      email: email
    }
  });
}

export async function checkUserExists(email: string, username: string): Promise<null|string> {
    let userEmail = await client.emailCredentials.findUnique({
        where: {
            email: email
        }
    });
    let usernameExists = await client.user.findFirst({
        where: {
            name: username
        }
    });

    if(userEmail)return "Email Already Exist";
    if(usernameExists)return "Username Already Exist";
    return null;
}

export async function getUserFromId(userId: string) {
  return await client.user.findUnique({
    where: {
      id: userId
    }
  });
}

export async function createUser(email: string, password: string, salt:string, username: string, phoneNum:string) {
    let user = await client.user.findUnique({where: {email: email}})
    if(user == null){
        user = await client.user.create({
            data: {
                email: email,
                name: username,
                phoneNumber: phoneNum,
            }
        });
    }
    return await client.emailCredentials.create({
        data: {
        email: email,
        password: password,
        salt:salt,
            userId: user.id
        }
    });
}



