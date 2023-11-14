
import { hash } from 'bcrypt';

const saltRounds = 0;


export function hashingWithBcrypt(password) {
hash(password, saltRounds, (err, hashedPassword) => {
  if (err) {
    console.error('Error hashing password:', err);
  } else {
    console.log('Hashed Password (without salt):', hashedPassword);
    return(hashedPassword)
  }
})
}
hashingWithBcrypt('12345678')