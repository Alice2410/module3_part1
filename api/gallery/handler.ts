import { errorHandler } from '@helper/http-api/error-handler';
import { createResponse } from '@helper/http-api/response';
import { log } from '@helper/logger';
import { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { QueryParameters } from './gallery.inteface';
import { GalleryManager } from './gallery.manager';
import { MultipartRequest } from 'lambda-multipart-parser';
import * as parser from 'lambda-multipart-parser';
// import { Handler } from 'aws-lambda/handler';
import { 
  HttpBadRequestError,
  HttpUnauthorizedError,
  HttpInternalServerError,
  AlreadyExistsError
 } from '@floteam/errors';

/**
 * It's required if you use any external executable files like mediainfo-curl
 */
if (process.env.LAMBDA_TASK_ROOT) {
  process.env.PATH = `${process.env.PATH}:${process.env.LAMBDA_TASK_ROOT}/bin`;
}

/**
 * This is a handler file
 * It should contain Lambda functions for one feature
 * For example, Media Info feature
 * Or CRUD operations for the user entity
 */

/**
 * This is a Lambda function
 * It implements some functionality of the feature
 *
 * It should only create a feature manager object and call the manager's method
 * All required data should be provided to the manager's method
 * Do not provide event or context objects
 * You should create interfaces for required data
 * All required services except feature service should be provided to the manager's method
 *
 * This function should handle all errors and return them with proper structure
 * @param event - APIGateway, SQS Trigger, SNS Trigger, etc. event object
 * @param context
 */

export const getGallery: APIGatewayProxyHandlerV2 = async (event, context) => {
  log(event);

  try {
    const manager = new GalleryManager();
    const queryParams = event.queryStringParameters as unknown as QueryParameters;
    const userEmail = event.requestContext.authorizer?.jwt.claims.email as string;
    const result = await manager.getImages(queryParams, userEmail);

    return createResponse(200, result);
  } catch (e) {
    return errorHandler(e)
  }
};

export const addImageGallery: APIGatewayProxyHandler = async (event) => {
  log(event);

  try {
    const manager = new GalleryManager();
    const images: MultipartRequest = await parser.parse(event);
    const ownerId: string = event.requestContext.authorizer?.claims._id;

    const result = await manager.uploadImages(images, ownerId);

    return createResponse(200, result);
  } catch (e) {
    return errorHandler(e)
  }
};