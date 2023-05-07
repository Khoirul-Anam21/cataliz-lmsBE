import { ApiError } from "@point-hub/express-error-handler";
import Validatorjs from "validatorjs";

export const validateSignUp = (body: any) => {
  const validation = new Validatorjs(body, {
    username: "required",
    email: "required|email",
    password: "required|min:8",
  });

  if (validation.fails()) {
    throw new ApiError(422, validation.errors.errors);
  }
};
