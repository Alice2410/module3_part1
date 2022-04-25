import { Image } from '@models/MongoDB/image';
import { ObjectId } from "mongodb";


export async function getArrayLength (id: ObjectId, filter: string) { 
  const findFilter = (filter === 'true') ? {'owner': id} : {$or: [{'owner': id}, {'owner': null}]};
  const imagesNumber = await Image.countDocuments(findFilter);

  return imagesNumber;
}