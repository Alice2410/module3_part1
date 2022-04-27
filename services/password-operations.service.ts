import { HashedPassword } from "../api/auth/auth.interface";
import crypto from 'crypto';
import { promisify } from "util";

const scryptAsync = promisify< crypto.BinaryLike,  crypto.BinaryLike, number, Buffer>(crypto.scrypt);

export async function hashPassword (password: string) {
  const salt = crypto.randomBytes(32).toString('hex');
  const hashedPassword = await scryptAsync(password, salt, 64);

  const hash: HashedPassword = {
    password: hashedPassword.toString('hex'),
    salt: salt,
  };

  return hash;
}

export async function comparePasswords (password: string, correctData: string, salt: string) {
  const hashedUserPassword = await scryptAsync(password, salt, 64);
  const isValid = (salt + hashedUserPassword.toString('hex')) === correctData;

  return isValid;
}


