import { getEnv } from '@helper/environment';
import { log } from '@helper/logger';
import mongoose from 'mongoose';

const dbURL = getEnv('MONGO', true);

export const connectToDB = new Promise((resolve, reject) => {
  const isConnected = mongoose.connection;

  isConnected.on('error', (error) => {
    log(error);
    reject(error);
  });

  isConnected.on('open', () => {
    log('Connection to DB is successfully established.');
  });

  resolve(isConnected);
});