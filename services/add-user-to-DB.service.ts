import { UserData } from "../api/auth/auth.interface";
import { validUsers } from "@helper/valid-users";
import { User } from "@models/MongoDB/user";
import { hashPassword } from "./password-operations.service";
import { 
  HttpInternalServerError,
 } from '@floteam/errors';

export async function addNewUser(userData?: UserData) {
    
  try {
    
    if (userData) {
      let email = userData.email;
      let password = userData.password;
      let result = await createUserInDB(email, password);

      return result;
        
    } else {
        for (const email in validUsers) {  
          const user = await createUserInDB(email, validUsers[email])
        }
        return;
    }        
  } catch(err) {
    throw new HttpInternalServerError('Ошибка добавления пользователя')
  }
}

async function createUserInDB(email:string, password:string) {
  try{
    let userIsExist = await User.exists({email: email});

    if(!userIsExist) {
      
      const hashedData = await hashPassword(password);
      
      const newUser: UserData = await User.create({email: email, password: hashedData.salt + hashedData.password, salt: hashedData.salt});
      
      return newUser;
    } 

    return false;
  } catch(e) {
   
    throw new HttpInternalServerError(e.message)
  }
}

