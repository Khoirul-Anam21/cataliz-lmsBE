import { ApiError } from "@point-hub/express-error-handler";
import Validatorjs from "validatorjs";

export const validateCreateCourse = (body: any) => {
  const validation = new Validatorjs(body, {
    title: "required",
    category_id: "required",
    purpose: "required",
    description: "required"
  });

  if (validation.fails()) {
    throw new ApiError(422, validation.errors.errors);
  }
};
