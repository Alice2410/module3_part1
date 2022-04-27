import { ObjectId } from "mongodb";
import { Image } from '@models/MongoDB/image';

export async function getImages(filter: string, page: number, limit: number, id: ObjectId) { 
  const findFilter = (filter === 'true') ? {'owner': id} : {$or: [{'owner': id}, {'owner': null}]};
  const arrForPage = await Image.find(findFilter, null, {skip: limit * page - limit, limit: limit});

  return arrForPage as unknown as object[];
}