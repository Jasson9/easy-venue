import type { LayoutServerLoad } from "./$types"

export const load: LayoutServerLoad = async (event) => {

  var session = await event.locals.auth()
  // console.log(session?.user?.id)
  return {
    session: session,
  }
}
