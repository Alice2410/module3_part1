import fs from 'fs';
import * as config from 'services/config';

export const path = config.IMAGES_PATH;;

export async function getImagesArr() { 
  let imagesArr = await fs.promises.readdir(path);
  
  return imagesArr;
}