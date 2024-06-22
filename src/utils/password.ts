import bcrypt from 'bcrypt';

export async function saltAndHashPassword(password: string, salt?:string): Promise<{hash:string,salt:string}> {
  salt = salt || await bcrypt.genSalt(10)
  let hash = await bcrypt.hash(password, salt)
  return {hash: hash, salt: salt}
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash)
}