import { Request, ResponseToolkit } from "@hapi/hapi";
import {
  registerValidation,
  loginValidation,
} from "../../shared/validation/auth.validation";

import {
  registerOperation,
  loginOperation,
} from "../../operations/auth.operation";

export const registerHandler = async (
  request: Request,
  h: ResponseToolkit
) => {
  try {
    const { error, value } = registerValidation.validate(request.payload);
    if (error) {
      return h.response({ message: error.message }).code(400);
    }

    const user = await registerOperation(value);

    return h.response({
      success: true,
      user,
    }).code(201);

  } catch (err: any) {
    return h.response({
      success: false,
      message: err.message,
    }).code(400);
  }
};

export const loginHandler = async (
  request: Request,
  h: ResponseToolkit
) => {
  try {
    const { error, value } = loginValidation.validate(request.payload);
    if (error) {
      return h.response({ message: error.message }).code(400);
    }

    const data = await loginOperation(value);

    return h.response({
      success: true,
      ...data,
    }).code(200);

  } catch (err: any) {
    return h.response({
      success: false,
      message: err.message,
    }).code(400);
  }
};
