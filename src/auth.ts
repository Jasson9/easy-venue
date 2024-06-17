import { SvelteKitAuth } from "@auth/sveltekit"
import Apple from "@auth/sveltekit/providers/apple"
import Auth0 from "@auth/sveltekit/providers/auth0"
import AzureB2C from "@auth/sveltekit/providers/azure-ad-b2c"
import BoxyHQSAML from "@auth/sveltekit/providers/boxyhq-saml"
import Cognito from "@auth/sveltekit/providers/cognito"
import Coinbase from "@auth/sveltekit/providers/coinbase"
import Discord from "@auth/sveltekit/providers/discord"
import Dropbox from "@auth/sveltekit/providers/dropbox"
import Facebook from "@auth/sveltekit/providers/facebook"
import GitHub from "@auth/sveltekit/providers/github"
import GitLab from "@auth/sveltekit/providers/gitlab"
import Google from "@auth/sveltekit/providers/google"
import Hubspot from "@auth/sveltekit/providers/hubspot"
import Keycloak from "@auth/sveltekit/providers/keycloak"
import LinkedIn from "@auth/sveltekit/providers/linkedin"
import Netlify from "@auth/sveltekit/providers/netlify"
import Okta from "@auth/sveltekit/providers/okta"
import Passage from "@auth/sveltekit/providers/passage"
import Pinterest from "@auth/sveltekit/providers/pinterest"
import Reddit from "@auth/sveltekit/providers/reddit"
import Slack from "@auth/sveltekit/providers/slack"
import Spotify from "@auth/sveltekit/providers/spotify"
import Twitch from "@auth/sveltekit/providers/twitch"
import Twitter from "@auth/sveltekit/providers/twitter"
import WorkOS from "@auth/sveltekit/providers/workos"
import Zoom from "@auth/sveltekit/providers/zoom"
import { env } from "$env/dynamic/private"
import type {JWT} from "@auth/core/jwt"
import type {User, Account, Profile,Session,DefaultSession} from "@auth/core/types"
import type {AdapterUser,AdapterSession} from "@auth/core/adapters"
import type { Awaitable } from "@auth/core/types";
import type { CredentialInput } from "@auth/sveltekit/providers"

import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
 
const prisma = new PrismaClient()


async function session({ session, token }: { session: any, token: JWT }) {
  // console.log(session)
  session.accessToken = token?.accessToken
  return session
}

async function jwtCallback({ token, user, account, profile, trigger, isNewUser, session }: { token: JWT, user: User | AdapterUser, account: Account | null, profile?: Profile, trigger?: "signIn" | "update" | "signUp", isNewUser?: boolean, session?: any }): Promise<JWT | null> {
  // console.log(account);
  token.accessToken = account?.access_token;
  return token
}

export const { handle, signIn, signOut } = SvelteKitAuth({
  trustHost: true,
  providers: [GitHub, Google],
  callbacks: { jwt: jwtCallback, session: session},
  adapter: PrismaAdapter(prisma),
});
