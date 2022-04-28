// import { MediaInfoCurlService, Track } from '@services/media-info-curl.service';
// import { MediaInfoService } from './media-info.service';
// import { ObjectId } from "mongodb";
import { QueryParameters } from './gallery.inteface';
import { ResponseObject } from './gallery.inteface';
import { GalleryService } from './gallery.service';
import { MultipartRequest } from 'lambda-multipart-parser';
import { 
  HttpBadRequestError,
  HttpUnauthorizedError,
  HttpInternalServerError,
  AlreadyExistsError
 } from '@floteam/errors';
/**
 * It's the feature manager
 * Its methods should implement some feature's functionality
 */
export class GalleryManager {
  // private readonly service: MediaInfoService;
  private readonly service: GalleryService;

  // constructor() {
  //   /**
  //    * The feature service should be created in the constructor of the feature manager
  //    * Other services should be provided in the feature manager's methods
  //    */
  //   this.service = new MediaInfoService();
  // }

  constructor() {
    this.service = new GalleryService();
  }

  getImages(queryParams: QueryParameters, userEmail: string): Promise<ResponseObject> {
    const page = queryParams?.page || '1';
    const limit = queryParams?.limit || '2';
    const filter = queryParams?.filter || 'false';

    const pageNumber = +page;
    const limitNumber = +limit;

    return this.service.getImages(pageNumber, limitNumber, filter, userEmail);
  }

  async uploadImages(imagesArr: MultipartRequest, userEmail: string) {
    // if (imagesArr.files.length === 0) {
    //   throw new HttpBadRequestError('Изображения не были добавлены');
    // }
    const file = imagesArr.files[0]

    return this.service.uploadImage(file, userEmail);
  }
  /**
   * This method implements some feature's functionality
   * It should validate required data
   * It should display the main steps of the algorithm without implementation
   * All implementation should be placed in the feature service's methods
   * @param mediaInfoUrl - required data
   * @param mediaInfoCurlService - required services
   */
  // getMediaInfo(mediaInfoUrl: MediaInfoUrl, mediaInfoCurlService: MediaInfoCurlService): Promise<Track> {
  //   /**
  //    * Validate required data -> Check if url exists
  //    */
  //   if (!mediaInfoUrl.url) {
  //     throw new HttpBadRequestError("The param 'url' is required.");
  //   }

  //   /**
  //    * Display the main step of the algorithm and call the feature service's method -> Return Media Info
  //    */
  //   return this.service.getMediaInfo(mediaInfoUrl.url, mediaInfoCurlService);
  // }
}
