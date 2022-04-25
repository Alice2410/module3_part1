import * as fs from "fs";
import * as path from "path";

export async function getMetadata(imageName: string){
    let imgPath = path.join(__dirname, '../images/', imageName);
    let metadata = await fs.promises.stat(imgPath);
    
    return metadata;
}