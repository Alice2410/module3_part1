import * as config from "./config";
import path from "path";
import fs from "fs";
import { ObjectId } from "mongodb";
import { Response } from "express";
import { saveImagesToDB } from './save-images-to-DB';
import { MultipartFile, MultipartRequest } from 'lambda-multipart-parser';

export const pathToImgDir = config.IMAGES_PATH;

export async function saveImageLocal(userId: ObjectId, file: MultipartFile) {
  let fileName = file.filename;
  let noSpaceFileName = fileName.replace(/\s/g, '');
  let newFileName = 'user' + '_' +  noSpaceFileName;

  try {
    await fs.promises.writeFile(
      path.join(pathToImgDir, newFileName),
      file.content
    );

    return fileName;
  } catch(e) {

  }

  // file.mv((config.IMAGES_PATH + newFileName), async (err: Error) => {
  //     if(err){
  //         res.send (err);
  //     } else {
  //         let path = newFileName;
  //         await saveImagesToDB(path, userId);
  //         res.end(); 
  //     }
  //     // console.log((config.IMAGES_PATH + newFileName), path.join(config.IMAGES_PATH, "../../../../storage/", ));
  //     console.log('saved')
      
  // })
}
