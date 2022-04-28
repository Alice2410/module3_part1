import { User } from '@models/MongoDB/user';
import { UserLog } from 'api/gallery/gallery.inteface'
import { 
  HttpBadRequestError,
  HttpUnauthorizedError,
  HttpInternalServerError,
  AlreadyExistsError
 } from '@floteam/errors';

export async function getId(email: string) {
  try {
    let user = await User.findOne({email: email});
    let id = user._id;

    return id;
  } catch(e) {
    throw new HttpInternalServerError('Ошибка получения id пользователя')
  }
}