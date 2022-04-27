import { errorHandler } from '@helper/http-api/error-handler';
import { createResponse } from '@helper/http-api/response';
import {
  APIGatewayAuthorizerResult,
  APIGatewayProxyHandlerV2,
  APIGatewayTokenAuthorizerWithContextHandler
} from "aws-lambda";

export const signUp: APIGatewayProxyHandlerV2 = async(event, context) => {
  try {
    const manager = new AuthorizationManager();
    
    if (event.body) {
      const response = await manager.signUp(event.body);

      return createResponse(200, response);
    }
  } catch (e) {
    return errorHandler(e);
  }
}