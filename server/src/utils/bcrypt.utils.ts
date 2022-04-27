import bcrypt from 'bcrypt';

export function encodePassword(rawPassword: string): string {
  return bcrypt.hashSync(rawPassword, 10)
}

export function comparePasswords(rawPassword: string, hash: string): boolean {
  console.log(rawPassword, hash);

  return bcrypt.compareSync(rawPassword, hash);
}
