import { UserData } from "./auth.interface";
import { HttpBadRequestError } from '@floteam/errors';

export class AuthorizationManager {
  private readonly service: AuthorizationService;

  constructor() {
    this.service = AuthorizationService();
  }

  validateUserData(userData, validate) {
    const userObject: UserData = JSON.parse(userData);

    if(validate) {
      if (userObject.email && userObject.password) {
        return userObject;
      }

      throw new HttpBadRequestError('Неверные данные пользователя');
    }

    return userObject;
  }

  signUp (userData: string) {
    const userObject = this.validateUserData(userData, true);

    return this.service.signUp(userObject);
  }
}