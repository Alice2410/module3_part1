import { HttpBadRequestError, HttpInternalServerError } from '@floteam/errors';
// import { MediaInfoCurlService, Track } from '@services/media-info-curl.service';
import { connectToDB } from "@services/connect-to-DB.service";
import { ObjectId } from "mongodb";
import { ResponseObject } from "./gallery.inteface";
import { getArrayLength } from "@services/count-images.service";
import { checkPage } from "@services/check-page.service";
import { getImages } from "@services/get-images-for-page.service";
import { getId } from '@services/get-id.services';
import { MultipartFile, MultipartRequest } from 'lambda-multipart-parser';
import { Image } from '@models/MongoDB/image';
import { saveImageLocal } from '@services/get-image-name';
import { saveImagesToDB } from '@services/save-images-to-DB';

/**
 * It's the feature service
 * Its methods should implement one of the main steps of some feature's functionality
 */
// export class MediaInfoService {
//   /**
//    * This method implements one of the main steps of some feature's functionality
//    * @param url - required data
//    * @param mediaInfoCurlService - required services
//    */
//   async getMediaInfo(url: string, mediaInfoCurlService: MediaInfoCurlService): Promise<Track> {
//     /**
//      * Try to catch unexpected errors
//      */
//     let mediaInfo: Track | undefined;
//     try {
//       mediaInfo = await mediaInfoCurlService.getMediaInfo(url);
//     } catch (e) {
//       throw new HttpInternalServerError(e.message);
//     }
//     /**
//      * If !mediaInfo it means that the URL is broken or doesn't have access
//      */
//     if (!mediaInfo) {
//       throw new HttpBadRequestError("Can't extract media info. Please, check your URL");
//     }
//     return mediaInfo;
//   }
// }

export class GalleryService {
  async getImages(pageNumber: number, limitNumber: number, filter: string, userEmail: string) {
    let responseGalleryObj: ResponseObject = {
      objects: [],
      page: 0,
      total: 0,
    }

    const userId: ObjectId = await getId(userEmail);

    try {
      await connectToDB;

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
    const userId: ObjectId = await getId(userEmail);

    try {
      await connectToDB;
      
      const fileName = await saveImageLocal(userId, image);
      await saveImagesToDB(fileName, userId);

    } catch (e) {
      throw new HttpInternalServerError(e.message);
    }

    return 'Изображение загружено';
  }
}
