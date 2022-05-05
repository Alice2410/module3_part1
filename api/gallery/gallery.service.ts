import { connectToDB } from "@services/connect-to-DB.service";
import { ObjectId } from "mongodb";
import { ResponseObject } from "./gallery.inteface";
import { getArrayLength } from "@services/count-images.service";
import { checkPage } from "@services/check-page.service";
import { getImages } from "@services/get-images-for-page.service";
import { getId } from '@services/get-id.services';
import { MultipartFile } from 'lambda-multipart-parser';
import { saveImageLocal } from '@services/get-image-name';
import { saveImagesToDB } from '@services/save-images-to-DB';
import { 
  HttpBadRequestError,
  HttpInternalServerError,
 } from '@floteam/errors';
 import { getTotal } from "@services/get-total.service";
 import { path } from "@services/get-paths.services";

export class GalleryService {
  async getImages(pageNumber: number, limitNumber: number, filter: string, userEmail: string) {
    let responseGalleryObj: ResponseObject = {
      objects: [],
      page: 0,
      total: 0,
    }
    
    try {
      await connectToDB();
      const userId: ObjectId = await getId(userEmail);
      const allImagesNumber = await getArrayLength(userId, filter);
      const total = await getTotal(limitNumber, allImagesNumber);
      const page = checkPage(pageNumber, total);

      if (page) {
        const objects = await getImages(filter, page, limitNumber, userId)

        responseGalleryObj.objects = objects;
        responseGalleryObj.page = page;
        responseGalleryObj.total = total;

        return responseGalleryObj;
      } else {
        throw new HttpBadRequestError(`Страницы не существует`)
      }
    } catch(e) {
      if (e instanceof HttpBadRequestError){
        throw new HttpBadRequestError(e.message); 
      } 

      throw new HttpInternalServerError(e.message);
    }
  }

  async uploadImage(image: MultipartFile, userEmail: string) {
    try {
      await connectToDB();
      const userId: ObjectId = await getId(userEmail);
      const fileName = await saveImageLocal(image);
      await saveImagesToDB(fileName, userId);

    } catch (e) {
      throw new HttpInternalServerError(e.message);
    }

    return 'Изображение загружено';
  }

  async uploadDefaultImages () {
    try {
      await connectToDB();
      const image = await saveImagesToDB(path);

      return 'Картинки добавлены';
    } catch (err) {
      throw new HttpInternalServerError('Картинки не были добавлены');
    }
  }
}
