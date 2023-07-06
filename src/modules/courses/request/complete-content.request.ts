import { ApiError } from "@point-hub/express-error-handler";
import Validatorjs from "validatorjs";

export const validateCompleteCourseContent = (body: any) => {
  const validation = new Validatorjs(body, {
    courseContent_id: "required",
  });

  if (validation.fails()) {
    throw new ApiError(422, validation.errors.errors);
  }
};
