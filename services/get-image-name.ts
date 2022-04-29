import * as config from "./config";
import path from "path";
import fs from "fs";
import { ObjectId } from "mongodb";
import { MultipartFile } from 'lambda-multipart-parser';
import { 
  HttpInternalServerError,
} from '@floteam/errors';

export const pathToImgDir = config.IMAGES_PATH;

export async function saveImageLocal(file: MultipartFile) {
  let fileName = file.filename;
  let noSpaceFileName = fileName.replace(/\s/g, '');
  let newFileName = 'user' + '_' +  noSpaceFileName;

  try {
    await fs.promises.writeFile(
      path.join(pathToImgDir, newFileName),
      file.content
    );

    return newFileName;
  } catch(e) {
    throw new HttpInternalServerError(e.message)
  }
}
