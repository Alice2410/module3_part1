import fs from 'fs';
import * as config from 'services/config';
import { 
  HttpBadRequestError,
  HttpUnauthorizedError,
  HttpInternalServerError,
  AlreadyExistsError
 } from '@floteam/errors';

export const path = config.IMAGES_PATH;

export async function getImagesArr() { 
  try {
    let imagesArr = await fs.promises.readdir(path);
  
    return imagesArr;
  } catch(e) {
    throw new HttpInternalServerError(e.message)
  }
  
}