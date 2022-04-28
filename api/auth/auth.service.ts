import { UserData } from "./auth.interface";
import { addDefaultUserData, connectToDB } from "@services/connect-to-DB.service";
import { addNewUser } from "@services/add-user-to-DB.service";
import { checkUser } from "@services/check-user-data.service";
import jwt from "jsonwebtoken";
import { 
  HttpBadRequestError,
  HttpUnauthorizedError,
  HttpInternalServerError,
  AlreadyExistsError
} from '@floteam/errors';

const tokenKey = process.env.TOKEN_KEY as string;

export class AuthorizationService {
  async signUp(userData: UserData) {
    try {
      await connectToDB();
      const newUser = await addNewUser(userData);
      if (!newUser) {
        throw new AlreadyExistsError('Пользователь существует')
      }
      console.log(newUser);

      return true;
    } catch(e) {
      throw new AlreadyExistsError('Новый пользователь не добавлен')
    }
  }

  async logIn(userData: UserData) {
    try {
      await connectToDB();
      const isValid = await checkUser(userData);

      if (isValid) {
        
        let token = jwt.sign({sub: userData.email}, tokenKey);

        return token;
      } else {
        throw new HttpUnauthorizedError('Пользователь неавторизован')
      }
    } catch(e) {
      throw new HttpUnauthorizedError('Ошибка логина')
    }
  }

  async uploadDefaultUsers () {
    try {
      await connectToDB();

      let user = await addNewUser();
      console.log(user);

      return 'Пользователи добавлены';
    } catch (err) {
      throw new HttpInternalServerError('Пользователи не были добавлены');
    }
  }

  async authenticate(token: string) {
    try {
      await connectToDB;

      return jwt.verify(token, tokenKey);
    } catch (err) {
      throw new HttpUnauthorizedError('Невалидный токен')
    }
  }
}


  