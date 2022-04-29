import { Image } from '@models/MongoDB/image';
import { ObjectId } from "mongodb";
import { 
  HttpInternalServerError,
 } from '@floteam/errors';


export async function getArrayLength (id: ObjectId, filter: string) { 
  try {
    const findFilter = (filter === 'true') ? {'owner': id} : {$or: [{'owner': id}, {'owner': null}]};
    const imagesNumber = await Image.countDocuments(findFilter);

    return imagesNumber;
  } catch(e) {
    throw new HttpInternalServerError(e.message)
  }
  
}