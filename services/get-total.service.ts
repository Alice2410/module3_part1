export async function getTotal(limit: number, imagesNumber: number) {
         
  return Math.ceil(imagesNumber / limit);
}