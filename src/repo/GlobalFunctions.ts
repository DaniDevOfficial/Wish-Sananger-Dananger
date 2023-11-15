// Note: Global Functions
import bcrypt from 'bcryptjs';

export function hashPasswordBcrypt(password: string): string {
  const saltRounds = 10;
  return bcrypt.hashSync(password, saltRounds);
}

export function checkPassword(inputPassword: string, hashedPassword: string): boolean {
  return bcrypt.compareSync(inputPassword, hashedPassword);
}

// For testing purposes only. Avoid logging passwords in a production environment.
const plainPassword = '123456';
const hashedPassword = hashPasswordBcrypt(plainPassword);

console.log(`Plain Password: ${plainPassword}`);
console.log(`Hashed Password: ${hashedPassword}`);
console.log(`Password Match: ${checkPassword(plainPassword, hashedPassword)}`);
