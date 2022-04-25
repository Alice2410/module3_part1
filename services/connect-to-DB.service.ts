import { getEnv } from '@helper/environment';
import { log } from '@helper/logger';
import mongoose from 'mongoose';
import { path } from './get-paths.services';
import { saveImagesToDB } from './save-images-to-DB';

const dbURL = getEnv('MONGO', true);

export const connectToDB = new Promise((resolve, reject) => {
  const isConnected = mongoose.connection;

  isConnected.on('error', (error) => {
    log(error);
    reject(error);
  });

  isConnected.on('open', async () => {
    log('Connection to DB is successfully established.');
    await saveImagesToDB(path);
    resolve(isConnected);
  });
});
