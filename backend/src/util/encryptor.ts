import { AES, enc } from 'crypto-js';

export const encrypt = (data: string) => {
  const encrypted = AES.encrypt(data, process.env.ENCRYPTION_KEY);
  return encrypted.toString();
};

export const decrypt = (data: string) => {
  const decrypted = AES.decrypt(data, process.env.ENCRYPTION_KEY);
  return decrypted.toString(enc.Utf8);
};