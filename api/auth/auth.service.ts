import { UserData } from "./auth.interface";
import { connectToDB } from "@services/connect-to-DB.service";
import { addNewUser } from "@services/add-user-to-DB.service";

export class AuthorizationService {
  async signUp(userData: UserData) {
    try {
      await connectToDB;
      const newUser = await addNewUser(userData);
      console.log(newUser);
      return true;
    } catch(e) {
      throw new Error(e.message);
    }
  }
}


  