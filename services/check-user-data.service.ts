import { UserData } from "../api/auth/auth.interface";
import { User } from "@models/MongoDB/user";
import { comparePasswords } from "./password-operations.service";

export async function checkUser(userCred: UserData) {
  const email = userCred.email;
  const password = userCred.password;

  try {
    const userIsExist = await User.exists({email: email});

    if(userIsExist) {
        const userData = await User.findOne({email: email}) as UserData;

        const validPassword = userData.password;
        const userSalt = userData.salt;
        const isValid = await comparePasswords(password, validPassword, userSalt);

        return isValid;
    } 

    return false;
} catch(err) {
    let error = err as Error;
    console.log(error.message)
}
}