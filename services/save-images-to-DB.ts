import { ObjectId } from "mongodb";
import { ImageInterface } from 'api/gallery/gallery.inteface';
import { getMetadata } from './get-metadata.services';
import { Image } from '@models/MongoDB/image';
import { getImagesArr } from './get-paths.services';
import { 
  HttpInternalServerError,
 } from '@floteam/errors';

export async function saveImagesToDB(path?: string, userID?: ObjectId) {
  try {
    const imagesPathsArr = await getImagesArr();
    
    if( path && userID) {
      const owner = userID;
      const result = await addImage(path, owner);
    } else {

      for(const imgPath of imagesPathsArr) {
          const imageIsExist = await Image.exists({path: imgPath});
  
        if(!imageIsExist) {
          try{
            const image = await addImage(imgPath);
          } catch(err) {
              let error = err as Error;
              console.log(error.message)
          }
        }
      }
    }
  } catch(e) {
    throw new HttpInternalServerError('Ошибка сохранения картинки в бд')
  }
}

async function addImage (imagePath: string, owner?: ObjectId) {
  try { 
    const metadata = await getMetadata(imagePath);
    const image: ImageInterface = await Image.create({path: imagePath, metadata: metadata, owner: owner ?? null});
    
    return image;
  } catch(e) {
    throw new HttpInternalServerError(e.message)
  }
}