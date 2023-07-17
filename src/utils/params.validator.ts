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

export const validateCourseIdQuery = (param:any) => {
  const validation = new Validatorjs(param, {
    course_id: "required",
  });

  if (validation.fails()) {
    throw new ApiError(422, validation.errors.errors);
  }
};

export const validateCategoryId = (param:any) => {
  const validation = new Validatorjs(param, {
    category_id: "size:24",
  });

  if (validation.fails()) {
    throw new ApiError(422, validation.errors.errors);
  }
};
