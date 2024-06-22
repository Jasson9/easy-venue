import { SvelteKitAuth } from "@auth/sveltekit"
import Google from "@auth/sveltekit/providers/google"
import { env } from "$env/dynamic/private"
import type {JWT} from "@auth/core/jwt"
import type {User, Account, Profile,Session,DefaultSession} from "@auth/core/types"
import type {AdapterUser,AdapterSession} from "@auth/core/adapters"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import Credentials from '@auth/sveltekit/providers/credentials'
import { comparePassword, saltAndHashPassword } from "./utils/password";
import { getEmailCredentialsFromEmail, getUserFromId } from "$lib/account"
import { randomUUID } from "crypto"
import {client} from './lib/client'
import { createSession } from "$lib/session"

export const providers = [
  Google(
    {
      clientId: env.AUTH_GOOGLE_ID,
      clientSecret: env.AUTH_GOOGLE_SECRET,
    }
  
  )]

function createJWTToken(user: User | AdapterUser, accessToken:string): JWT {
  let token: JWT = {
    email:user.email,
    exp: (new Date(Date.now() + 1000*60*60*24*30)).getTime()/1000,
    iat: (new Date()).getTime()/1000,
    jti: accessToken,
    name: user.name,
    picture: user.image,
    sub: user.id,
  }
  return token
}

async function jwtCallback({ token, user, account, profile, trigger, isNewUser, session }: { token: JWT, user: User | AdapterUser | any, account: Account | null, profile?: Profile, trigger?: "signIn" | "update" | "signUp", isNewUser?: boolean, session?: Session }): Promise<JWT | null> {
  if (account && token.accessToken == null) {
    if(account.access_token == null && user.accessToken != null){
      token.accessToken = user.accessToken
    }
    else token.accessToken= account.access_token
    
  }
  if(profile)token.id = profile.id
  if(session){
    session.user = user
  }
  return token
}

async function loginCallback({ user, account, profile, trigger, credentials, session }: { user: User | AdapterUser, account: Account | null, profile?: Profile, trigger?: "signIn" | "update" | "signUp", credentials?: any, session?: any }): Promise<boolean> {
  return true;
  // return { user: user, account: account, profile: profile, trigger: trigger, isNewUser: isNewUser, session: session };
}

async function session({ session, token }: { session: any, token: JWT }) {
  session.accessToken = token?.accessToken || token?.jti;
  return session;
}

export const { signIn, signOut, handle } = SvelteKitAuth({
  trustHost: true,
  providers: providers,
  callbacks: { jwt: jwtCallback, session: session, signIn: loginCallback},
  adapter: PrismaAdapter(client),
  pages: {
    signIn: "/login",
    error: "/login",
  },session:{
    strategy: "database",
  }
  
});
