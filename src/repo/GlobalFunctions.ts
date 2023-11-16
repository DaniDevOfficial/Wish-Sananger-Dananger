// Note: Global Functions
import bcrypt from 'bcryptjs';

export function hashPasswordBcrypt(password: string): string {
  const saltRounds = 10;
  return bcrypt.hashSync(password, saltRounds);
}

export function checkPassword(inputPassword: string, hashedPassword: string): boolean {
  return bcrypt.compareSync(inputPassword, hashedPassword);
}
