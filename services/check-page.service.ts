export function checkPage(pageNumber: number, total: number) {
  return ((pageNumber > 0) && (pageNumber <= total)) ? pageNumber : false;
}