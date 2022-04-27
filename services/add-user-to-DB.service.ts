import { UserData } from "../api/auth/auth.interface";
import { validUsers } from "@helper/valid-users";
import { User } from "@models/MongoDB/user";
import { hashPassword } from "./password-operations.service";

export async function addNewUser(userData: UserData) {
    
  try {
    if (userData) {
      console.log('has userData')
      let email = userData.email;
      let password = userData.password;
      let result = await createUserInDB(email, password);

      return result;
        
    } else {
        console.log('adding default users')
        for (const email in validUsers) {
          console.log('user email: ', email);
          console.log('user password: ', validUsers[email]);
          await createUserInDB(email, validUsers[email])
        }
    }        
  } catch(err) {
    let error = err as Error;
    console.log(error.message);
  }
}

async function createUserInDB(email:string, password:string) {

  let userIsExist = await User.exists({email: email});

  if(!userIsExist) {
    // const salt = await bcrypt.genSalt(10);
    // const encPassword = await bcrypt.hash(password, salt);
    
    // const newUser: UserData = await User.create({email: email, password: encPassword, salt: salt});
    // console.log(newUser);
    const hashedData = await hashPassword(password);
    const newUser: UserData = await User.create({email: email, password: hashedData.salt + hashedData.password, salt: hashedData.salt});
    return true;
  }

  return false;
}

