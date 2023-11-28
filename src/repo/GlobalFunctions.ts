// Note: Global Functions
import bcrypt from 'bcryptjs';
import { AES, enc } from 'crypto-js';
import sha256 from 'crypto-js/sha256';

export function hashPasswordBcrypt(password: string): string {
  const saltRounds = 10;
  return bcrypt.hashSync(password, saltRounds);
}
export function hashPasswordSha256(input: string): string{
  return sha256(input).toString()
}
export function checkPassword(inputPassword: string, hashedPassword: string): boolean {
  return bcrypt.compareSync(inputPassword, hashedPassword);
}

export function encryptText(plainText: string, secretKey: string):string | null | undefined {
  if (plainText && secretKey) {
    try {
      const encrypted = AES.encrypt(plainText, secretKey).toString();
      return encrypted;
    } catch (error) {
      console.error('Error encrypting text:', error);
      return null;
    }
  } else {
    console.error('Please provide text and password for encryption.');
    return null;
  }
}

export function decryptText(encryptedText: string, secretKey: string):string | null | undefined {
  if (encryptedText && secretKey) {
    try {
      const decrypted = AES.decrypt(encryptedText, secretKey).toString(enc.Utf8);
      return decrypted;
    } catch (error) {
      console.error('Error decrypting text:', error);
      return null;
    }
  } else {
    console.error('Please provide encrypted text and password for decryption.');
    return null;
  }
}

