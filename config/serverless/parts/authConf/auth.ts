import { AWSPartitial } from '../../types';
import {signUp, logIn, uploadDefaultUsers} from "./index";

export const authConfig: AWSPartitial = {
  provider: {
    httpApi: {
      authorizers: {
        authenticator: {
          type: "request",
          functionName: "authenticator",
          identitySource: "$request.header.Authorization",
          enableSimpleResponses: true,
        }
      }
    }
  },
  functions: {
    signUp, logIn, uploadDefaultUsers
  },
}