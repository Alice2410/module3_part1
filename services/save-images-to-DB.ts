import { ObjectId } from "mongodb";
import { ImageInterface } from 'api/gallery/gallery.inteface';
import { getMetadata } from './get-metadata.services';
import { Image } from '@models/MongoDB/image';
import { getImagesArr } from './get-paths.services';

export async function saveImagesToDB(path?: string, userID?: ObjectId) {
  let imagesPathsArr = await getImagesArr();

  if( path && userID) {
      let owner = userID;
      let result = await addImage(path, owner);

      console.log(result);
  } else {
  
    for(const imgPath of imagesPathsArr) {
        let imageIsExist = await Image.exists({path: imgPath});

        if(!imageIsExist) {
            try{

              let image = await addImage(imgPath);
                
            } catch(err) {
                let error = err as Error;
                console.log(error.message)
            }
        }
    }
  }
}

async function addImage (imagePath: string, owner?: ObjectId) {
  let metadata = await getMetadata(imagePath);
  let image: ImageInterface = await Image.create({path: imagePath, metadata: metadata, owner: owner ?? null});

  return image;
}