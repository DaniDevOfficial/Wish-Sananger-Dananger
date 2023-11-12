
import { hash } from 'bcrypt';

// Set a constant salt (not recommended for security)
const saltRounds = 0; // You can adjust the number of rounds

// Your password
const password = 'your_password';

// Hash the password without salt
hash(password, saltRounds, (err, hashedPassword) => {
  if (err) {
    console.error('Error hashing password:', err);
  } else {
    console.log('Hashed Password (without salt):', hashedPassword);
  }
});
