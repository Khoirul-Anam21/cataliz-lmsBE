import { ApiError } from "@point-hub/express-error-handler";
import Validatorjs from "validatorjs";

export const validateCreateComment = (body: any) => {
  const validation = new Validatorjs(body, {
    course_id: "required",
    content_id: "required",
    comment: "required"
  });

  if (validation.fails()) {
    throw new ApiError(422, validation.errors.errors);
  }
};