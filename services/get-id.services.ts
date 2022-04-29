import { User } from '@models/MongoDB/user';
import { 
  HttpInternalServerError,
} from '@floteam/errors';

export async function getId(email: string) {
  try {
    const user = await User.findOne({email});
    const id = user._id;

    return id;
  } catch(e) {
    throw new HttpInternalServerError('Ошибка получения id пользователя')
  }
}