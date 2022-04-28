import { getEnv } from '@helper/environment';
import { log } from '@helper/logger';
import mongoose from 'mongoose';
import { path } from './get-paths.services';
import { saveImagesToDB } from './save-images-to-DB';
import { 
  HttpBadRequestError,
  HttpUnauthorizedError,
  HttpInternalServerError,
  AlreadyExistsError
 } from '@floteam/errors';
import { addNewUser } from './add-user-to-DB.service';

const dbURL = getEnv('DB_CONN', true);

export async function addDefaultUserData() {
  try {
    const isConnected = mongoose.connection;

    isConnected.on('error', (error) => {
      log(error);
      throw new HttpInternalServerError(error.message)
    });

    isConnected.on('open', async () => {
      log('Connection to DB is successfully established.');

      await addNewUser();
      // await saveImagesToDB(path);
    });

  } catch(e) {
    throw new HttpInternalServerError('Ошибка подключения к базе данных')
  }
}

export async function connectToDB() {
  try {
    const connection = await mongoose.connect(dbURL);
    console.log('connected to db');
  } catch(e) {
    throw new HttpInternalServerError('Ошибка подключения к базе данных')
  }
}
