import { ApiError } from "@point-hub/express-error-handler";
import Validatorjs from "validatorjs";

export const validateIdParams = (param:any) => {
  const validation = new Validatorjs(param, {
    id: "required",
  });

  if (validation.fails()) {
    throw new ApiError(422, validation.errors.errors);
  }
};
