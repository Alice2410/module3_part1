import * as fs from "fs";
import * as path from "path";
import { IMAGES_PATH } from "./config";

export async function getMetadata(imageName: string){
    const imgPath = path.join(IMAGES_PATH, imageName);
    const metadata = await fs.promises.stat(imgPath);
    
    return metadata;
}